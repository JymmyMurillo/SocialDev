// =====================================================
// Main.tsx - Punto de Entrada de React
// =====================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// =====================================================
// RENDERIZAR LA APLICACIÓN
// =====================================================

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
