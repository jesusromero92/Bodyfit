export default function PlanDetails({ plan, user }) {
  const isPermanencia =
    plan?.titulo?.toLowerCase().includes("anual") ||
    plan?.titulo?.toLowerCase().includes("semestral");

  // Fecha actual (DD/MM/YYYY)
  const altaDate = new Date();
  const fechaAlta = altaDate.toLocaleDateString("es-ES");

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">
        Resumen de alta
      </h2>

      {/* Tus datos */}
      <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
        <h3 className="font-semibold mb-2 text-blue-800">Tus datos</h3>
        <p className="mb-1">
          <span className="font-semibold">Nombre: </span>{user?.nombre} {user?.apellido}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Email: </span>{user?.email}
        </p>
        {user?.telefono && (
          <p className="mb-1">
            <span className="font-semibold">Teléfono: </span>{user.telefono}
          </p>
        )}
        {/* Otros campos del usuario si quieres */}
      </div>

      {/* Detalles del plan */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
        <p className="mb-1">
          <span className="font-semibold">Plan: </span>{plan.titulo}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Precio: </span>{plan.precio} / mes
        </p>
        <p className="mb-1">
          <span className="font-semibold">Fecha de alta: </span>{fechaAlta}
        </p>
        {isPermanencia && (
          <p className="mt-2 text-sm text-blue-700 bg-blue-50 rounded-xl px-3 py-2 border border-blue-100">
            Este plan tiene <b>1 año de permanencia</b>. La penalización por cancelación anticipada está detallada en el contrato.
          </p>
        )}
      </div>

    </section>
  );
}
