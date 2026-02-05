// =====================================================
// EditPostModal - Modal para editar publicaciones
// =====================================================

import { useState, useEffect } from "react";
import { usePostsStore } from "../store/postsStore";
import type { Post } from "../types";

interface EditPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

function EditPostModal({ post, isOpen, onClose }: EditPostModalProps) {
  const [content, setContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const updatePost = usePostsStore((state) => state.updatePost);

  // Actualizar contenido cuando cambia el post
  useEffect(() => {
    setContent(post.content);
    setError("");
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (!content.trim()) {
      setError("El contenido no puede estar vacío");
      return;
    }

    if (content.length > 500) {
      setError("El contenido no puede exceder 500 caracteres");
      return;
    }

    // Si no cambió nada, simplemente cerrar
    if (content.trim() === post.content.trim()) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await updatePost(post.id, { content: content.trim() });
      onClose(); // Cerrar modal al éxito
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al actualizar publicación";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent(post.content); // Resetear cambios
    setError("");
    onClose();
  };

  // No mostrar si no está abierto
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay oscuro */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="card fade-in w-full max-w-lg">
          <h2 className="mb-4 text-xl font-semibold text-dark">
            Editar Publicación
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`input min-h-[150px] resize-none ${
                error ? "input-error" : ""
              }`}
              maxLength={500}
              disabled={isSubmitting}
              autoFocus
            />

            {/* Contador de caracteres */}
            <div className="mb-4 mt-2 flex items-center justify-between">
              <span
                className={`text-sm ${
                  content.length > 450 ? "text-danger" : "text-gray-500"
                }`}
              >
                {content.length} / 500 caracteres
              </span>
            </div>

            {/* Mensaje de error */}
            {error && <div className="mb-4 text-sm text-danger">{error}</div>}

            {/* Botones */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="btn btn-outline"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="btn btn-primary"
              >
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPostModal;