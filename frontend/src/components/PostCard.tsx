// =====================================================
// PostCard - Tarjeta de publicación
// =====================================================

import { Post } from "../types";
import { useAuthStore } from "../store/authStore";
import { usePostsStore } from "../store/postsStore";
import { useState } from "react";
import EditPostModal from "./EditPostModal";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const currentUser = useAuthStore((state) => state.user);
  const deletePost = usePostsStore((state) => state.deletePost);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Verificar si el post pertenece al usuario actual
  const isOwner = currentUser?.id === post.user.id;

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60),
      );
      return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? "s" : ""}`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours !== 1 ? "s" : ""}`;
    } else {
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  // Manejar eliminación
  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar esta publicación?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePost(post.id);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al eliminar publicación";

      alert(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="card card-hover fade-in">
        {/* Header del post */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-dark">{post.user.name}</h3>
            <p className="text-sm text-gray-500">{post.user.email}</p>
          </div>

          {/* Botones editar y eliminar (solo si es el dueño) */}
          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-sm font-medium text-danger hover:text-danger-hover disabled:opacity-50"
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          )}
        </div>

        {/* Contenido del post */}
        <p className="mb-3 whitespace-pre-wrap text-gray-800">{post.content}</p>

        {/* Footer del post */}
        <div className="text-xs text-gray-400">
          {formatDate(post.createdAt)}
        </div>
      </div>

      {/* Modal de edición */}
      <EditPostModal
        post={post}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );
}

export default PostCard;