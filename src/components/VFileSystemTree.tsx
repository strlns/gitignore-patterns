import { Toggle } from "@geist-ui/core";
import { VFSTreeNode } from "data/VFSTreeNode";
import useThemeUnit from "hooks/useUnit";
import { useState } from "react";
import { Action } from "../data/AppStateReducer";
import Box from "./Atoms/Box";
import VFileSystemTreeNode from "./VFileSystemTreeNode";

type VFileSystemTreeProps = {
  tree: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
  indent?: boolean;
};

const VFileSystemTree = ({ tree, dispatch }: VFileSystemTreeProps) => {
  const [isIndented, setIsIndented] = useState(true);

  const unit = useThemeUnit();

  return (
    <Box>
      <Box horizontal tagName="label" alignItems="center" style={{ marginBottom: unit }}>
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
