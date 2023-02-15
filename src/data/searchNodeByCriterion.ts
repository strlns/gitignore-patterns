import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { MAX_VFS_DEPTH } from "data/AppStateReducer";
import { VFSTreeNode } from "./VFSTreeNode";

/**
 * Expensive and hopefully not needed too often.
 * Uses BFS with recursion...
 */
export const searchNodeByCriterion = (
  criterion: (node: IVirtualFileSystemNode) => boolean,
  trees: VFSTreeNode[],
  iteration = 0
): IVirtualFileSystemNode | undefined => {
  for (const tree of trees) {
    if (criterion(tree.node)) {
      return tree.node;
    } else if (iteration < MAX_VFS_DEPTH) {
      const children = tree.children.map((node) => node.children).flat();
      return searchNodeByCriterion(criterion, children, ++iteration);
    }
  }
  return;
};
