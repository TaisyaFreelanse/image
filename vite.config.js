import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Это откроет сервер для всех устройств в сети
    port: 5173,        // Убедись, что порт совпадает с твоим
  },
});
