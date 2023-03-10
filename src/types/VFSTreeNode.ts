import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";

/**
 * From the user's perspective, the file system can be viewed as a tree with one root node, the repository root.
 * (so, even a DAG). This is not a practical representation of a file system, that's why we convert between
 * the two representations.
 */
export interface VFSTreeNode {
  node: IVirtualFileSystemNode;
  children: VFSTreeNode[];
}
