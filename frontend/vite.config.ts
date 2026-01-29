// =====================================================
// Vite Configuration
// =====================================================
// Configuración de Vite para el proyecto React

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Alias de rutas para imports más limpios
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    host: true, // Permite acceso desde fuera de localhost (necesario para Docker)
    strictPort: true,
    watch: {
      usePolling: true, // Necesario para hot-reload en Docker
    },
  },

  // Variables de entorno
  define: {
    "process.env": {},
  },
});

