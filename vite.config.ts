import { ConfigEnv, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import postcssPresetEnvPlugin from "postcss-preset-env";
import tsconfigPaths from "vite-tsconfig-paths";
import eslintPlugin from "vite-plugin-eslint";
import postcssNestingPlugin from "postcss-nesting";
import postcssHasPseudoPolyfill from "css-has-pseudo";

const config = ({ mode }: ConfigEnv): UserConfigExport => ({
  base: "/gitignore-patterns/",
  define: {
    __IS_DEV__: mode === "development",
  },
  plugins: [react(), tsconfigPaths(), eslintPlugin()],
  css: {
    postcss: {
      plugins: [
        postcssPresetEnvPlugin(),
        postcssNestingPlugin,
        postcssHasPseudoPolyfill(),
      ],
    },
  },
});

export default config;
