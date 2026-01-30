// =====================================================
// Loading - Componente de carga
// =====================================================

interface LoadingProps {
  message?: string;
}

function Loading({ message = "Cargando..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div className="spinner mb-4 h-12 w-12"></div>

      {/* Mensaje */}
      <p className="text-gray-500">{message}</p>
    </div>
  );
}

export default Loading;