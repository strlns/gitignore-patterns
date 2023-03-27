import { Input } from "@geist-ui/core";
import { Action } from "data/AppStateReducer";
import { numberOfSlashes, removeTrailingSlash } from "data/PathUtilities";
import { useCallback, useMemo, useRef } from "react";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "types/VFSTreeNode";
import Box, { BoxProps } from "./Atoms/Box";
import VFileSystemNodeActions from "./VFileSystemNodeActions";
import VFileSystemNodeIcon from "./VFileSystemNodeIcon";

interface VFileSystemTreeNodeProps extends BoxProps {
  treeNode: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
  /**indent according to tree level */
  indent: boolean;
}

type IChangeFilePathHandler = (file: IVirtualFileSystemNode, path: string) => void;

const VFileSystemTreeNode = ({
  treeNode,
  dispatch,
  indent = true,
}: VFileSystemTreeNodeProps) => {
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
    if (!indent) {
      return null;
    }
    const level = numberOfSlashes(removeTrailingSlash(path));
    return getInlineStyleSpacingFromTreeLevel(level);
  }, [path, indent]);

  const styles = useMemo(
    () => ({
      ...inlineSpacingFromTreeLevel,
      opacity: treeNode.node.isIgnored ? 0.25 : 1,
    }),
    [inlineSpacingFromTreeLevel, treeNode.node.isIgnored]
  );

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
        <VFileSystemTreeNode
          treeNode={child}
          key={child.node.id}
          dispatch={dispatch}
          indent={indent}
        />
      ))}
    </Box>
  );
};

const getInlineStyleSpacingFromTreeLevel = (level: number): React.CSSProperties => ({
  marginLeft: `calc(${Math.max(1, level) - 1} * 3rem)`,
});

export default VFileSystemTreeNode;
