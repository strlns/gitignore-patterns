import { IVirtualFileSystemNode } from "types/IVirtualFileSystemNode";
import { compile } from "@gerhobbelt/gitignore-parser/dist/gitignoreParser.mjs";

export const processGitignore = (
  nodes: IVirtualFileSystemNode[],
  patterns: string[]
): IVirtualFileSystemNode[] => {
  const gitignore = compile(patterns.join(`\n`));
  for (const node of nodes) {
    node.isIgnored = gitignore.denies(node.path);
  }
  return nodes;
};
