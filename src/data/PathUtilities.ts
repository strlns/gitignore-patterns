import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { ROOT_PATH } from "./ROOT_VFS_NODE";
import { PATH_SEPARATOR } from "./PATH_SEPARATOR";

export const isRootPath = (path: string) => path === ROOT_PATH;

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
  ensureLeadingSlash(normalizePathSeparators(path.replace(/^\w+/, "")));

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
    foundPath = !directory.some((file) => filename(file.path) === filename(uniqueName));
    if (foundPath) {
      return uniqueName;
    }
    const bracesRegexp = / \((\d+)\)$/;
    const bracesMatch = uniqueName.match(bracesRegexp);
    if (i <= 1) {
      uniqueName += " (1)";
    } else if (bracesMatch?.length == 2) {
      uniqueName = uniqueName.replace(bracesRegexp, ` (${i})`);
    }
  }
  return;
};

export const sortFnByNumberOfSlashes = (pathA: string, pathB: string) => {
  const [a, b] = [
    numberOfSlashes(removeTrailingSlash(pathA)),
    numberOfSlashes(removeTrailingSlash(pathB)),
  ];
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

type Replacement = Parameters<typeof String.prototype.replace>[1];

/**
 * Reuses parts from https://github.com/parshap/node-sanitize-filename
 *
 * Removed 255 character length restriction, this is irrelevant here.
 *
 * Note that technically, only / is forbidden in linux file names.
 * Asteriks, question marks and the like cause trouble in shells,
 * but can be part of a filename.
 * Anyway, they are escaped with a backslash here just for funsies.
 *
 * Spaces cause trouble in shells too, but are NOT escaped here,
 * for better readibility.
 *
 * Illegal Characters on Various Operating Systems
 * / ? < > \ : * | "
 * https://kb.acronis.com/content/39790
 *
 * Unicode Control codes
 * C0 0x00-0x1f & C1 (0x80-0x9f)
 * http://en.wikipedia.org/wiki/C0_and_C1_control_codes
 *
 */
export function sanitizeFileName(path: string, replacement: Replacement): string {
  let name = filename(path);
  //remove double backslashes at the begining to avoid issues with repeated application (is this idempotent? i guess not.)
  name = name.replaceAll("\\\\", "");
  const illegalRe = /[/?<>:*|"]/g;
  // eslint-disable-next-line no-control-regex
  const controlRe = /[\x00-\x1f\x80-\x9f]/g;
  const reservedRe = /^\.+$/;

  name = name
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement);

  return path.replace(/(?:\/)[^/]*$/, `/${name}`);
}
