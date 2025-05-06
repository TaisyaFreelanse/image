import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(), 
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['dev.phototune.ai', 'www.dev.phototune.ai'],
    proxy: {
      '/remove-watermark': 'http://localhost:8000',
      '/remove-bg': 'http://localhost:8000',
    },
  },
});


