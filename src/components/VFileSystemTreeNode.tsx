import { Grid, Input, Spacer, Tree } from "@geist-ui/core";
import { Action } from "data/AppStateReducer";
import { useCallback, useState } from "react";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "types/VFSTreeNode";
import VFileSystemNodeActions from "./VFileSystemNodeActions";

type VFileSystemTreeNodeProps = {
  treeNode: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
};

type IChangeFilePathHandler = (file: IVirtualFileSystemNode, path: string) => void;

export default function VFileSystemTreeNode({
  treeNode,
  dispatch,
}: VFileSystemTreeNodeProps) {
  const alignment = treeNode.node.isDir ? "flex-start" : "center";

  const onChangeFilePath = useCallback<IChangeFilePathHandler>(
    (file, path) =>
      dispatch({
        type: "changeFilePath",
        payload: { id: file.id, path },
      }),
    []
  );

  const [isEditName, setEditName] = useState(false);

  const toggleEditName = () => setEditName((prev) => !prev);

  return (
    <Grid.Container gap={1} alignItems={alignment} justify="center">
      <Grid xs alignItems="center">
        {treeNode.node.isDir ? (
          <Tree.Folder
            name={isEditName ? "" : treeNode.node.path}
            onClick={toggleEditName}
            onBlur={() => setEditName(false)}
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
            onClick={toggleEditName}
            onBlur={() => setEditName(false)}
          />
        )}

        {isEditName && (
          <Input
            value={treeNode.node.path}
            onChange={(event) =>
              onChangeFilePath(treeNode.node, event.currentTarget.value)
            }
          />
        )}
      </Grid>
      <Grid>
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
      </Grid>
    </Grid.Container>
  );
}
