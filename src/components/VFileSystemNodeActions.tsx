import { FilePlus, Trash, FolderPlus } from "@geist-ui/icons";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import Box from "./Atoms/Box";
import SquareButton from "./Atoms/SquareButton";

type VFileSystemNodeActionProps = {
  onAddChild: (parentPath: string) => void;
  onAddDirectory: (parentPath: string) => void;
  onRemove: (node: IVirtualFileSystemNode) => void;
  node: IVirtualFileSystemNode;
};

const VFileSystemNodeActions = ({
  node,
  onAddChild,
  onAddDirectory,
  onRemove,
}: VFileSystemNodeActionProps) => {
  return (
    <Box horizontal>
      {node.isDir && (
        <>
          <SquareButton
            title={"Add file"}
            onClick={() => onAddChild(node.path)}
            icon={<FilePlus />}
          />
          <SquareButton
            title={"Add subdirectory"}
            onClick={() => onAddDirectory(node.path)}
            icon={<FolderPlus />}
          />
        </>
      )}
      {node.readOnly || (
        <SquareButton title={"Remove"} onClick={() => onRemove(node)} icon={<Trash />} />
      )}
    </Box>
  );
};

VFileSystemNodeActions.displayName = "VFileSystemNodeActions";

export default VFileSystemNodeActions;
