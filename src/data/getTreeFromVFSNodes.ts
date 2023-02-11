import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { getPathName, numberOfSlashes } from "data/PathUtilities";

//This is currently absurdly expensive, but this app is not built to deal with huge
//file system trees.
export const getTreeFromVFSNodes = (nodes: IVirtualFileSystemNode[]) => {
  const tree = new Map<string, IVirtualFileSystemNode[]>();
  nodes.sort((node) => numberOfSlashes(node.path));
  nodes.sort((nodeA, nodeB) => nodeA.path.localeCompare(nodeB.path));
  for (const node of nodes) {
    if (node.isDir) {
      const children = tree.get(node.path) ?? [];
      children.push(node);
      tree.set(node.path, children);
    } else {
      const pathName = getPathName(node.path);
      const children = tree.get(pathName) ?? [];
      children.push(node);
      tree.set(pathName, children);
    }
  }
  return tree;
};
