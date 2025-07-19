import React from "react";
import { Trash } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function BankAccountCard({ cuentaBancaria, onDelete }) {
  const location = useLocation();
  const isCheckoutRoute = location.pathname === "/checkout";

  function ocultarIban(iban) {
    if (!iban) return '';
    return iban.slice(0, 5) + "**** **** " + iban.slice(-9);
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white w-full justify-between">
      <span
        className="font-mono text-base md:text-lg tracking-wider text-gray-800 select-all break-all block"
        style={{ wordBreak: "break-all" }}
      >
        {ocultarIban(cuentaBancaria)}
      </span>

      {/* Solo mostrar botón eliminar si NO estamos en /checkout */}
      {!isCheckoutRoute && (
        <button
          className="p-1 ml-2 text-gray-400 hover:text-red-500 transition shrink-0"
          title="Eliminar cuenta bancaria"
          onClick={onDelete}
        >
          <Trash className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
