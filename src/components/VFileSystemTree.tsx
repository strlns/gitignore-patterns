import { Tree } from "@geist-ui/core";
import { VFSTreeNode } from "data/VFSTreeNode";
import { useCallback } from "react";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { Action } from "../data/AppStateReducer";
import VFileSystemTreeNode from "./VFileSystemTreeNode";

type VFileSystemTreeProps = {
  tree: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
};

const VFileSystemTree = ({ tree, dispatch }: VFileSystemTreeProps) => {
  return (
    <Tree initialExpand={true}>
      <VFileSystemTreeNode treeNode={tree} dispatch={dispatch} />
    </Tree>
  );
};

export default VFileSystemTree;
