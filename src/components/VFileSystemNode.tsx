import { useEffect, useRef } from "react";
import { Action } from "../data/AppStateReducer";
import { ChangedValueHandler } from "../types/ChangedValueHandler";
import { IVirtualFileSystemNode } from "../types/IVirtualFileSystemNode";
import TextInput from "./Atoms/TextInput";
import SpacedList, { DIRECTIONS } from "./Containers/SpacedList";
import VFileSystemNodeActions from "./VFileSystemNodeActions";
import VFileSystemNodeIcon from "./VFileSystemNodeIcon";

type VFileSystemNodeProps = {
  node: IVirtualFileSystemNode;
  indentLevel: number;
  isIgnored?: boolean;
  dispatch: React.Dispatch<Action>;
  onChange?: ChangedValueHandler;
};

const VFileSystemNode = ({
  node,
  node: { path, readOnly, duplicate: isDuplicate = false },
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
      flex={true}
      style={getInlineStyleSpacingFromTreeLevel(indentLevel)}
    >
      <VFileSystemNodeIcon node={node} />
      <TextInput
        value={path}
        ref={inputRef}
        onChange={onChange}
        readOnly={readOnly}
        style={{ opacity: isDuplicate ? 0.5 : 1 }}
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
        onRemove={() =>
          dispatch({
            type: "removeFile",
            payload: {
              id: node.id,
            },
          })
        }
      />
    </SpacedList>
  );
};

//sshhh... replace this with tree UI component
const getInlineStyleSpacingFromTreeLevel = (level: number): React.CSSProperties => ({
  marginLeft: `calc(${Math.max(1, level) - 1} * 1.125rem)`,
});

export default VFileSystemNode;
