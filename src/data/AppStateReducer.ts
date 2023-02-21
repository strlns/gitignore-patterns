import {
  getPathName,
  getUniquePath,
  isPathDirectChildOfDirectory,
  normalizePath,
  PATH_SEPARATOR,
  ROOT_VFS_NODE,
} from "data/PathUtilities";
import { AppState } from "types/AppState";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { PartialBy } from "types/UtilityTypes";

export const initialState: AppState = {
  error: undefined,
  files: [structuredClone(ROOT_VFS_NODE)],
  patterns: [],
};

/*
 * This is the single source of truth for state in this small app.
 *
 * Note that throwing an error here is problematic if the error should be user-facing
 * and is not an exceptional application error.
 *
 * In this case, the "error" property should be used, as unfortunately I can't
 * get React error boundaries to work with async dispatch calls, see
 * https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers
 *
 * For exceptional application errors, throwing is still the right thing to do.
 */
export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "addFile": {
      const path = normalizePath(action.payload?.path ?? `${ROOT_VFS_NODE.path}file`);
      return createNewFileAction(state, path);
    }
    case "removeFile": {
      const newFiles = [...state.files];
      const indexOfFileToRemove = state.files.findIndex(
        (file) => file.id === action.payload.id
      );
      if (indexOfFileToRemove !== -1) {
        newFiles.splice(indexOfFileToRemove);
        return { ...state, files: newFiles };
      } else {
        throw new Error(`Cannot remove file with ID  ${action.payload.id}.`);
      }
    }
    case "changeFilePath": {
      const newFiles = [...state.files];
      const newState = { ...state, files: newFiles };
      const {
        payload: { id, path },
      } = action;
      //If renaming leads to duplicates, remove one of the duplicated paths.
      if (newFiles.filter((node) => node.path === action.payload.path).length > 0) {
        if (path !== ROOT_VFS_NODE.path) {
          return appStateReducer(state, {
            type: "removeFile",
            payload: {
              id,
            },
          });
        } else {
          newFiles[id].path = path;
          newFiles[id].duplicate = true;
        }
      }
      //This leads to a lot of wasted work, but working with the indexes directly
      //makes writing the app complicated and hard to debug or test.
      //Also a symptom of the mismatch between tree structure and flat VFSNode array
      //(and my lack of ability to do this correct and efficient at the same time.)
      const indexOfFileToChange = state.files.findIndex(
        (file) => file.id === action.payload.id
      );
      if (indexOfFileToChange !== -1) {
        // no deep clone needed here
        const changedFile = { ...newFiles[indexOfFileToChange] };
        changedFile.path = normalizePath(action.payload.path);
        changedFile.isDir = changedFile.path.endsWith(PATH_SEPARATOR);
        newFiles[indexOfFileToChange] = changedFile;
      } else {
        throw new Error(`Cannot change file with ID  ${action.payload.id}.`);
      }
      return newState;
    }
    case "addPattern": {
      const newPattern = action.payload?.pattern ?? "";
      const patterns = [...state.patterns, newPattern];
      return { ...state, patterns };
    }
    case "removePattern": {
      const newPatterns = [...state.patterns];
      if (action.payload.index < newPatterns.length && action.payload.index >= 0) {
        newPatterns.splice(Math.floor(action.payload.index), 1);
        return { ...state, patterns: newPatterns };
      } else {
        throw new Error(
          `Index out of bounds, cannot remove pattern with index  ${action.payload.index}.`
        );
      }
    }
    case "changePattern": {
      const newPatterns = [...state.patterns];
      if (action.payload.index < newPatterns.length && action.payload.index >= 0) {
        const index = Math.floor(action.payload.index);
        newPatterns[index] = action.payload.pattern;
        return { ...state, patterns: newPatterns };
      } else {
        throw new Error(
          `Index out of bounds, cannot change pattern with index  ${action.payload.index}.`
        );
      }
    }
    case "error":
      return { ...state, error: action.payload };
    case "clearError":
      return { ...state, error: undefined };
    default:
      throw new Error("Invalid action.");
  }
};

/*
To do: handle directories properly, implement:
- deletion of file/directory
*/
export type Action =
  | {
      //also covers directories. maybe rename action.
      type: "addFile";
      payload?: {
        path: string;
      };
    }
  | {
      type: "removeFile";
      payload: {
        id: number;
      };
    }
  | {
      type: "changeFilePath";
      payload: {
        id: number;
        path: string;
      };
    }
  | {
      type: "addPattern";
      payload?: {
        pattern: string;
      };
    }
  | {
      type: "removePattern";
      payload: {
        index: number;
      };
    }
  | {
      type: "error";
      payload: string | Error;
    }
  | {
      type: "clearError";
    }
  | {
      type: "changePattern";
      payload: {
        index: number;
        pattern: string;
      };
    };

export const MAX_VFS_DEPTH = 1024;

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const detectAndHighlightDuplicates = (state: AppState): AppState => {
  const filesByPath = new Map<string, IVirtualFileSystemNode[]>();
  let hasChanges = false;
  const files = [...state.files];
  for (const file of state.files) {
    const filesWithPath = filesByPath.get(file.path) ?? [];
    filesWithPath.push(file);
    if (filesWithPath.length > 1) {
      filesWithPath.forEach((file, index) => {
        const markAsDuplicate = index > 0;
        if (markAsDuplicate !== Boolean(file.duplicate)) {
          file = { ...file, duplicate: markAsDuplicate };
          hasChanges = true;
        }
      });
    } else if (file.duplicate) {
      file.duplicate = false;
    }
  }
  if (hasChanges) {
    return { ...state, files };
  }
  return state;
};

const createNewFileAction = (
  state: AppState,
  path: string,
  renameDuplicates = true
): AppState => {
  const newFileWithoutID = {
    path,
    isDir: path.endsWith(PATH_SEPARATOR),
  } as PartialBy<IVirtualFileSystemNode, "id">;

  const duplicate = state.files.find(
    (file) => normalizePath(file.path) === normalizePath(newFileWithoutID.path)
  );

  if (duplicate) {
    const pathName = getPathName(path);
    const siblings = state.files.filter((file) =>
      isPathDirectChildOfDirectory(file.path, pathName)
    );
    if (renameDuplicates) {
      const newPath = getUniquePath(path, siblings);
      if (newPath && newPath !== duplicate.path) {
        createNewFileAction({ ...state, files: siblings }, newPath);
      }
      return {
        ...state,
        error: new Error("Duplicate paths are not allowed."),
      };
    }
  }

  const newFiles = [...state.files];
  const newFile = { ...newFileWithoutID, id: state.files.length };
  newFiles.push(newFile);

  return {
    ...state,
    files: newFiles,
  };
};
