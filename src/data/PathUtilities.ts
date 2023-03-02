import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";

/*
This is explicitly NOT configurable.
git does not deal with other path separators by design,
neither will I. PATH_SEPARATOR is a forward slash,
always.
*/
export const PATH_SEPARATOR = "/" as const;

export const ROOT_VFS_NODE: IVirtualFileSystemNode = {
  path: PATH_SEPARATOR,
  isDir: true,
  readOnly: true,
  id: 0,
};

export const isRootPath = (path: string) => path === ROOT_VFS_NODE.path;

export const isPathDirectChildOfDirectory = (
  path: string,
  potentialParentPath: string
) => {
  const isDirectory = path.endsWith(PATH_SEPARATOR);
  const pathToCheckForEquality = isDirectory
    ? getPathName(removeTrailingSlash(path))
    : getPathName(path);
  if (pathToCheckForEquality === potentialParentPath) {
    return true;
  }
  return false;
};

export const isPathDescendantOfOtherPath = (path: string, otherPath: string) => {
  if (path.startsWith(otherPath)) {
    return true;
  }
  return false;
};

export const filename = (path: string): string => {
  return normalizePathSeparators(path).split(PATH_SEPARATOR).pop() ?? path;
};

/**
 * To do: replace with suitable library or use TypeScript
 * template string features.
 */
export const numberOfSlashes = (string: string): number => {
  return string.match(/\//g)?.length ?? 0;
};

export const normalizePathSeparators = (path: string): string => {
  return path.replaceAll(/\/+/g, PATH_SEPARATOR);
};

export const ensureTrailingSlash = (path: string) => {
  return path.endsWith(PATH_SEPARATOR) ? path : `${path}${PATH_SEPARATOR}`;
};

export const ensureLeadingSlash = (path: string) => {
  return path.startsWith(PATH_SEPARATOR) ? path : `${PATH_SEPARATOR}${path}`;
};

export const removeTrailingSlash = (path: string) => {
  return path.replace(/\/?$/, "");
};

export const removeLeadingSlash = (path: string) => {
  return path.replace(/^\/?/, "");
};

export const getChildPath = (childBasename: string, parentPath: string) => {
  return `${ensureTrailingSlash(normalizePathSeparators(parentPath))}${removeLeadingSlash(
    normalizePathSeparators(childBasename)
  )}`;
};

export const getPathName = (path: string): string => {
  // !!! Files without a leading slash in their path are implicitly direct children the root directory in this app.
  return normalizePath(ensureLeadingSlash(path.replace(/\/[^/]*$/, PATH_SEPARATOR)));
};

export const normalizePath = (path: string): string =>
  ensureLeadingSlash(normalizePathSeparators(path.trim()));

export const getUniquePath = (
  name = "file",
  directory: IVirtualFileSystemNode[],
  maxIterations = 100
): string | undefined => {
  let foundPath = false;
  let i = 0;
  let uniqueName = name;
  while (i < maxIterations) {
    ++i;
    foundPath = !directory.some((file) => filename(file.path) === uniqueName);
    if (foundPath) {
      return uniqueName;
    }
    const bracesRegexp = / \((\d+)\)$/;
    const bracesMatch = uniqueName.match(bracesRegexp);
    if (bracesMatch?.length == 2) {
      uniqueName = uniqueName.replace(bracesRegexp, ` (${i})`);
    } else if (i <= 1) {
      uniqueName += " (1)";
    }
  }
  return;
};

export const sortFnByNumberOfSlashes = (pathA: string, pathB: string) => {
  const [a, b] = [numberOfSlashes(pathA), numberOfSlashes(pathB)];
  return a - b;
};

type vfsNodeSortFn = (
  nodeA: IVirtualFileSystemNode,
  nodeB: IVirtualFileSystemNode
) => number;

export const sortByPathDepth = (nodes: IVirtualFileSystemNode[], reverse = false) => {
  const sortFunction: vfsNodeSortFn = reverse
    ? (nodeA, nodeB) => sortFnByNumberOfSlashes(nodeA.path, nodeB.path)
    : (nodeA, nodeB) => sortFnByNumberOfSlashes(nodeB.path, nodeA.path);

  return nodes.slice().sort(sortFunction);
};
