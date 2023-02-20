import {
  isPathDescendantOfOtherPath,
  isPathDirectChildOfDirectory,
  isRootPath,
  normalizePath,
  ROOT_VFS_NODE,
  sortByPathDepth,
} from "data/PathUtilities";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "types/VFSTreeNode";
import { logSerialized } from "utilities/debug";
import { searchVFSTreeNodeByCriterion } from "./searchNodeByCriterion";

const VFSTreeRootNode: VFSTreeNode = {
  node: ROOT_VFS_NODE,
  children: [] as VFSTreeNode[],
};

export const pathsToTreeSimple = (vfsNodes: IVirtualFileSystemNode[]): VFSTreeNode => {
  const nodes = sortByPathDepth(vfsNodes);
  console.log(JSON.stringify(vfsNodes));

  const tree = structuredClone(VFSTreeRootNode) as VFSTreeNode;
  while (nodes.length) {
    const node = nodes.pop();
    if (!node || isRootPath(node.path)) continue;
    const path = normalizePath(node.path);
    if (isPathDirectChildOfDirectory(path, ROOT_VFS_NODE.path)) {
      tree.children.push(vfsToTreeNode(node));
      continue;
    }

    let parentTreeNode = searchVFSTreeNodeByCriterion(
      (treeNode) => isPathDirectChildOfDirectory(node.path, treeNode.path),
      [tree]
    );

    if (!parentTreeNode) {
      parentTreeNode = searchVFSTreeNodeByCriterion(
        (treeNode) => isPathDescendantOfOtherPath(node.path, treeNode.path),
        [tree]
      );
    }

    if (parentTreeNode) {
      parentTreeNode.children.push(vfsToTreeNode(node));
      console.log("Added " + node.path);
    } else {
      logSerialized(tree, "Tree nodes");
      logSerialized(nodes, "remaining nodes");
      throw new Error(
        `Could not find parent tree node for path ${node.path}, 
        but it should already have been created`
      );
    }
  }
  return tree;
};

const vfsToTreeNode = (
  node: IVirtualFileSystemNode,
  children: IVirtualFileSystemNode[] = []
): VFSTreeNode => {
  return {
    node,
    children: children.map((child) => vfsToTreeNode(child)),
  };
};
