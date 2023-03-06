import { Action } from "data/AppStateReducer";
import { VFSTreeNode } from "data/VFSTreeNode";
import VFileSystemTree from "./VFileSystemTree";

type VFileSystemEditorProps = {
  tree: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
};

const VFileSystemEditor = ({ tree, dispatch }: VFileSystemEditorProps) => {
  return <VFileSystemTree tree={tree} dispatch={dispatch} />;
};

export default VFileSystemEditor;
