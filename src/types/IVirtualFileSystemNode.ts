export interface IVirtualFileSystemNode {
  path: string;
  children?: IVirtualFileSystemNode[];
  /*In this app, the user cannot remove the root directory of his virtual git repository.*/
  readonly readOnly?: boolean;
}

type VirtualFileSystemNode = File | Directory;

interface Directory extends IVirtualFileSystemNode {
  isDir: true;
  path: string;
  children: IVirtualFileSystemNode[];
}

interface File extends IVirtualFileSystemNode {
  isDir: false;
  path: string;
}
