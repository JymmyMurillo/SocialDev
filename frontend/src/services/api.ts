// =====================================================
// API Service - Cliente HTTP
// =====================================================
// Configuración de Axios y funciones para comunicarse con el backend

import axios from "axios";
import type {
  AuthResponse,
  LoginCredentials,
  Post,
  CreatePostData,
  User,
} from "../types";

// =====================================================
// CONFIGURACIÓN DE AXIOS
// =====================================================

/**
 * URL base del backend
 * En desarrollo: http://localhost:3000
 * En producción: URL de tu servidor
 */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Instancia de Axios configurada
 */
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor para agregar el token JWT a cada petición
 */
api.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem("access_token");

    // Si existe token, agregarlo al header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Interceptor para manejar errores de respuesta
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (Unauthorized), el token es inválido
    if (error.response?.status === 401) {
      // Limpiar token y redirigir a login
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

// =====================================================
// FUNCIONES DE AUTENTICACIÓN
// =====================================================

/**
 * Login - Iniciar sesión
 */
export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

// =====================================================
// FUNCIONES DE PUBLICACIONES
// =====================================================

/**
 * Obtener todas las publicaciones
 */
export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts");
  return response.data;
};

/**
 * Crear una nueva publicación
 */
export const createPost = async (data: CreatePostData): Promise<Post> => {
  const response = await api.post<Post>("/posts", data);
  return response.data;
};

/**
 * Eliminar una publicación
 */
export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

/**
 * Obtener publicaciones de un usuario específico
 */
export const getUserPosts = async (userId: string): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/posts/user/${userId}`);
  return response.data;
};

// =====================================================
// FUNCIONES DE USUARIOS
// =====================================================

/**
 * Obtener perfil del usuario autenticado
 */
export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>("/users/profile");
  return response.data;
};

/**
 * Obtener todos los usuarios
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

/**
 * Obtener un usuario por ID
 */
export const getUser = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

// Exportar la instancia de axios por si se necesita para otros usos
export default api;