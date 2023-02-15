import {
  getPathName,
  isPathDescendantOfOtherPath,
  isPathDirectChildOfDirectory,
  numberOfSlashes,
} from "data/PathUtilities";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "types/VFSTreeNode";
import { logSerialized } from "utilities/debug";
import { ROOT_VFS_NODE } from "./AppStateReducer";

const VFSTreeRootNode: VFSTreeNode = {
  node: ROOT_VFS_NODE,
  children: [] as VFSTreeNode[],
};

type TreeMap = Map<IVirtualFileSystemNode, IVirtualFileSystemNode[]>;
type TreeMapByPaths = Map<string, [IVirtualFileSystemNode, IVirtualFileSystemNode[]]>;

//This is pretty expensive, but this app is not built to deal with huge
//file system trees.
export const getTreeFromVFSNodes = (
  nodes: IVirtualFileSystemNode[],
  sortAlphabetically = false
) => {
  const treeMap = new Map() as TreeMap;
  const treeMapByPaths = new Map() as TreeMapByPaths;
  //sort by number of slashes
  nodes.sort((nodeA, nodeB) => {
    const [a, b] = [numberOfSlashes(nodeA.path), numberOfSlashes(nodeB.path)];
    if (a > b) return -1;
    if (b < a) return 1;
    return 0;
  });
  if (sortAlphabetically) {
    nodes.sort((nodeA, nodeB) => nodeA.path.localeCompare(nodeB.path));
  }
  for (const node of nodes) {
    if (node.isDir) {
      const children = treeMapByPaths.get(node.path)?.[1] ?? [];
      treeMap.set(node, children);
      treeMapByPaths.set(node.path, [node, children]);
      const parentPath = getPathName(node.path);
      const [parent, siblings] = treeMapByPaths.get(parentPath) ?? [];
      console.log("#", node.path, parent, siblings, parent, node);

      if (parent && siblings && parent !== node) {
        const newSiblings = [...siblings, node];
        treeMapByPaths.set(parentPath, [parent, newSiblings]);
        treeMap.set(parent, newSiblings);
      }
    } else {
      const parentPath = getPathName(node.path);
      const siblings = treeMapByPaths.get(parentPath)?.[1] ?? [];
      const newSiblings = [...siblings, node];
      const parent = treeMapByPaths.get(parentPath)?.[0];
      treeMapByPaths.set(parentPath, [node, newSiblings]);
      if (parent) {
        treeMap.set(parent, newSiblings);
      } else {
        throw new Error("detached path");
      }
    }
  }

  return treeFromSortedMap(treeMap);
};

/*
Map keys are ordered and we sorted:
- ascending by number of slashes.
- alphabetically, if the user wants to.
Now collect the files for each path and build an object tree.
*/
const treeFromSortedMap = (treeMap: TreeMap): VFSTreeNode => {
  const tree = structuredClone(VFSTreeRootNode) as VFSTreeNode;
  let first = true;
  let curTreeNode = tree;
  let i = 0;
  for (const [vfsNode, vfsChildren] of treeMap.entries()) {
    ++i;

    if (first) {
      if (vfsNode.path !== curTreeNode.node.path) {
        console.error(JSON.stringify(vfsNode));
        throw new Error("Map must be ordered and start with root node");
      }
      first = false;
      curTreeNode.children = vfsChildren.map((child) => vfsToTreeNode(child));
      continue;
    }

    const newTreeNode = vfsToTreeNode(vfsNode, vfsChildren);
    if (isPathDirectChildOfDirectory(vfsNode.path, curTreeNode.node.path)) {
      curTreeNode.children.push(newTreeNode);
    } else if (isPathDescendantOfOtherPath(vfsNode.path, curTreeNode.node.path)) {
      console.log("DESC");
    } else {
      console.log(
        "Not a descendant: ",
        JSON.stringify(vfsNode),
        JSON.stringify(curTreeNode)
      );
    }
    curTreeNode = newTreeNode;
  }
  logSerialized(tree, "tree");
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
