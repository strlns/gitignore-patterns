import { ChangedValueHandler } from "../types/ChangedValueHandler";
import Button from "./Atoms/Button";
import TextInput from "./Atoms/TextInput";
import SpacedList, { DIRECTIONS } from "./Containers/SpacedList";
import iconClassNames from "../styles/Icon.module.css";
import utilityClassNames from "../styles/Utilities.module.css";
import { Action } from "../data/AppStateReducer";
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
  console.log(path, isDir, readOnly);

  return (
    <SpacedList direction={DIRECTIONS.Horizontal} isFlex={true}>
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

export default VFileSystemNode;
