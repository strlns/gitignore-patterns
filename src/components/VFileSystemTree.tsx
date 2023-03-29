import { Toggle } from "@geist-ui/core";
import Box from "components/Atoms/Box";
import VFileSystemTreeNode from "components/VFileSystemEditor/Node/VFileSystemTreeNode";
import { VFSTreeNode } from "data/VFSTreeNode";
import useThemeUnit from "hooks/useUnit";
import { useState } from "react";
import { Dispatch } from "types/AppState";

type VFileSystemTreeProps = {
  tree: VFSTreeNode;
  dispatch: Dispatch;
  indent?: boolean;
};

const VFileSystemTree = ({ tree, dispatch }: VFileSystemTreeProps) => {
  const [isIndented, setIsIndented] = useState(true);

  const unit = useThemeUnit();

  return (
    <Box>
      <Box
        horizontal
        tagName="label"
        alignItems="center"
        style={{ marginBottom: unit, cursor: "pointer", fontSize: "var(--font-size-sm)" }}
      >
        <Toggle
          initialChecked={isIndented}
          checked={isIndented}
          onChange={(event) => {
            setIsIndented(event.target.checked);
          }}
          style={{
            marginTop: "0.25ex",
            padding: 0,
          }}
        />
        Indent rows according to depth
      </Box>
      <VFileSystemTreeNode treeNode={tree} dispatch={dispatch} indent={isIndented} />
    </Box>
  );
};

export default VFileSystemTree;
