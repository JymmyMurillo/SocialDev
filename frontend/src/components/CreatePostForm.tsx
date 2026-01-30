// =====================================================
// CreatePostForm - Formulario para crear publicaciones
// =====================================================

import { useState } from "react";
import { usePostsStore } from "../store/postsStore";

function CreatePostForm() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const createPost = usePostsStore((state) => state.createPost);

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

    setIsSubmitting(true);
    setError("");

    try {
      await createPost({ content: content.trim() });
      setContent(""); // Limpiar formulario
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al crear publicación";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="mb-4 text-xl font-semibold text-dark">
        ¿Qué estás pensando?
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Textarea para el contenido */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe algo..."
          className={`input min-h-[120px] resize-none ${error ? "input-error" : ""}`}
          maxLength={500}
          disabled={isSubmitting}
        />

        {/* Contador de caracteres */}
        <div className="mt-2 flex items-center justify-between">
          <span
            className={`text-sm ${content.length > 450 ? "text-danger" : "text-gray-500"}`}
          >
            {content.length} / 500 caracteres
          </span>

          {/* Botón publicar */}
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="btn btn-primary"
          >
            {isSubmitting ? "Publicando..." : "Publicar"}
          </button>
        </div>

        {/* Mensaje de error */}
        {error && <div className="mt-2 text-sm text-danger">{error}</div>}
      </form>
    </div>
  );
}

export default CreatePostForm;