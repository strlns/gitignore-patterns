import { ChangedValueHandler } from "../types/ChangedValueHandler";
import Button from "./Atoms/Button";
import TextInput from "./Atoms/TextInput";
import SpacedList, { DIRECTIONS } from "./Containers/SpacedList";
import iconClassNames from "../styles/Icon.module.css";
import utilityClassNames from "../styles/Utilities.module.css";
import { Action, MAX_VFS_DEPTH } from "../data/AppStateReducer";
import { IVirtualFileSystemNode } from "../types/IVirtualFileSystemNode";

type VFileSystemNodeProps = {
  node: IVirtualFileSystemNode;
  isIgnored?: boolean;
  onChange?: ChangedValueHandler;
  dispatch: React.Dispatch<Action>;
  readOnly?: boolean;
};

const label = "Add file";

const VFileSystemNode = ({
  node: { path, isDir, readOnly },
  isIgnored,
  onChange,
  dispatch,
}: VFileSystemNodeProps) => {
  return (
    <SpacedList
      direction={DIRECTIONS.Horizontal}
      isFlex={true}
      style={getInlineStyleSpacingFromTreeLevel(path)}
    >
      {isDir ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={iconClassNames.icon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
      ) : (
        <span className={iconClassNames.icon}></span>
      )}
      <TextInput
        value={path}
        onChange={onChange}
        readOnly={readOnly}
        className={utilityClassNames.flexGrow1}
      />
      {isDir && (
        <Button
          square
          aria-label={label}
          onClick={() =>
            dispatch({
              type: "addFile",
              payload: { path: `${path}file`, parentPath: path },
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={iconClassNames.icon}
          >
            <title>{label}</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
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
