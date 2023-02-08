import { AppState } from "../types/AppState";
import { IVirtualFileSystemNode } from "../types/IVirtualFileSystemNode";

export const initialState: AppState = {
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
      children: [],
      readOnly: true,
    },
  ],
  patterns: [],
};

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "addFile": {
      const newFile = {
        path: action.payload?.path ?? "/file",
        isDir: false,
      } as IVirtualFileSystemNode;

      //This is currently absurdly expensive, but this is not built to deal with huge
      //file system trees.
      if (
        searchNodeByCriterion((node) => node.path === newFile.path, state.files)
      ) {
        throw new Error("Duplicate paths are not allowed.");
      }
      if (newFile.path.includes("/")) {
        //see comments in action type on why this is needed.
        const parent = searchNodeByCriterion(
          (node) =>
            isPathDirectChildOfDirectory(
              node.path,
              action.payload?.parentPath as string
            ),
          state.files
        );
      }
      return {
        ...state,
        files: [...state.files, newFile],
      };
    }
    case "removeFile": {
      const newFiles = [...state.files];
      if (action.payload.index < newFiles.length && action.payload.index > 0) {
        newFiles.splice(Math.floor(action.payload.index), 1);
        return { ...state, files: newFiles };
      } else {
        throw new Error(
          `Index of out bounds, cannot remove pattern with index  ${action.payload.index}`
        );
      }
    }
    case "changeFilePath": {
      const newFiles = [...state.files];
      if (action.payload.index < newFiles.length && action.payload.index > 0) {
        //structuredClone is just a fancy way of writing {...object} here, but maybe our
        //objects are going to be nested in the future - who knows!
        const index = Math.floor(action.payload.index);
        const fileToChange = structuredClone(newFiles[index]);
        fileToChange.path = action.payload.path;
        newFiles[index] = fileToChange;

        return { ...state, files: newFiles };
      } else {
        throw new Error(
          `Index of out bounds, cannot change file with index  ${action.payload.index}`
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
        action.payload.index > 0
      ) {
        newPatterns.splice(Math.floor(action.payload.index), 1);
        return { ...state, patterns: newPatterns };
      } else {
        throw new Error(
          `Index of out bounds, cannot remove pattern with index  ${action.payload.index}`
        );
      }
    }
    case "changePattern": {
      const newPatterns = [...state.patterns];
      if (
        action.payload.index < newPatterns.length &&
        action.payload.index > 0
      ) {
        const index = Math.floor(action.payload.index);
        const patternToChange = structuredClone(newPatterns[index]);
        patternToChange.pattern = action.payload.pattern;
        newPatterns[index] = patternToChange;
        return { ...state, patterns: newPatterns };
      } else {
        throw new Error(
          `Index of out bounds, cannot change pattern with index  ${action.payload.index}`
        );
      }
    }
    default:
      return state;
  }
};

/*
To do: handle directories properly, implement:
 - creation of directory
 - moving file from one directory into another directory
 - deletion of file/directory
*/
export type Action =
  | {
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
      type: "changePattern";
      payload: {
        index: number;
        pattern: string;
      };
    };

export const MAX_VFS_DEPTH = 1024;
/**
 * 
  Searching the parent folder using DFS or BFS is not a problem for the expected
  small amount of files in this app. Still, it's a symptom of the tree-structure that
  I imagined as the source of truth for the UI.

  In reality, file system records are not trees and in respect to .gitignore,
  nothing other than the path is of any relevance, as the tree-structure is redundant
  given a list of correct paths. 

  Problem: This requires every directory path to have a trailing slash, this is exactly
  what we want to normalize with the tree-approach and the isDir flag.
 * 
 */
const searchNodeByCriterion = (
  criterion: (node: IVirtualFileSystemNode) => boolean,
  treeNodesInVFS: IVirtualFileSystemNode[],
  iteration = 0
): IVirtualFileSystemNode | undefined => {
  let node = treeNodesInVFS.find(criterion);
  if (node) {
    return node;
  }
  if (iteration < MAX_VFS_DEPTH) {
    const children = treeNodesInVFS
      .filter((node) => node.children?.length)
      .map((node) => node.children as IVirtualFileSystemNode[])
      .flat();
    node = searchNodeByCriterion(criterion, children, ++iteration);
    if (node) {
      return node;
    }
  }
  return node;
};

const isPathDirectChildOfDirectory = (
  path: string,
  potentialAncestor: string
) => {
  const matchEndOfPath = path.match(/\/[^/]+(?:\/?)$/);
  if (matchEndOfPath?.length === 1) {
    const lastPathSegment = matchEndOfPath[0];
    if (path.replace(lastPathSegment, "") === potentialAncestor) {
      return true;
    }
  }
  return false;
};

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
