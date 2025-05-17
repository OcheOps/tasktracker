import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 4173,
    strictPort: true,
    host: "0.0.0.0", // <-- REQUIRED for Docker/Nginx access
  },
  server: {
    port: 4173,
    strictPort: true,
    host: "0.0.0.0", // good for dev inside container too
   // origin: "http://localhost:4173", // <-- REQUIRED for Docker/Nginx access
  },
});
