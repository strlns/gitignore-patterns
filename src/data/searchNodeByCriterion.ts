import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTree, MAX_VFS_DEPTH } from "data/AppStateReducer";

/**
 * Absurdly expensive and hopefully not needed too often.
 * Uses BFS with recursion...
 */
const searchNodeByCriterion = (
  criterion: (node: IVirtualFileSystemNode) => boolean,
  trees: VFSTree[],
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
