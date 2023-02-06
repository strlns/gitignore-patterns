export type AppState = {
  patterns: string[];
  files: IVirtualFileSystemNode[];
};

interface IVirtualFileSystemNode {
  path: string;
}

export type VirtualFileSystemNode = File | Directory;

interface Directory extends IVirtualFileSystemNode {
  isDir: true;
  path: string;
}

interface File extends IVirtualFileSystemNode {
  isDir: true;
  path: string;
}
