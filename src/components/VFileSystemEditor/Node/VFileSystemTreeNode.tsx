import { Tooltip, Spacer } from "@geist-ui/core";
import Box, { BoxProps } from "components/Atoms/Box";
import Input from "components/Atoms/Input";
import VFileSystemNodeActions from "components/VFileSystemEditor/Node/VFileSystemNodeActions";
import VFileSystemNodeIcon from "components/VFileSystemEditor/Node/VFileSystemNodeIcon";
import { PATH_SPECIAL_CHARS_INFO_TEXT } from "components/VFileSystemEditor/VFileSystemEditor";
import { numberOfSlashes, removeTrailingSlash } from "data/PathUtilities";
import { useCallback, useMemo, useRef } from "react";
import { Dispatch } from "types/AppState";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "types/VFSTreeNode";

interface VFileSystemTreeNodeProps extends BoxProps {
  treeNode: VFSTreeNode;
  dispatch: Dispatch;
  /**indent according to tree level */
  indent: boolean;
}

type IChangeFilePathHandler = (file: IVirtualFileSystemNode, path: string) => void;

type Width = React.CSSProperties["width"];

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

  const { readOnly, path } = treeNode.node;

  const tooltipText = getTooltipText(treeNode.node);

  const inlineSpacingFromTreeLevel: Width = useMemo(() => {
    if (indent) {
      const level = numberOfSlashes(removeTrailingSlash(path));
      return getInlineStyleSpacingFromTreeLevel(level);
    }
  }, [path, indent]);

  return (
    <Box gap={2} style={{ opacity: treeNode.node.isIgnored ? 0.75 : 1 }}>
      <Box horizontal gap={2} alignItems="center" childrenCanShrink>
        {indent && <Spacer inline style={{ width: inlineSpacingFromTreeLevel }} />}
        {tooltipText ? (
          <Tooltip text={getTooltipText(treeNode.node)}>
            <VFileSystemNodeIcon node={treeNode.node} />
          </Tooltip>
        ) : (
          <VFileSystemNodeIcon node={treeNode.node} />
        )}
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

const getInlineStyleSpacingFromTreeLevel = (level: number): Width =>
  `calc(${Math.max(1, level) - 1} * 3 * var(--unit))`;

const getTooltipText = ({
  isIgnored,
  isInvalid,
}: IVirtualFileSystemNode): string | undefined => {
  if (isIgnored) {
    return "This file is ignored by your .gitignore";
  }
  if (isInvalid) {
    return PATH_SPECIAL_CHARS_INFO_TEXT;
  }
};

export default VFileSystemTreeNode;
