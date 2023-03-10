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

  const { isIgnored, readOnly, path } = treeNode.node;

  const inlineSpacingFromTreeLevel = useMemo(() => {
    const level = numberOfSlashes(path);
    return getInlineStyleSpacingFromTreeLevel(level);
  }, [path]);

  const styles = {
    ...inlineSpacingFromTreeLevel,
    opacity: treeNode.node.isIgnored ? 0.25 : 1,
  };

  return (
    <Box gap={2} style={styles}>
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
          onAddDirectory={() =>
            dispatch({
              type: "addFile",
              payload: {
                path: `${treeNode.node.path}/dir/`,
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
        {isIgnored && "IGNORED"}
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
