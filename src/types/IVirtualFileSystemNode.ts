export interface IVirtualFileSystemNode {
  path: string;
  children?: IVirtualFileSystemNode[];
  isDir: boolean;
  /*In this app, the user cannot remove the root directory of his virtual git repository.*/
  readonly readOnly?: boolean;
}

type VirtualFileSystemNode = File | Directory;

interface Directory extends IVirtualFileSystemNode {
  isDir: false;
  path: string;
  children: IVirtualFileSystemNode[];
}

interface File extends IVirtualFileSystemNode {
  isDir: false;
  path: string;
}
