import cuid2 from "@paralleldrive/cuid2";
import { PATH_SEPARATOR } from "data/PATH_SEPARATOR";
import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";

export const ROOT_PATH = PATH_SEPARATOR;

export const ROOT_VFS_NODE: IVirtualFileSystemNode = {
  path: ROOT_PATH,
  isDir: true,
  readOnly: true,
  id: cuid2.createId(),
  createdAt: new Date(),
  isIgnored: false,
};
