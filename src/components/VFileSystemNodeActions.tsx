import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import Button from "./Atoms/Button";
import PlusIcon from "./Atoms/Icons/Plus";

type VFileSystemNodeActionProps = {
  onAddChild: (parentPath: string) => void;
  node: IVirtualFileSystemNode;
};

const VFileSystemNodeActions = ({
  node,
  onAddChild,
}: VFileSystemNodeActionProps) => {
  return node.isDir && !node.duplicate ? (
    <Button square onClick={() => onAddChild(node.path)}>
      <PlusIcon title="Add child" />
    </Button>
  ) : (
    <></>
  );
};

export default VFileSystemNodeActions;
