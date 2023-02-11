import { getChildPath } from "data/PathUtilities";
import { useEffect, useRef } from "react";
import { Action, MAX_VFS_DEPTH } from "../data/AppStateReducer";
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
  isIgnored?: boolean;
  dispatch: React.Dispatch<Action>;
  onChange?: ChangedValueHandler;
};

const label = "Add file";

const VFileSystemNode = ({
  node: { path, isDir, readOnly, duplicate: isDuplicate = false },
  isIgnored,
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
      style={getInlineStyleSpacingFromTreeLevel(path)}
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
          aria-label={label}
          onClick={() =>
            dispatch({
              type: "addFile",
              payload: {
                path: getChildPath("file", path),
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

const getInlineStyleSpacingFromTreeLevel = (
  path: string
): React.CSSProperties => {
  const slashMatches = path.match(/\//g);
  const level = Math.floor(
    Math.max(0, Math.min(slashMatches?.length ?? 0, MAX_VFS_DEPTH))
  );
  return {
    marginLeft: `${(level - 1) * 2}rem`,
  };
};

export default VFileSystemNode;
