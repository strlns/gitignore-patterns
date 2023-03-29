import { Card, Text, Tooltip } from "@geist-ui/core";
import { InfoFill } from "@geist-ui/icons";
import TooltipButton from "components/Atoms/TooltipButton";
import VFileSystemTree from "components/VFileSystemTree";
import { VFSTreeNode } from "data/VFSTreeNode";
import { Dispatch } from "types/AppState";

type VFileSystemEditorProps = {
  tree: VFSTreeNode;
  dispatch: Dispatch;
};

export const PATH_FORMAT_INFO_TEXT = "";

export const PATH_SPECIAL_CHARS_INFO_TEXT = `Some special characters you enter here
will be escaped using a backslash, just for funsies.
Note that technically, only / is forbidden
in linux file names.
Asteriks, question marks and the like cause
trouble in shells, but may be part
of a filename.

Spaces cause trouble in shells too,
but are NOT escaped here.`;

const VFileSystemEditor = ({ tree, dispatch }: VFileSystemEditorProps) => {
  return (
    <Card>
      <Card.Content py={0}>
        <Text h3 mb={0}>
          Your files
        </Text>
      </Card.Content>
      <Card.Body>
        <Text p small>
          All paths must be entered with a leading slash, as if the git repository lived
          at the root of a file system.
        </Text>
        <Text p small>
          Some special characters are auto-escaped, despite being technically allowed.
        </Text>
        <Tooltip
          style={{ display: "inline-flex", fontSize: "var(--font-size-sm)" }}
          placement="right"
          text={PATH_SPECIAL_CHARS_INFO_TEXT}
        >
          More information
          <TooltipButton icon={<InfoFill />} />
        </Tooltip>
        <Text p small>
          This app assumes paths use exclusively the forward slash as separator.
          Windows-style paths are not supported.
        </Text>
        <VFileSystemTree dispatch={dispatch} tree={tree} />
      </Card.Body>
    </Card>
  );
};

export default VFileSystemEditor;
