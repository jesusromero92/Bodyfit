import React, { useState } from "react";
import config from "../../config";

export default function BankAccountForm({ currentAccount, onSuccess, onCancel }) {
  const [account, setAccount] = useState(currentAccount || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!account.trim()) {
      setError("La cuenta bancaria no puede estar vacía.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${config.API_BASE_URL}/usuario/cuenta-bancaria`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ cuenta_bancaria: account.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al guardar la cuenta bancaria.");
        setLoading(false);
        return;
      }

      onSuccess(account.trim());
    } catch (err) {
      setError("Error de conexión.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 border p-4 rounded bg-white shadow">
      <label className="block text-gray-700 font-semibold mb-2">Añadir / Editar cuenta bancaria</label>
      <input
        type="text"
        className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        placeholder="Número de cuenta bancaria"
        disabled={loading}
      />
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-green-600 text-white py-2 px-4 rounded flex-1"
        >
          {loading ? "Guardando..." : "Guardar"}
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
  );
}
