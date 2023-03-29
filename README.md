Create directory trees and file names in your browser and validate .gitignore pattern
syntax against the given tree.

Relies on
[@gerhobbelt/gitignore-parser](https://www.npmjs.com/package/@gerhobbelt/gitignore-parser)
as its backend and as such uses the same license.

---

This project uses [Vite](https://vitejs.dev) and was scaffolded using `create-vite-app`.

Also uses [geist-ui](https://geist-ui.dev), which I really came to like, even after
finding out the hard way that their file tree component is not suitable for my editable
tree.

Vite means Rollup and swc under the hood, and Vite provides a very smooth development
process. Recommend!

Also used: one tiny [CSS module](https://github.com/css-modules) and PostCSS for
transpilation.

Main purpose of this project: learning and improving my React skills, especially with
component libraries.
