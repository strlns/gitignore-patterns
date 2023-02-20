import { numberOfSlashes } from "data/PathUtilities";
import { VFSTreeNode } from "data/VFSTreeNode";
import { useCallback } from "react";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { Action } from "../data/AppStateReducer";
import SpacedList from "./Containers/SpacedList";
import VFileSystemNode from "./VFileSystemNode";

type VFileSystemTreeProps = {
  tree: VFSTreeNode;
  dispatch: React.Dispatch<Action>;
};

type IChangeFilePathHandler = (file: IVirtualFileSystemNode, path: string) => void;

const VFileSystemTree = ({ tree, dispatch }: VFileSystemTreeProps) => {
  const onChangeFilePath = useCallback<IChangeFilePathHandler>(
    (file, path) =>
      dispatch({
        type: "changeFilePath",
        payload: { id: file.id, path },
      }),
    []
  );
  return (
    <SpacedList>
      <VFileSystemNode
        dispatch={dispatch}
        node={tree.node}
        indentLevel={numberOfSlashes(tree.node.path)}
        onChange={(path) => onChangeFilePath(tree.node, path)}
      />
      <>
        {tree.children.map((child) => (
          <VFileSystemTree key={child.node.id} tree={child} dispatch={dispatch} />
        ))}
      </>
    </SpacedList>
  );
};

export default VFileSystemTree;
