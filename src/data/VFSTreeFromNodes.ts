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
import { MAX_VFS_DEPTH } from "./AppStateReducer";
import { searchVFSTreeNodeByCriterion } from "./searchNodeByCriterion";

const VFSTreeRootNode: VFSTreeNode = {
  node: ROOT_VFS_NODE,
  children: [] as VFSTreeNode[],
};

export const pathsToTree = (vfsNodes: IVirtualFileSystemNode[]): VFSTreeNode => {
  const nodes = sortByPathDepth(vfsNodes);
  const tree = structuredClone(VFSTreeRootNode) as VFSTreeNode;
  while (nodes.length) {
    const node = nodes.pop();
    if (!node) {
      continue;
    }
    const path = normalizePath(node.path);
    if (isRootPath(path) && node.readOnly) {
      continue;
    }
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
    } else {
      logSerialized(tree, "Tree nodes");
      logSerialized(nodes, "remaining nodes");
      throw new Error(
        `Could not find parent tree node for path ${node.path}, 
        but it should already have been created`
      );
    }
  }
  //return sortTreeNodes(tree);
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

type TreeNodeSortFunction = (nodeA: VFSTreeNode, nodeB: VFSTreeNode) => number;

const defaultTreeNodeSortFn: TreeNodeSortFunction = (nodeA, nodeB) =>
  String.prototype.localeCompare.call(nodeA.node.id, nodeB.node.id);

const sortTreeNodes = (
  tree: VFSTreeNode,
  sortFn = defaultTreeNodeSortFn,
  iteration = 0
) => {
  tree.children.sort(sortFn);
  if (iteration < MAX_VFS_DEPTH) {
    for (const child of tree.children) {
      sortTreeNodes(child, sortFn, ++iteration);
    }
  }
  return tree;
};
