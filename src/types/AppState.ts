import { Action } from "data/AppStateReducer";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";

export type AppState = {
  patterns: string[];
  files: IVirtualFileSystemNode[];
  error: Error | string | undefined;
};

export type Dispatch = React.Dispatch<Action>;
