import { Button, ButtonGroup } from "@geist-ui/core";
import { FilePlus, Trash } from "@geist-ui/icons";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";

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
  return (
    <ButtonGroup>
      {node.isDir && (
        <Button
          auto
          title={"Add child"}
          onClick={() => onAddChild(node.path)}
          icon={<FilePlus />}
        />
      )}
      <Button auto title={"Remove"} onClick={() => onRemove(node)} icon={<Trash />} />
    </ButtonGroup>
  );
};

export default VFileSystemNodeActions;
