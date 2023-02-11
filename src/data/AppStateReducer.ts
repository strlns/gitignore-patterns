import { AppState } from "types/AppState";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { normalizePath } from "data/PathUtilities";

export const initialState: AppState = {
  error: undefined,
  files: [
    {
      path: "/",
      isDir: true, //see other comments. the "VFS" with a tree structure could be simpler.
      /**
      @todo Maybe (!) revise the structure here. currently, this array shall always only have one
      member, the root path. Reason: I chose a tree structure instead of a flat array of paths
      for the VFS state.
      @see {searchNodeByCriterion}
      */
      readOnly: true,
    },
  ],
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
      const path = normalizePath(action.payload?.path ?? "/file");
      const newFile = {
        path,
        isDir: path.endsWith("/"),
      } as IVirtualFileSystemNode;
      //This is currently absurdly expensive, but this is not built to deal with huge
      //file system trees.
      const duplicate = state.files.find((file) => file.path === newFile.path);
      if (duplicate) {
        return {
          ...state,
          error: new Error("Duplicate paths are not allowed."),
        };
      }
      return {
        ...state,
        files: [...state.files, newFile],
      };
    }
    case "removeFile": {
      const newFiles = [...state.files];
      if (action.payload.index < newFiles.length && action.payload.index >= 0) {
        newFiles.splice(Math.floor(action.payload.index), 1);
        return { ...state, files: newFiles };
      } else {
        throw new Error(
          `Index out of bounds, cannot remove pattern with index  ${action.payload.index}.`
        );
      }
    }
    case "changeFilePath": {
      const newFiles = [...state.files];
      if (action.payload.index < newFiles.length && action.payload.index >= 0) {
        const index = Math.floor(action.payload.index);
        // no deep clone needed here
        const changedFile = { ...newFiles[index] };
        changedFile.path = normalizePath(action.payload.path);
        changedFile.isDir = changedFile.path.endsWith("/");
        newFiles[index] = changedFile;
        return detectAndHighlightDuplicates({ ...state, files: newFiles });
      } else {
        throw new Error(
          `Index out of bounds, cannot change file with index  ${action.payload.index}.`
        );
      }
    }
    case "addPattern": {
      const newPattern = action.payload?.pattern ?? "";
      const patterns = [...state.patterns, newPattern];
      return { ...state, patterns };
    }
    case "removePattern": {
      const newPatterns = [...state.patterns];
      if (
        action.payload.index < newPatterns.length &&
        action.payload.index >= 0
      ) {
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
      if (
        action.payload.index < newPatterns.length &&
        action.payload.index >= 0
      ) {
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

export interface VFSTree {
  node: IVirtualFileSystemNode;
  children: VFSTree[];
}

/*
To do: handle directories properly, implement:
- deletion of file/directory
*/
export type Action =
  | {
      //also covers directories. maybe rename action.
      type: "addFile";
      payload?: AddFilePayload;
    }
  | {
      type: "removeFile";
      payload: {
        index: number;
      };
    }
  | {
      type: "changeFilePath";
      payload: {
        index: number;
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

type AddFilePayload = {
  path: string;
  /*
  This requires a **search** to find the corresponding object reprenting the parent folder
  in the VFS state tree. Maybe I should revise the nested tree object structure representing 
  VFS state, too.
  But: It is important for each operation to differentiate between files and directories,
  and relying only on the trailing slash in FE would be harder to implement.
  A flat array would more closely resemble a real file system and simplify some logic,
  but an actual tree structure simplifies UI development.

  Searching the parent folder using DFS or BFS is not a problem for the expected
  small amount of files in this app.
  */
  parentPath?: string;
};

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
