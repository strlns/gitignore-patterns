import { FilePlus, Trash } from "@geist-ui/icons";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import Box from "./Atoms/Box";
import SquareButton from "./Atoms/SquareButton";

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
    <Box horizontal>
      {node.isDir && (
        <SquareButton
          title={"Add child"}
          onClick={() => onAddChild(node.path)}
          icon={<FilePlus />}
        />
      )}
      {node.readOnly || (
        <SquareButton title={"Remove"} onClick={() => onRemove(node)} icon={<Trash />} />
      )}
    </Box>
  );
};

VFileSystemNodeActions.displayName = "VFileSystemNodeActions";

export default VFileSystemNodeActions;
