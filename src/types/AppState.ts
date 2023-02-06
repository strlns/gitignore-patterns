export type AppState = {
  patterns: string[];
  files: IVirtualFileSystemNode[];
};

interface IVirtualFileSystemNode {
  path: string;
  children?: IVirtualFileSystemNode[];
}

export type VirtualFileSystemNode = File | Directory;

interface Directory extends IVirtualFileSystemNode {
  isDir: true;
  path: string;
  children: IVirtualFileSystemNode[];
}

interface File extends IVirtualFileSystemNode {
  isDir: false;
  path: string;
}
