import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import postcssPresetEnvPlugin from "postcss-preset-env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   postcss: {
  //     plugins: [postcssPresetEnvPlugin()],
  //   },
  // },
});
