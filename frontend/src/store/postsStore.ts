// =====================================================
// Posts Store - Gestión de estado de publicaciones
// =====================================================

import { create } from "zustand";
import type { PostsState, CreatePostData, ApiError } from "../types";
import * as api from "../services/api";

/**
 * Store de publicaciones
 * Maneja la lista de posts, crear y eliminar
 */
export const usePostsStore = create<PostsState>((set) => ({
  // Estado inicial
  posts: [],
  loading: false,
  error: null,

  /**
   * Obtener todas las publicaciones
   */
  fetchPosts: async () => {
    set({ loading: true, error: null });

    try {
      const posts = await api.getPosts();

      set({
        posts,
        loading: false,
      });
    } catch (error) {
      const apiError = error as ApiError;
      const message = error instanceof Error 
        ? error.message 
        : apiError.response?.data?.message || "Error al cargar publicaciones";
      set({
        error: message,
        loading: false,
      });
    }
  },

  /**
   * Crear una nueva publicación
   */
  createPost: async (data: CreatePostData) => {
    try {
      const newPost = await api.createPost(data);

      // Agregar el nuevo post al inicio de la lista
      set((state) => ({
        posts: [newPost, ...state.posts],
      }));
    } catch (error) {
      const apiError = error as ApiError;
      const message = error instanceof Error 
        ? error.message 
        : apiError.response?.data?.message || "Error al crear publicación";
      throw new Error(message);
    }
  },

  /**
   * Eliminar una publicación
   */
  deletePost: async (id: string) => {
    try {
      await api.deletePost(id);

      // Remover el post de la lista
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      const message = error instanceof Error 
        ? error.message 
        : apiError.response?.data?.message || "Error al eliminar publicación";
      throw new Error(message);
    }
  },
}));