import { IVirtualFileSystemNode } from "./IVirtualFileSystemNode";

export type AppState = {
  patterns: string[];
  files: IVirtualFileSystemNode[];
  error: Error | string | undefined;
};
