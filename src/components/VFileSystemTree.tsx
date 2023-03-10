import { VFSTreeNode } from "data/VFSTreeNode";
import { Action } from "../data/AppStateReducer";
import VFileSystemTreeNode from "./VFileSystemTreeNode";

type VFileSystemTreeProps = {
  tree: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
};

const VFileSystemTree = ({ tree, dispatch }: VFileSystemTreeProps) => {
  return <VFileSystemTreeNode treeNode={tree} dispatch={dispatch} />;
};

export default VFileSystemTree;
