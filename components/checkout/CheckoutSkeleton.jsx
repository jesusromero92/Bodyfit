export default function CheckoutSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-8 mt-24 bg-white rounded-2xl border border-gray-300 shadow-lg">
      {/* Título */}
      <div className="flex justify-center mb-8">
        <div className="h-8 w-60 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Resumen de alta */}
      <div>
        <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" />

        {/* Box resumen */}
        <div className="bg-gray-100 rounded-xl p-4 mb-4 border border-gray-200">
          <div className="h-5 w-44 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-52 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
        </div>

        {/* Box usuario */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6 border border-gray-200">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-1 animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-1 animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-1 animate-pulse" />
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="mb-4">
        <div className="h-5 w-52 bg-gray-200 rounded mb-3 animate-pulse" />
        {/* Métodos Skeleton */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Enlaces y botón */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
    </div>
  );
}
