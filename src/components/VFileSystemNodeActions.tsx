import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import Button from "./Atoms/Button";
import PlusIcon from "./Atoms/Icons/Plus";
import TrashIcon from "./Atoms/Icons/Trash";
import SpacedList, { DIRECTIONS, SPACINGS } from "./Containers/SpacedList";

type VFileSystemNodeActionProps = {
  onAddChild: (parentPath: string) => void;
  onRemove: (node: IVirtualFileSystemNode) => void;
  node: IVirtualFileSystemNode;
};

const VFileSystemNodeActions = ({
  node,
  onAddChild,
  onRemove,
}: VFileSystemNodeActionProps) => {
  const labelAddChild = "Add child";
  const labelRemove = "Remove";

  return (
    <SpacedList flex spacing={SPACINGS.Tight} direction={DIRECTIONS.Horizontal}>
      {node.isDir && (
        <Button square title={labelAddChild} onClick={() => onAddChild(node.path)}>
          <PlusIcon title={labelAddChild} />
        </Button>
      )}
      <Button square title={labelRemove} onClick={() => onRemove(node)}>
        <TrashIcon title={labelRemove} />
      </Button>
    </SpacedList>
  );
};

export default VFileSystemNodeActions;
