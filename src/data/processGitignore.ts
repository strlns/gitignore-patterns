import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import ignore from "ignore";
import { removeLeadingSlash } from "data/PathUtilities";

export const processGitignore = (
  nodes: IVirtualFileSystemNode[],
  patterns: string[]
): IVirtualFileSystemNode[] => {
  const parser = ignore();
  parser.add(patterns);
  for (const node of nodes) {
    /*
    In this app, I chose to start all paths inside the repository
    with a leading slash, as if the git repository would live in the
    root directory of a virtual file system.

    This is not technically correct, just convenient.
    See https://www.npmjs.com/package/ignore#pathname-conventions

    We are not dealing with actual relative path traversal here,
    and it is ensured that all paths start with a leading slash.
    So we can safely remove that leading slash and treat the paths
    as relative to the virtual git repository then.
    */
    const relativePath = removeLeadingSlash(node.path);
    if (relativePath.length === 0) continue;
    node.isIgnored = parser.ignores(relativePath);
  }
  return nodes;
};
