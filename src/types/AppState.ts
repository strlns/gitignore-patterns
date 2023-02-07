import { IVirtualFileSystemNode } from "./IVirtualFileSystemNode";

export type AppState = {
  patterns: string[];
  files: IVirtualFileSystemNode[];
};
