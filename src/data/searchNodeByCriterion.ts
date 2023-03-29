import { MAX_VFS_DEPTH } from "data/AppStateReducer";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "data/VFSTreeNode";

/**
 * Expensive and hopefully not needed too often.
 * Uses BFS with recursion...
 */
export const searchVFSTreeNodeByCriterion = (
  criterion: (node: IVirtualFileSystemNode) => boolean,
  trees: VFSTreeNode[],
  iteration = 0
): VFSTreeNode | undefined => {
  for (const tree of trees) {
    if (criterion(tree.node)) {
      return tree;
    } else if (iteration < MAX_VFS_DEPTH) {
      const children = tree.children.map((node) => node.children).flat();
      return searchVFSTreeNodeByCriterion(criterion, children, ++iteration);
    }
  }
  return;
};
