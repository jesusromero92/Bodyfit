import React, { useState } from "react";
import { CreditCard, Star, Trash } from "lucide-react"; // Importamos los íconos disponibles
import { useLocation } from "react-router-dom"; // Necesitamos usar el hook useLocation para comprobar la ruta

export default function PaymentMethod({ tarjetas, cuentaBancaria, onSelectMethod, onDeleteBank }) {
  const [selectedCard, setSelectedCard] = useState(null); // Solo una tarjeta seleccionable
  const location = useLocation();
  const isCheckoutRoute = location.pathname === "/checkout"; // Verificamos si estamos en la ruta de checkout

  const handleRadioChange = (e, cardId) => {
    const newSelectedCard = e.target.checked ? cardId : null;
    setSelectedCard(newSelectedCard);
    onSelectMethod(newSelectedCard); // Enviar la tarjeta seleccionada al componente padre
  };

  const brandIcons = {
    visa: <span className="font-bold text-blue-900 text-xs">VISA</span>,
    mastercard: <span className="font-bold text-orange-700 text-xs">MC</span>,
    amex: <span className="font-bold text-cyan-700 text-xs">AMEX</span>,
    default: <CreditCard className="w-5 h-5 text-gray-400" />,
  };

  // Función para ocultar parte del IBAN
  function ocultarIban(iban) {
    if (!iban) return '';
    return iban.slice(0, 5) + "**** **** " + iban.slice(-9);
  }

  return (
    <div className="w-full space-y-4">
      {/* Título con el divisor y sin negrita */}
      <h2 className="text-xl mb-4">Elige un método de pago</h2>
      <hr className="border-gray-300" /> {/* Divider debajo del título */}

      {/* Mostrar cuenta bancaria si existe */}
      {cuentaBancaria && (
        <label
          className={`flex items-center gap-4 rounded-xl p-6 w-full justify-between cursor-pointer
            ${selectedCard === "bank" ? "bg-blue-100 border-2 border-blue-500" : "bg-white border-2 border-gray-200"}
          `}
          onClick={() => handleRadioChange({ target: { checked: !selectedCard === "bank" } }, "bank")}
        >
          <input
            type="radio"
            name="payment-method"
            className="w-6 h-6 rounded-full border-gray-300 checked:bg-blue-500 focus:ring-blue-500"
            checked={selectedCard === "bank"}
            onChange={(e) => handleRadioChange(e, "bank")}
            title="Seleccionar cuenta bancaria"
          />

          <div className="flex items-center justify-center w-12 h-9 rounded bg-gray-100 shrink-0">
            <CreditCard className="w-6 h-6 text-gray-600" /> {/* Reemplazamos el Bank con CreditCard */}
          </div>

          <div className="flex-1 flex flex-col justify-center min-w-0">
            <span className="font-mono text-lg text-gray-800 truncate">{ocultarIban(cuentaBancaria)}</span>
          </div>

          {/* Mostrar el botón de eliminar solo si no estamos en la ruta de checkout */}
          {!isCheckoutRoute && (
            <button
              className="p-1 ml-2 text-gray-400 hover:text-red-500 transition shrink-0"
              title="Eliminar cuenta bancaria"
              onClick={onDeleteBank} // Llamar a la función onDeleteBank
            >
              <Trash className="w-5 h-5" />
            </button>
          )}
        </label>
      )}

      {/* Mostrar las tarjetas de crédito */}
      {tarjetas.map((card) => {
        const icon = brandIcons[card.card.brand?.toLowerCase()] || brandIcons.default;
        return (
          <label
            key={card.id}
            className={`flex items-center gap-4 rounded-xl p-6 w-full justify-between cursor-pointer
              ${selectedCard === card.id ? "bg-blue-100 border-2 border-blue-500" : "bg-white border-2 border-gray-200"}
            `}
            onClick={() => handleRadioChange({ target: { checked: !selectedCard === card.id } }, card.id)}
          >
            <input
              type="radio"
              name="payment-method"
              className="w-6 h-6 rounded-full border-gray-300 checked:bg-blue-500 focus:ring-blue-500"
              checked={selectedCard === card.id}
              onChange={(e) => handleRadioChange(e, card.id)}
              title="Seleccionar tarjeta"
            />

            <div className="flex items-center justify-center w-12 h-9 rounded bg-gray-100 shrink-0">
              {icon}
            </div>

            <div className="flex-1 flex flex-col justify-center min-w-0">
              <span className="font-mono text-lg text-gray-800 truncate">
                **** {card.card.last4}
              </span>
              <span className="text-xs text-gray-400">
                Expira {card.card.exp_month}/{card.card.exp_year}
              </span>
            </div>
            
            {card.principal && (
              <Star
                className="w-5 h-5 text-yellow-400 ml-2 shrink-0"
                title="Principal"
              />
            )}
          </label>
        );
      })}
    </div>
  );
}
