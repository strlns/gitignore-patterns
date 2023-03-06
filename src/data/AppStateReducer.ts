import cuid2 from "@paralleldrive/cuid2";
import {
  getPathName,
  getUniquePath,
  isPathDirectChildOfDirectory,
  normalizePath,
  PATH_SEPARATOR,
  ROOT_VFS_NODE,
} from "data/PathUtilities";
import { AppState } from "types/AppState";
import { FileWithoutID } from "types/IVirtualFileSystemNode";

cuid2.init();

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
        newFiles.splice(indexOfFileToRemove, 1);
        return { ...state, files: newFiles };
      } else {
        throw new Error(`Cannot remove file with ID  ${action.payload.id}.`);
      }
    }
    case "changeFilePath": {
      const {
        payload: { id, path: unsanitizedPath },
      } = action;
      const path = normalizePath(unsanitizedPath);
      const newFiles = [...state.files];
      const newState = { ...state, files: newFiles };
      const indexOfFileToChange = state.files.findIndex((file) => file.id === id);
      if (indexOfFileToChange === -1) {
        throw new Error(`Cannot change file with ID  ${action.payload.id}.`);
      }
      const fileToChange = { ...newFiles[indexOfFileToChange] };
      const isDuplicate =
        newFiles.filter((node) => node.path === path && node.id !== id).length > 0;
      //If renaming leads to duplicates, remove one of the duplicated paths.
      if (isDuplicate && path !== ROOT_VFS_NODE.path) {
        return appStateReducer(state, {
          type: "removeFile",
          payload: {
            id,
          },
        });
      }
      //Except for the root path, to make typing less annoying.
      fileToChange.duplicate = isDuplicate;

      fileToChange.path = path;
      fileToChange.isDir = fileToChange.path.endsWith(PATH_SEPARATOR);
      newFiles[indexOfFileToChange] = fileToChange;

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
      payload: {
        path: string;
      };
    }
  | {
      type: "removeFile";
      payload: {
        id: string;
      };
    }
  | {
      type: "changeFilePath";
      payload: {
        id: string;
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

const createNewFileAction = (
  state: AppState,
  path: string,
  renameDuplicates = true
): AppState => {
  const newFileWithoutID = {
    path,
    isDir: path.endsWith(PATH_SEPARATOR),
  } as FileWithoutID;

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
        return createNewFileAction({ ...state, files: siblings }, newPath);
      }
      return {
        ...state,
        error: new Error("Duplicate paths are not allowed."),
      };
    }
  }

  const newFiles = [...state.files];
  const newFile = { ...newFileWithoutID, id: cuid2.createId() };
  newFiles.push(newFile);

  return {
    ...state,
    files: newFiles,
  };
};
