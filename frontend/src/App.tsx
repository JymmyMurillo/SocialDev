// =====================================================
// App.tsx - Componente Raíz de la Aplicación
// =====================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

/**
 * Componente de ruta protegida
 * Solo permite acceso si el usuario está autenticado
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

/**
 * Componente raíz de la aplicación
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de login (pública) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta principal (protegida) */}

        <Route
          path="/"
          element={<ProtectedRoute> <HomePage /> </ProtectedRoute>}
        />

        {/* Ruta por defecto: redirigir a / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;