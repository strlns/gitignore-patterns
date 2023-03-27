import { Card, Text, Tooltip } from "@geist-ui/core";
import { InfoFill } from "@geist-ui/icons";
import { Action } from "data/AppStateReducer";
import { VFSTreeNode } from "data/VFSTreeNode";
import useThemeUnit from "hooks/useUnit";
import Box from "./Atoms/Box";
import VFileSystemTree from "./VFileSystemTree";

type VFileSystemEditorProps = {
  tree: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
};

const VFileSystemEditor = ({ tree, dispatch }: VFileSystemEditorProps) => {
  const unit = useThemeUnit();

  return (
    <Card>
      <Card.Content py={0}>
        <Box horizontal alignItems="center" style={{ marginTop: unit }}>
          <Text h3 mb={0} style={{ marginTop: 0 }}>
            Your files
          </Text>
          <Tooltip
            style={{ display: "inline-flex" }}
            placement="right"
            text={[
              `Some special characters you enter here
will be escaped using a backslash, just for funsies.
Note that technically, only / is forbidden
in linux file names.
Asteriks, question marks and the like cause
trouble in shells, but may be part
of a filename.

Spaces cause trouble in shells too,
but are NOT escaped here.`,
            ]}
          >
            <InfoFill />
          </Tooltip>
        </Box>
      </Card.Content>
      <Card.Body>
        <VFileSystemTree dispatch={dispatch} tree={tree} />
      </Card.Body>
    </Card>
  );
};

export default VFileSystemEditor;
