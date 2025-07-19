import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { useUser } from "../../contexts/UserContext.jsx";
import config from "../../config.js";

import PaymentStatusModal from "./PaymentStatusModal.jsx"; 
import Modal from "../checkout/Modal.jsx";
import PlanDetails from "../checkout/PlanDetails.jsx";
import Verifications from "../checkout/Verifications.jsx";
import CheckoutSkeleton from "../checkout/CheckoutSkeleton.jsx";
import PaymentMethod from "../checkout/PaymentMethods.jsx"; // Componente de métodos de pago

import mastercardImg from '../checkout/mastercard.png';
import visaImg from '../checkout/visa.png';
import { Trash } from "lucide-react"; // Iconos para eliminar y cuenta bancaria

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const [fullUserData, setFullUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const [cancelInfoOpen, setCancelInfoOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);
  const [cancelInfoAccepted, setCancelInfoAccepted] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);

  const [paying, setPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); 
  const [errorCode, setErrorCode] = useState(null); 

  const plan = location.state?.plan;

  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(
        `${config.API_BASE_URL}/usuario?email=${encodeURIComponent(user.email)}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (!res.ok) throw new Error("Error al obtener datos de usuario");
      const data = await res.json();
      setFullUserData(data);
      // Aquí agregamos el log para verificar la cuenta bancaria
      console.log('Cuenta Bancaria:', data.cuenta_bancaria); // Asegúrate de que la cuenta bancaria esté en los datos
    } catch (error) {
      setError(error.message);
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!plan) {
      navigate("/planes");
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUserData();
  }, [plan, user, navigate, fetchUserData]);

  const tarjetas = fullUserData?.tarjetas || [];
  const cuentaBancaria = fullUserData?.cuenta_bancaria;
  const hasBankAccount = !!cuentaBancaria;
  const hasCards = tarjetas.length > 0;
  const showPaymentOptions = hasBankAccount || hasCards;

  useEffect(() => {
    if (!loading) {
      if (hasBankAccount && !hasCards) {
        setSelectedMethod("bank");
      } else if (!hasBankAccount && hasCards) {
        setSelectedMethod(tarjetas[0].id);
      } else {
        setSelectedMethod(null); // Si no hay cuenta bancaria ni tarjetas, seleccionamos null
      }
    }
  }, [loading, hasBankAccount, hasCards, tarjetas]);

  if (!plan) return <p className="p-8 text-center">Pagando...</p>;
  if (loading) return <CheckoutSkeleton />;
  if (error) return <p className="p-8 text-center text-red-600 font-semibold">Error: {error}</p>;

  const handleSelectMethod = (methodId) => {
    if (methodId === "bank" && !hasCards) {
      alert("Para pagar con cuenta bancaria debes tener al menos una tarjeta registrada.");
      return;
    }
    setSelectedMethod(methodId);
  };

  const handleDeleteBank = () => {
    // Aquí puedes agregar la lógica para eliminar la cuenta bancaria
    console.log("Eliminar cuenta bancaria");
  };

  const handlePay = async () => {
    if (!selectedMethod) {
      alert("Por favor selecciona un método de pago.");
      return;
    }
    if (!cancelInfoAccepted || !contractAccepted) {
      alert("Debes aceptar la información de cancelación y el contrato antes de pagar.");
      return;
    }

    setPaying(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${config.API_BASE_URL}/crear_suscripcion_directa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          plan_id: plan.price_id,
          payment_method_id: selectedMethod,
        }),
      });
      const data = await res.json();

      if (data.error_code === 'USER_HAS_ACTIVE_SUBSCRIPTION') {
        setPaymentStatus('already_subscribed');
      } else if (data.requires_action) {
        setPaymentStatus('requires_action');
        setErrorCode(data.error_code);
      } else if (data.success) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('failed');
        setErrorCode(data.error_code);
      }
    } catch (err) {
      setPaymentStatus('failed');
      setErrorCode('INTERNAL_ERROR');
    } finally {
      setPaying(false);
    }
  };

  let payButtonText = "Seleccione un método de pago";
  let payButtonDisabled = true;

  if (selectedMethod === "bank") {
    if (!hasCards) {
      payButtonText = "Necesitas tener al menos una tarjeta registrada para pagar con banco";
      payButtonDisabled = true;
    } else {
      payButtonText = paying ? "Pagando..." : "Pagar con cuenta bancaria";
      payButtonDisabled = false;
    }
  } else if (selectedMethod) {
    payButtonText = paying ? "Pagando..." : "Pagar con tarjeta";
    payButtonDisabled = false;
  }

  if (paymentStatus === "success") {
    payButtonText = "Suscrito";
    payButtonDisabled = true;
  }

  payButtonDisabled = payButtonDisabled || !cancelInfoAccepted || !contractAccepted || paying;

  return (
    <section className="bg-white min-h-[calc(100vh-6rem)] pt-24 px-2 pb-16 flex flex-col items-center">
      {/* Contenedor principal más pequeño */}
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl border-2 border-gray-300 shadow-lg">
        <Modal
          open={cancelInfoOpen}
          title="Información sobre Cancelación"
          onAccept={() => {
            setCancelInfoAccepted(true);
            setCancelInfoOpen(false);
          }}
          onReject={() => {
            setCancelInfoAccepted(false);
            setCancelInfoOpen(false);
          }}
        >
          <div className="text-gray-700 space-y-2">
            <p>
              Para cancelar tu suscripción debes comunicarte directamente con el gimnasio para solicitar la baja.
              Si solicitas la cancelación durante tu periodo de permanencia, tendrás que abonar la penalización estipulada en tu contrato.
            </p>
            <p>
              Si tienes dudas sobre el proceso, puedes consultar nuestras <a href="#" className="text-blue-600 underline">preguntas frecuentes</a>.
            </p>
          </div>
        </Modal>

        <Modal
          open={contractOpen}
          title="Contrato de Servicio"
          onAccept={() => {
            setContractAccepted(true);
            setContractOpen(false);
          }}
          onReject={() => {
            setContractAccepted(false);
            setContractOpen(false);
          }}
        >
          <div className="text-gray-700 max-h-72 overflow-auto text-sm space-y-2">
            <p>
              Al continuar, aceptas el contrato de prestación de servicios del gimnasio, que puedes consultar íntegro aquí.
            </p>
            <p>
              <b>Resumen:</b> Nos comprometemos a ofrecerte acceso a las instalaciones y clases según el plan elegido. El pago es recurrente mensual y podrás cancelar en cualquier momento, conforme al punto anterior. Consulta el contrato legal completo en tu área de usuario.
            </p>
            <hr className="my-2"/>
            <p>
              <b>Condiciones:</b> El incumplimiento de los pagos puede llevar a la suspensión temporal del servicio. Los datos proporcionados serán tratados conforme a nuestra política de privacidad.
            </p>
          </div>
        </Modal>

        <PaymentStatusModal
          open={paymentStatus !== null}
          onClose={() => setPaymentStatus(null)}
          status={paymentStatus}
        />

        <h1 className="text-3xl font-extrabold mb-8 text-center tracking-tight">
          Checkout: <span className="text-blue-600">{plan.titulo}</span>
        </h1>

        <PlanDetails plan={plan} user={user} />

        {showPaymentOptions && (
          <>
            {/* Mostrar las tarjetas y cuenta bancaria como opciones de pago */}
            <div className="w-full flex flex-col gap-4 justify-start">
              {fullUserData?.tarjetas?.length > 0 || hasBankAccount ? (
                <PaymentMethod
                  tarjetas={tarjetas}
                  cuentaBancaria={fullUserData?.cuenta_bancaria} // Pasamos la cuenta bancaria al componente PaymentMethod
                  onDeleteBank={handleDeleteBank} // Función para eliminar la cuenta bancaria
                  onSelectMethod={handleSelectMethod}
                />
              ) : (
                <p className="text-gray-500">No tienes tarjetas ni cuenta bancaria registrada.</p>
              )}
            </div>

            <Verifications
              cancelInfoAccepted={cancelInfoAccepted}
              contractAccepted={contractAccepted}
              setCancelInfoOpen={setCancelInfoOpen}
              setContractOpen={setContractOpen}
            />

            <button
              disabled={payButtonDisabled}
              onClick={handlePay}
              className={`mt-2 mb-6 w-full py-3 rounded-lg font-semibold text-white transition ${payButtonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {payButtonText}
            </button>

            {/* Mostrar las imágenes de métodos de pago aceptados debajo del botón */}
              <div className="mt-2text-center">
                <div className="flex justify-center items-center gap-4">
                  <img src={mastercardImg} alt="Mastercard" className="h-8" />
                  <img src={visaImg} alt="Visa" className="h-8" />
                </div>
              </div>
            
          </>
        )}
      </div>
    </section>
  );
}
