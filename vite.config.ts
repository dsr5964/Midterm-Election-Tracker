import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  // assetsInclude: ["**/*.json"],
  optimizeDeps: {
    include: ["react-simple-maps", "topojson-client"],
  },
  base: "/Midterm-Election-Tracker",
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/react-simple-maps/, /topojson-client/, /node_modules/],
    },
  },
});
