import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { VFSTreeNode } from "./VFSTreeNode";

/*
This is explicitly NOT configurable.
git does not deal with other path separators by design,
neither will I. PATH_SEPARATOR is a forward slash,
always.
*/
export const PATH_SEPARATOR = "/" as const;

export const isPathDirectChildOfDirectory = (
  path: string,
  potentialParentPath: string
) => {
  if (
    potentialParentPath.endsWith(PATH_SEPARATOR) &&
    path.replace(ensureTrailingSlash(filename(path)), "") === potentialParentPath
  ) {
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
  const matchEndOfPath = path.match(/\/[^/]+(?:\/?)$/);
  if (matchEndOfPath?.length === 1) {
    return matchEndOfPath[0];
  }
  return path;
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
  return path.replace(/\/?$/, PATH_SEPARATOR);
};

export const ensureLeadingSlash = (path: string) => {
  return path.replace(/^\/?$/, PATH_SEPARATOR);
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
