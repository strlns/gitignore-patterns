import { Input } from "@geist-ui/core";
import { Action } from "data/AppStateReducer";
import { numberOfSlashes } from "data/PathUtilities";
import { useCallback, useMemo, useRef } from "react";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "types/VFSTreeNode";
import Box, { BoxProps } from "./Atoms/Box";
import VFileSystemNodeActions from "./VFileSystemNodeActions";
import VFileSystemNodeIcon from "./VFileSystemNodeIcon";

interface VFileSystemTreeNodeProps extends BoxProps {
  treeNode: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
}

type IChangeFilePathHandler = (file: IVirtualFileSystemNode, path: string) => void;

const VFileSystemTreeNode = ({ treeNode, dispatch }: VFileSystemTreeNodeProps) => {
  const onChangeFilePath = useCallback<IChangeFilePathHandler>(
    (file, path) =>
      dispatch({
        type: "changeFilePath",
        payload: { id: file.id, path },
      }),
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const level = useMemo(() => numberOfSlashes(treeNode.node.path), []);
  const readOnly = treeNode.node.readOnly;

  return (
    <Box gap={2} style={getInlineStyleSpacingFromTreeLevel(level)}>
      <Box horizontal gap={2} alignItems="center">
        <VFileSystemNodeIcon node={treeNode.node} />
        <Input
          value={treeNode.node.path}
          onChange={(event) => onChangeFilePath(treeNode.node, event.currentTarget.value)}
          ref={inputRef}
          style={{ alignSelf: "stretch", pointerEvents: readOnly ? "none" : "auto" }}
          readOnly={readOnly}
        />
        <VFileSystemNodeActions
          node={treeNode.node}
          onAddChild={() =>
            dispatch({
              type: "addFile",
              payload: {
                path: `${treeNode.node.path}/file`,
              },
            })
          }
          onRemove={() =>
            dispatch({
              type: "removeFile",
              payload: {
                id: treeNode.node.id,
              },
            })
          }
        />
      </Box>
      {treeNode.children.map((child) => (
        <VFileSystemTreeNode treeNode={child} key={child.node.id} dispatch={dispatch} />
      ))}
    </Box>
  );
};

const getInlineStyleSpacingFromTreeLevel = (level: number): React.CSSProperties => ({
  marginLeft: `calc(${Math.max(1, level) - 1} * 3rem)`,
});

export default VFileSystemTreeNode;
