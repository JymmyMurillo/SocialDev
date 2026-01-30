// =====================================================
// Navbar - Barra de navegación
// =====================================================

import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div
          className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-primary">SocialDev</div>
          </div>

          {/* Usuario y botón de logout */}
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <p className="font-medium text-dark">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            <button onClick={handleLogout} className="btn btn-outline text-sm">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;