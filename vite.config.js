import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslint()],
  server: {
    open: "/index.html",
  },
  build: {
    rollupOptions: {
      input: "src/index.js",
    },
  },
});
