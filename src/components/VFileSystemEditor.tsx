import { Action } from "data/AppStateReducer";
import { getChildPath } from "data/PathUtilities";
import { IVirtualFileSystemNode } from "../types/IVirtualFileSystemNode";
import Button from "./Atoms/Button";
import SpacedList, { DIRECTIONS } from "./Containers/SpacedList";
import VFileSystemNode from "./VFileSystemNode";

type VFileSystemEditorProps = {
  files: IVirtualFileSystemNode[];
  dispatch: React.Dispatch<Action>;
};

const VFileSystemEditor = ({ files, dispatch }: VFileSystemEditorProps) => {
  return (
    <>
      <SpacedList>
        {files.map((file, index) => (
          <VFileSystemNode
            key={index}
            node={file}
            dispatch={dispatch}
            onChange={(path) =>
              dispatch({
                type: "changeFilePath",
                payload: { index, path },
              })
            }
          />
        ))}
      </SpacedList>
      <SpacedList direction={DIRECTIONS.Horizontal} isFlex={true}>
        <Button onClick={() => dispatch({ type: "addFile" })}>
          Add file at root level
        </Button>
      </SpacedList>
    </>
  );
};

export default VFileSystemEditor;
