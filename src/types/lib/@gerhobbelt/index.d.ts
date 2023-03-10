declare module "@gerhobbelt/gitignore-parser/dist/gitignoreParser.mjs" {
  /**
   * Compile the given `.gitignore` content (not filename!)
   * and return an object with `accepts`, `denies` and `inspects` methods.
   * These methods each accepts a single filename or path and determines whether
   * they are acceptable or unacceptable according to the `.gitignore` definition.
   *
   * @param  {string} content The `.gitignore` content to compile.
   * @return {accepts: (string) => boolean, denies: (string) => boolean} The helper object with methods that operate on the compiled content.
   */
  declare function compile(content: string): {
    accepts: (string) => boolean;
    denies: (string) => boolean;
  };
}
