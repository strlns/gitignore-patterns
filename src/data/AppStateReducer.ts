import { AppState } from "../types/AppState";

const AppStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "addFile": {
      return {
        ...state,
        files: [
          ...state.files,
          {
            path: action.payload.path,
          },
        ],
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
        const fileToChange = structuredClone(state.files[index]);
        fileToChange.path = action.payload.path;
        return { ...state, files: newFiles };
      } else {
        throw new Error(
          `Index of out bounds, cannot change file with index  ${action.payload.index}`
        );
      }
    }
    case "addPattern": {
      const newPatterns = [...state.patterns, action.payload.path];
      return { ...state, patterns: newPatterns };
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
        const fileToChange = structuredClone(state.files[index]);
        fileToChange.path = action.payload.path;
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
To do: handle directories.
*/
type Action =
  | {
      type: "addFile";
      payload: {
        path: string;
      };
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
      payload: {
        path: string;
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
        path: string;
      };
    };
