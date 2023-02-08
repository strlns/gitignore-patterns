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

export const numberOfSlashes = (string: string): number => {
  return string.match(/\//g)?.length ?? 0;
};

export const normalizeSlashesInPathNames = (path: string): string => {
  return path.replaceAll(/\/+/g, "/");
};
