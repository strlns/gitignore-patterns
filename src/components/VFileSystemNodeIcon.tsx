import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import DocumentIcon from "./Atoms/Icons/Document";
import ExlamationMarkIcon from "./Atoms/Icons/ExclamationMark";
import FolderIcon from "./Atoms/Icons/Folder";

type VFileSystemNodeIconProps = {
  node: IVirtualFileSystemNode;
};

const VFileSystemNodeIcon = ({ node }: VFileSystemNodeIconProps) => {
  if (node.duplicate) {
    return <ExlamationMarkIcon />;
  } else if (node.isDir) {
    return <FolderIcon />;
  } else {
    return <DocumentIcon />;
  }
};

export default VFileSystemNodeIcon;
