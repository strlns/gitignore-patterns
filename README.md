# gitignore-patterns

## What is this?

Create directory trees and file names in your browser and validate .gitignore
pattern syntax against the given tree.

## Deployment

This project is auto-deployed to GitHub pages using GitHub Actions.

[Try it in your browser](https://strlns.github.io/gitignore-patterns/)

## Motivation for this project

A misunderstanding I once had regarding parsing of ignore patterns, which
emerged while creating a `.prettierignore` file.

See
[this repository](https://github.com/strlns/prettierignore-patterns-reproduction)
(first commit vs 2nd commit).

From
[git-scm documentation](https://git-scm.com/docs/gitignore#_pattern_format):

> An optional prefix "!" which negates the pattern; any matching file excluded
> by a previous pattern will become included again. **It is not possible to
> re-include a file if a parent directory of that file is excluded.** Git
> doesn’t list excluded directories for performance reasons, so any patterns on
> contained files have no effect, no matter where they are defined.

(emphasis mine)

---

### Other info

This seems to be a common misunderstanding, as for example
[this parser](https://github.com/GerHobbelt/gitignore-parser), which I
previously used in this project, does not handle that case correctly.

Now this project uses the same parser that [prettier](https://prettier.io/) and
a lot of other projects use:

[ignore](https://www.npmjs.com/package/ignore)

---

This project uses [Vite](https://vitejs.dev) and was scaffolded using
`create-vite-app`.

Also uses [geist-ui](https://geist-ui.dev).
