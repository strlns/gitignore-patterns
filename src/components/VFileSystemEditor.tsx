import { Action } from "data/AppStateReducer";
import { VFSTreeNode } from "data/VFSTreeNode";
import Button from "./Atoms/Button";
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
      <Button onClick={() => dispatch({ type: "addFile" })}>
        Add file at root level
      </Button>
    </Container>
  );
};

export default VFileSystemEditor;
