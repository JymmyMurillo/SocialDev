// =====================================================
// HomePage - Página principal con feed de publicaciones
// =====================================================

import { useEffect } from "react";
import { usePostsStore } from "../store/postsStore";
import Navbar from "../components/Navbar";
import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

function HomePage() {
  const { posts, loading, error, fetchPosts } = usePostsStore();

  // Cargar posts al montar el componente
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main className="container mx-auto max-w-2xl px-4 py-8">
        {/* Formulario para crear publicación */}
        <CreatePostForm />

        {/* Lista de publicaciones */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-dark">
            Publicaciones Recientes
          </h2>

          {/* Estado de carga */}
          {!loading && <Loading message="Cargando publicaciones..." />}

          {/* Estado de error */}
          {error && (
            <div className="card border border-danger bg-danger/10 text-danger">
              <p className="font-medium">Error al cargar publicaciones</p>
              <p className="mt-1 text-sm">{error}</p>
              <button
                onClick={fetchPosts}
                className="btn btn-danger mt-3 text-sm"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Lista de posts */}
          {!loading && !error && posts.length === 0 && (
            <div className="card text-center text-gray-500">
              <p>No hay publicaciones aún.</p>
              <p className="mt-1 text-sm">¡Sé el primero en publicar algo!</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
