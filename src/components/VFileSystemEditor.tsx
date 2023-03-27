import { Card, Text } from "@geist-ui/core";
import { Action } from "data/AppStateReducer";
import { VFSTreeNode } from "data/VFSTreeNode";
import VFileSystemTree from "./VFileSystemTree";

type VFileSystemEditorProps = {
  tree: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
};

const VFileSystemEditor = ({ tree, dispatch }: VFileSystemEditorProps) => {
  return (
    <Card>
      <Card.Content py={0}>
        <Text h3 mb={0}>
          Your files
        </Text>
      </Card.Content>
      <Card.Body>
        <VFileSystemTree dispatch={dispatch} tree={tree} />
      </Card.Body>
    </Card>
  );
};

export default VFileSystemEditor;
