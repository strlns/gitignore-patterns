import { useEffect, useRef } from "react";
import { Action } from "../data/AppStateReducer";
import iconClassNames from "../styles/Icon.module.css";
import utilityClassNames from "../styles/Utilities.module.css";
import { ChangedValueHandler } from "../types/ChangedValueHandler";
import { IVirtualFileSystemNode } from "../types/IVirtualFileSystemNode";
import Button from "./Atoms/Button";
import FolderIcon from "./Atoms/Icons/Folder";
import PlusIcon from "./Atoms/Icons/Plus";
import TextInput from "./Atoms/TextInput";
import SpacedList, { DIRECTIONS } from "./Containers/SpacedList";

type VFileSystemNodeProps = {
  node: IVirtualFileSystemNode;
  indentLevel: number;
  isIgnored?: boolean;
  dispatch: React.Dispatch<Action>;
  onChange?: ChangedValueHandler;
};

const VFileSystemNode = ({
  node: { path, isDir, readOnly, duplicate: isDuplicate = false },
  isIgnored,
  indentLevel,
  onChange,
  dispatch,
}: VFileSystemNodeProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [path]);

  return (
    <SpacedList
      direction={DIRECTIONS.Horizontal}
      isFlex={true}
      style={getInlineStyleSpacingFromTreeLevel(indentLevel)}
    >
      {isDir ? <FolderIcon /> : <span className={iconClassNames.icon}></span>}
      <TextInput
        value={path}
        ref={inputRef}
        onChange={onChange}
        readOnly={readOnly}
        className={utilityClassNames.flexGrow1}
      />

      {isDir && !isDuplicate && (
        <Button
          square
          onClick={() =>
            dispatch({
              type: "addFile",
              payload: {
                path: `${path}/file`,
              },
            })
          }
        >
          <PlusIcon title="Add child" />
        </Button>
      )}
    </SpacedList>
  );
};

//sshhh...
const getInlineStyleSpacingFromTreeLevel = (level: number): React.CSSProperties => ({
  marginLeft: `${(level - 1) * 2}rem`,
});

export default VFileSystemNode;
