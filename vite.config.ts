import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssPresetEnvPlugin from "postcss-preset-env";
import tsconfigPaths from "vite-tsconfig-paths";
import eslintPlugin from "vite-plugin-eslint";
import postcssNestingPlugin from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/gitignore-patterns/",
  plugins: [react(), tsconfigPaths(), eslintPlugin()],
  css: {
    postcss: {
      plugins: [postcssPresetEnvPlugin(), postcssNestingPlugin],
    },
  },
});
