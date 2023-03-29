import { AlertTriangle, File, Folder, XSquare } from "@geist-ui/icons";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import iconStyles from "styles/Icon.module.css";
import clsx from "clsx";

type VFileSystemNodeIconProps = {
  node: IVirtualFileSystemNode;
} & React.HTMLAttributes<SVGElement>;

const VFileSystemNodeIcon = ({
  node,
  className: classNameOuter,
  ...props
}: VFileSystemNodeIconProps) => {
  const className = clsx(classNameOuter, iconStyles.icon, iconStyles.small);
  if (node.duplicate || node.isInvalid) {
    return <AlertTriangle className={className} {...props} />;
  } else if (node.isIgnored) {
    return <XSquare className={className} {...props} />;
  } else if (node.isDir) {
    return <Folder className={className} {...props} />;
  } else {
    return <File className={className} {...props} />;
  }
};

export default VFileSystemNodeIcon;
