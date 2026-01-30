// =====================================================
// Auth Store - Gestión de estado de autenticación
// =====================================================
// Usa Zustand para manejar el estado del usuario y token

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, LoginCredentials, ApiError } from "../types";
import * as api from "../services/api";

/**
 * Store de autenticación
 * Maneja el login, logout y estado del usuario
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,

      /**
       * Hacer login
       */
      login: async (credentials: LoginCredentials) => {
        try {
          // Llamar al backend
          const response = await api.login(credentials);

          // Guardar token en localStorage
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("user", JSON.stringify(response.user));

          // Actualizar estado
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
          });
        } catch (error) {
          // Lanzar error para que el componente lo maneje
          const apiError = error as ApiError;
          const message =
            error instanceof Error
              ? error.message
              : apiError.response?.data?.message || "Error al iniciar sesión";
          throw new Error(message);
        }
      },

      /**
       * Hacer logout
       */
      logout: () => {
        // Limpiar localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        // Resetear estado
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      /**
       * Establecer usuario y token (útil para persistencia)
       */
      setUser: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: "auth-storage", // nombre del item en localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);