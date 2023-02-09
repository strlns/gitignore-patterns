export const isPathDirectChildOfDirectory = (
  path: string,
  potentialParentPath: string
) => {
  const matchEndOfPath = path.match(/\/[^/]+(?:\/?)$/);
  if (matchEndOfPath?.length === 1) {
    const lastPathSegment = matchEndOfPath[0];
    if (path.replace(lastPathSegment, "") === potentialParentPath) {
      return true;
    }
  }
  return false;
};

/**
 * To do: replace with suitable library or use TypeScript
 * template string features.
 */
export const numberOfSlashes = (string: string): number => {
  return string.match(/\//g)?.length ?? 0;
};

export const normalizePathSeparators = (path: string): string => {
  return path.replaceAll(/\/+/g, "/");
};

export const ensureTrailingSlash = (path: string) => {
  return path.replace(/\/?$/, "/");
};

export const ensureLeadingSlash = (path: string) => {
  return path.replace(/^\/?$/, "/");
};

export const removeTrailingSlash = (path: string) => {
  return path.replace(/\/?$/, "");
};

export const removeLeadingSlash = (path: string) => {
  return path.replace(/^\/?/, "");
};

export const getChildPath = (childBasename: string, parentPath: string) => {
  return `${ensureTrailingSlash(
    normalizePathSeparators(parentPath)
  )}${removeLeadingSlash(normalizePathSeparators(childBasename))}`;
};

export const getPathName = (path: string): string => {
  // !!! Files without a leading slash in their path are implicitly direct children the root directory in this app.
  return ensureLeadingSlash(path.replace(/\/[^\/]*$/, "/"));
};

export const normalizePath = (path: string): string =>
  normalizePathSeparators(path.trim());
