import { Action } from "data/AppStateReducer";
import { VFSTreeNode } from "data/VFSTreeNode";
import Container from "./Containers/Container";
import VFileSystemTree from "./VFileSystemTree";

type VFileSystemEditorProps = {
  tree: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
};

const VFileSystemEditor = ({ tree, dispatch }: VFileSystemEditorProps) => {
  return (
    <Container size="lg">
      <VFileSystemTree tree={tree} dispatch={dispatch} />
    </Container>
  );
};

export default VFileSystemEditor;
