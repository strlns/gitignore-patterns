import { Input, Tree } from "@geist-ui/core";
import { Action } from "data/AppStateReducer";
import { useCallback, useEffect, useRef, useState } from "react";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "types/VFSTreeNode";
import { useOnClickOutside } from "usehooks-ts";
import Box, { BoxProps } from "./Atoms/Box";
import VFileSystemNodeActions from "./VFileSystemNodeActions";

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

  const [isEditName, setEditName] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickOutsideInput = useCallback(() => {
    setEditName(false);
  }, []);

  useOnClickOutside(inputRef, onClickOutsideInput);

  const toggleEditName = useCallback(
    (force?: boolean) => {
      if (treeNode.node.readOnly) {
        return;
      }
      setEditName((prev) => force ?? !prev);
    },
    [treeNode]
  );

  useEffect(() => {
    if (isEditName) {
      inputRef.current?.focus();
    }
  }, [isEditName]);

  return (
    <Box horizontal gap={0}>
      {treeNode.node.isDir ? (
        <Tree.Folder
          name={isEditName ? "" : treeNode.node.path}
          style={{ flexGrow: isEditName ? 0 : 1 }}
          onClick={() => toggleEditName(true)}
        >
          {treeNode.children.map((child) => (
            <VFileSystemTreeNode
              key={child.node.id}
              treeNode={child}
              dispatch={dispatch}
            />
          ))}
        </Tree.Folder>
      ) : (
        <Tree.File
          name={isEditName ? "" : treeNode.node.path}
          style={{ flexGrow: isEditName ? 0 : 1 }}
          onClick={() => toggleEditName(true)}
        />
      )}

      {isEditName && (
        <div style={{ flexGrow: 1 }}>
          <Input
            value={treeNode.node.path}
            onChange={(event) =>
              onChangeFilePath(treeNode.node, event.currentTarget.value)
            }
            style={{ flexGrow: isEditName ? 1 : 0 }}
            onBlur={() => {
              toggleEditName(false);
            }}
            ref={inputRef}
          />
        </div>
      )}
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
  );
};

export default VFileSystemTreeNode;
