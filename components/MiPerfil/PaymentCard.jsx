import React from "react";
import { CreditCard, Star, Trash } from "lucide-react";

export default function PaymentCard({ card, principal, onDelete }) {
  const brandIcons = {
    visa: <span className="font-bold text-blue-900 text-xs">VISA</span>,
    mastercard: <span className="font-bold text-orange-700 text-xs">MC</span>,
    amex: <span className="font-bold text-cyan-700 text-xs">AMEX</span>,
    default: <CreditCard className="w-5 h-5 text-gray-400" />,
  };
  const icon = brandIcons[card.card.brand?.toLowerCase()] || brandIcons.default;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 w-full justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center justify-center w-10 h-7 rounded bg-gray-100 shrink-0">
          {icon}
        </div>
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <span className="font-mono text-base text-gray-800 truncate">**** {card.card.last4}</span>
          <span className="text-xs text-gray-400">
            Expira {card.card.exp_month}/{card.card.exp_year}
          </span>
        </div>
        {principal && (
          <Star className="w-4 h-4 text-yellow-400 ml-2 shrink-0" title="Principal" />
        )}
      </div>
      <button
        className="p-1 ml-2 text-gray-400 hover:text-red-500 transition shrink-0"
        title="Eliminar tarjeta"
        onClick={onDelete} // <-- Esto abre el diálogo de confirmación
      >
        <Trash className="w-5 h-5" />
      </button>
    </div>
  );
}
