import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "../contexts/UserContext"; // Importamos el hook useUser
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentMethodForm from "../components/MiPerfil/PaymentMethodForm.jsx";
import BankAccountForm from "../components/MiPerfil/BankAccountForm.jsx";
import BankAccountCard from "../components/MiPerfil/BankAccountCard.jsx";
import PaymentCard from "../components/MiPerfil/PaymentCard.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import config from "../config";
import { PlusCircle, CreditCard, Banknote, ChevronLeft, ChevronRight } from "lucide-react"; // Flechas

// Inicializa Stripe con la clave pública
const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

export default function MiPerfil() {
  const { user, setUser, updateToken } = useUser(); // Accede también a la función updateToken
  const [fullUserData, setFullUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingBankAccount, setAddingBankAccount] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState({ type: null, id: null });
  const [showProfile, setShowProfile] = useState(true); // Estado para alternar entre "Mis Datos" y "Métodos de Pago"

  // Solo realiza la llamada a la API cuando el token esté presente y validado.
  const fetchUserData = useCallback(async () => {
    if (!user || !user.email) return;  // Asegúrate de que el email esté presente antes de hacer la llamada

    setLoading(true);

    try {
      const res = await fetch(
        `${config.API_BASE_URL}/usuario?email=${encodeURIComponent(user.email)}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (!res.ok) {
        console.error("Error: No se pudo obtener los datos de usuario", res.statusText);
        throw new Error("Error al obtener datos de usuario");
      }

      const data = await res.json();
      //console.log("Respuesta de la API:", data); // Verifica si la respuesta es la correcta

      // Solo actualizamos el token si la respuesta contiene uno nuevo
      if (data.token) {
        localStorage.setItem("token", data.token);
        updateToken(data.token);
      }

      setFullUserData(data); // Actualiza el estado con los datos del usuario
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
      setAddingBankAccount(false);
      setAddingCard(false);
    }
  }, [user, setUser, updateToken]);

  // Llamamos a fetchUserData cuando el usuario esté disponible y cuando su email esté presente.
  useEffect(() => {
    if (user && user.email) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  const handleAskDeleteCard = (cardId) => {
    setPendingDelete({ type: "card", id: cardId });
    setDeleteDialogOpen(true);
  };

  const handleAskDeleteBank = () => {
    setPendingDelete({ type: "bank" });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteDialogOpen(false);
    if (pendingDelete.type === "card" && pendingDelete.id) {
      try {
        const res = await fetch(
          `${config.API_BASE_URL}/usuario/tarjeta/${pendingDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!res.ok) throw new Error("Error al eliminar la tarjeta");
        await fetchUserData(); // Refrescar los datos después de eliminar la tarjeta
      } catch (error) {
        alert("No se pudo eliminar la tarjeta");
      }
    }
    if (pendingDelete.type === "bank") {
      try {
        const res = await fetch(
          `${config.API_BASE_URL}/usuario/cuenta-bancaria`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!res.ok) throw new Error("Error al eliminar la cuenta bancaria");
        setFullUserData((prev) => ({ ...prev, cuenta_bancaria: null }));
      } catch (error) {
        alert("No se pudo eliminar la cuenta bancaria");
      }
    }
    setPendingDelete({ type: null, id: null });
  };

  if (!user) return null; // Ahora, se maneja desde el UserContext

  return (
    <div className="bg-white min-h-[calc(100vh-6rem)] pt-24 px-4 pb-16 flex flex-col items-center">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center sm:text-left mb-8">
        <span className="text-gray-900">Mi&nbsp;</span>
        <span className="text-blue-600">perfil</span>
      </h1>

      <div className="w-full max-w-2xl border-2 border-gray-300 shadow-xl rounded-2xl bg-white flex flex-col overflow-hidden transition p-6 mx-4">
        {/* Panel datos usuario */}
        {showProfile && (
          <div className="w-full p-8 flex flex-col items-center bg-white rounded-t-2xl">
            <section className="flex flex-col items-center gap-1 w-full mb-6">
              {loading || !fullUserData ? (
                <div className="space-y-4 w-full max-w-xs">
                  <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse mx-auto"></div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
                    {fullUserData.nombre} {fullUserData.primer_apellido}
                  </h2>
                  <p className="text-blue-700 text-xs font-semibold text-center sm:text-left">
                    Mi perfil Bodyfit
                  </p>
                </>
              )}
            </section>

            <section className="flex flex-col gap-3 w-full items-center sm:items-start">
              {loading || !fullUserData ? (
                <>
                  <UserInfoSkeleton />
                  <UserInfoSkeleton />
                  <UserInfoSkeleton />
                </>
              ) : (
                <>
                  <UserInfo label="Correo electrónico" value={fullUserData.email} />
                  {fullUserData.telefono && (
                    <UserInfo label="Teléfono" value={fullUserData.telefono} />
                  )}
                  {fullUserData.dni && <UserInfo label="DNI" value={fullUserData.dni} />}
                  {fullUserData.plan && (
                    <UserInfo label="Plan actual" value={fullUserData.plan} />
                  )}
                </>
              )}
            </section>
          </div>
        )}

        {/* Panel métodos de pago (siempre visible) */}
        {!showProfile && (
          <div className="w-full p-0 sm:p-8 flex flex-col gap-4 bg-white rounded-b-2xl items-start sm:block">

            {/* Nota azul */}
            <div className="w-full mb-6 px-4 py-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl text-sm text-blue-900 shadow">
              <strong>¿Por qué solicitamos ambos métodos de pago?</strong>
              <br />
              <span>
                El cobro de las cuotas se realiza <b>preferentemente por cuenta bancaria</b>.
                En caso de que el recibo bancario sea rechazado, se intentará el cobro a
                través de la <b>tarjeta</b> registrada.
              </span>
            </div>

            {/* Cuenta bancaria */}
            <div className="w-full flex flex-col items-start">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-green-600" />
                  Cuenta bancaria
                </span>
                {!fullUserData?.cuenta_bancaria && !addingBankAccount && (
                  <button
                    className="text-green-600 hover:bg-green-100 transition rounded-full p-1"
                    onClick={() => setAddingBankAccount(true)}
                    aria-label="Añadir cuenta bancaria"
                    title="Añadir cuenta bancaria"
                  >
                    <PlusCircle className="w-6 h-6" />
                  </button>
                )}
              </div>
              {fullUserData?.cuenta_bancaria && !addingBankAccount ? (
                <BankAccountCard
                  className="w-full"
                  cuentaBancaria={fullUserData.cuenta_bancaria}
                  onDelete={handleAskDeleteBank}
                />
              ) : !addingBankAccount ? (
                <p className="text-gray-500 mt-2">No tienes cuenta bancaria registrada.</p>
              ) : null}
              {addingBankAccount && (
                <div className="mt-2 w-full">
                  <BankAccountForm
                    currentAccount={fullUserData.cuenta_bancaria}
                    onSuccess={(newAccount) => {
                      setFullUserData((prev) => ({
                        ...prev,
                        cuenta_bancaria: newAccount,
                      }));
                      setAddingBankAccount(false);
                    }}
                    onCancel={() => setAddingBankAccount(false)}
                  />
                </div>
              )}
            </div>

            {/* Tarjetas */}
            <div className="w-full flex flex-col items-start mt-6">
              <div className="flex items-center justify-between w-full mb-2">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  Tarjetas
                </span>
                {!addingCard && (
                  <button
                    className="text-green-600 hover:bg-green-100 transition rounded-full p-1"
                    onClick={() => setAddingCard(true)}
                    aria-label="Añadir tarjeta"
                    title="Añadir tarjeta"
                  >
                    <PlusCircle className="w-6 h-6" />
                  </button>
                )}
              </div>
              <div className="w-full flex flex-col gap-4 justify-start">
                {fullUserData?.tarjetas?.length > 0 ? (
                  fullUserData.tarjetas.map((card, idx) => (
                    <PaymentCard
                      key={card.id}
                      className="w-full"
                      card={card}
                      principal={idx === 0}
                      onDelete={() => handleAskDeleteCard(card.id)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No tienes tarjetas registradas.</p>
                )}
                {addingCard && (
                  <Elements stripe={stripePromise}>
                    <PaymentMethodForm
                      onSuccess={async () => {
                        setAddingCard(false);
                        await fetchUserData();
                      }}
                      onCancel={() => setAddingCard(false)}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flechas abajo dentro del contenedor */}
      <div className="flex justify-center gap-8 w-full px-8 mb-4 mt-8">
        <button
          onClick={() => setShowProfile(true)}
          disabled={showProfile}
          className={`flex items-center py-2 px-4 rounded-lg transition ${
            showProfile
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-blue-600 bg-white hover:shadow-md"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="ml-2 font-medium">Mis Datos</span>
        </button>

        <button
          onClick={() => setShowProfile(false)}
          disabled={!showProfile}
          className={`flex items-center py-2 px-4 rounded-lg transition ${
            !showProfile
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-blue-600 bg-white hover:shadow-md"
          }`}
        >
          <span className="mr-2 font-medium">Métodos de Pago</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={
          pendingDelete.type === "card"
            ? "¿Eliminar tarjeta?"
            : "¿Eliminar cuenta bancaria?"
        }
        description={
          pendingDelete.type === "card"
            ? "¿Seguro que quieres eliminar esta tarjeta? Esta acción no se puede deshacer."
            : "¿Seguro que quieres eliminar tu cuenta bancaria? Esta acción no se puede deshacer."
        }
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmColor="bg-red-600 hover:bg-red-700 text-white"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

function UserInfo({ label, value }) {
  return (
    <div className="w-full flex flex-col items-center">
      <label className="block text-gray-500 text-xs mb-1">{label}</label>
      <div className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 w-full text-center">
        {value}
      </div>
    </div>
  );
}

function UserInfoSkeleton() {
  return (
    <div className="w-full flex flex-col items-center mb-4">
      <div className="block bg-gray-300 rounded h-4 w-1/3 mb-1 animate-pulse"></div>
      <div className="px-4 py-2 rounded-xl bg-gray-300 w-full animate-pulse"></div>
    </div>
  );
}
