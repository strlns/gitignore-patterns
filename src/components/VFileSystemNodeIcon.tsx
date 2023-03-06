import { AlertTriangle, File, Folder } from "@geist-ui/icons";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";

type VFileSystemNodeIconProps = {
  node: IVirtualFileSystemNode;
};

const VFileSystemNodeIcon = ({ node }: VFileSystemNodeIconProps) => {
  if (node.duplicate) {
    return <AlertTriangle />;
  } else if (node.isDir) {
    return <Folder />;
  } else {
    return <File />;
  }
};

export default VFileSystemNodeIcon;
