import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    sourcemap: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
  build: {
    sourcemap: true, // Disable source maps
  },
});
