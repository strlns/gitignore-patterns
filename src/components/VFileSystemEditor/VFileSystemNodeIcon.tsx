import { AlertTriangle, File, Folder, XSquare } from "@geist-ui/icons";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";

type VFileSystemNodeIconProps = {
  node: IVirtualFileSystemNode;
};

const VFileSystemNodeIcon = ({ node }: VFileSystemNodeIconProps) => {
  if (node.duplicate || node.isInvalid) {
    return <AlertTriangle />;
  } else if (node.isIgnored) {
    return <XSquare />;
  } else if (node.isDir) {
    return <Folder />;
  } else {
    return <File />;
  }
};

export default VFileSystemNodeIcon;
