import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslint()],
  server: {
    open: "/index.html",
  },
  base: "/",
  build: {
    rollupOptions: {
      input: "src/index.js",
    },
    outDir: "dist",
  },
});
