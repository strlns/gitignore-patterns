import { useEffect, useRef } from "react";
import { Action } from "../data/AppStateReducer";
import iconClassNames from "../styles/Icon.module.css";
import utilityClassNames from "../styles/Utilities.module.css";
import { ChangedValueHandler } from "../types/ChangedValueHandler";
import { IVirtualFileSystemNode } from "../types/IVirtualFileSystemNode";
import FolderIcon from "./Atoms/Icons/Folder";
import TextInput from "./Atoms/TextInput";
import SpacedList, { DIRECTIONS } from "./Containers/SpacedList";
import VFileSystemNodeActions from "./VFileSystemNodeActions";

type VFileSystemNodeProps = {
  node: IVirtualFileSystemNode;
  indentLevel: number;
  isIgnored?: boolean;
  dispatch: React.Dispatch<Action>;
  onChange?: ChangedValueHandler;
};

const VFileSystemNode = ({
  node,
  node: { path, isDir, readOnly, duplicate: isDuplicate = false },
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
        style={{ opacity: isDuplicate ? 1 : 0.75 }}
      />
      <VFileSystemNodeActions
        node={node}
        onAddChild={() =>
          dispatch({
            type: "addFile",
            payload: {
              path: `${path}/file`,
            },
          })
        }
      />
    </SpacedList>
  );
};

//sshhh...
const getInlineStyleSpacingFromTreeLevel = (level: number): React.CSSProperties => ({
  marginLeft: `${(level - 1) * 2}rem`,
});

export default VFileSystemNode;
