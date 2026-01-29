// =====================================================
// Types - Definiciones de TypeScript
// =====================================================
// Define las interfaces y tipos usados en toda la aplicación

/**
 * Usuario
 */
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Autor de una publicación (versión simplificada de User)
 */
export interface PostAuthor {
  id: string;
  name: string;
  email: string;
}

/**
 * Publicación
 */
export interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: PostAuthor;
}

/**
 * Respuesta del login
 */
export interface AuthResponse {
  access_token: string;
  user: User;
}

/**
 * Datos para login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Datos para crear una publicación
 */
export interface CreatePostData {
  content: string;
}

/**
 * Estado de autenticación en la app
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
}

/**
 * Estado de las publicaciones en la app
 */
export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (data: CreatePostData) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}