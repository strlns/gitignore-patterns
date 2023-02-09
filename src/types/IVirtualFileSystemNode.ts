export interface IVirtualFileSystemNode {
  path: string;
  isDir: boolean;
  /*In this app, the user cannot remove the root directory of his virtual git repository.*/
  readonly readOnly?: boolean;
}

type VirtualFileSystemNode = File | Directory;

export interface Directory extends IVirtualFileSystemNode {
  isDir: false;
  path: string;
}

interface File extends IVirtualFileSystemNode {
  isDir: false;
  path: string;
}
