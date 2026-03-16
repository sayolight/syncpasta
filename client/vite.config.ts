import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@ui": path.resolve(__dirname, "src/shared/ui"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@styles": path.resolve(__dirname, "src/app/styles"),
    },
  },
});
