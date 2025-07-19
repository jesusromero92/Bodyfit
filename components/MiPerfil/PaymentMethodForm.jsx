import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import config from "../../config";
import PaymentCard from "./PaymentCard";
import BankAccountCard from "./BankAccountCard";

export default function PaymentMethodForm({ tarjetas, cuentaBancaria, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe no está listo");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (createError) {
      setError(createError.message);
      setLoading(false);
      return;
    }

    const res = await fetch(`${config.API_BASE_URL}/stripe/add-payment-method`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ payment_method_id: paymentMethod.id }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Error agregando método de pago");
      setLoading(false);
      return;
    }

    onSuccess();
    setLoading(false);
  };

  const handleDeleteCard = (cardId) => {
    // Lógica para eliminar la tarjeta
    console.log(`Eliminando tarjeta con ID: ${cardId}`);
  };

  const handleDeleteBankAccount = () => {
    // Lógica para eliminar la cuenta bancaria
    console.log("Eliminando cuenta bancaria");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3 border p-4 rounded bg-white shadow">
        <label className="block text-gray-700 font-semibold mb-2">Añadir método de pago</label>
        <div className="p-3 border rounded">
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!stripe || loading}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded flex-1"
          >
            {loading ? "Guardando..." : "Agregar tarjeta"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="mt-2 bg-gray-300 text-gray-800 py-2 px-4 rounded flex-1"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Mostrar las tarjetas de pago registradas */}
      {tarjetas && tarjetas.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Métodos de pago registrados</h3>
          {tarjetas.map((card) => (
            <PaymentCard
              key={card.id}
              card={card}
              principal={false} // Puedes añadir lógica para seleccionar la tarjeta principal
              onDelete={() => handleDeleteCard(card.id)}
            />
          ))}
        </div>
      )}

      {/* Mostrar la cuenta bancaria registrada */}
      {cuentaBancaria && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Cuenta Bancaria Registrada</h3>
          <BankAccountCard
            cuentaBancaria={cuentaBancaria}
            onDelete={handleDeleteBankAccount}
          />
        </div>
      )}
    </div>
  );
}
