import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // Importamos useLocation
import { CheckCircle, Lock } from "lucide-react";
import config from "../../config";

function getIcon(text) {
  if (text.toLowerCase().includes("sin permanencia"))
    return <CheckCircle className="w-5 h-5 text-green-600 mr-2" />;
  if (text.toLowerCase().includes("con permanencia"))
    return <Lock className="w-5 h-5 text-red-600 mr-2" />;
  return <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />;
}

const planes = [
  {
    titulo: "MENSUAL",
    precio: "39,95€",
    price_id: "price_1RmHA3PPi0OG9ICKPBlxbiEf",
    desc: "Pago mensual domiciliado. Ideal para comenzar.",
    caracteristicas: [
      { text: "Acceso ilimitado al gimnasio" },
      { text: "Renovación automática" },
      { text: "Sin permanencia", className: "text-green-600 font-bold" },
    ],
    boton: "ELEGIR MENSUAL",
    botonActivo: "Tienes este",  // Agregado para "MENSUAL"
  },
  {
    titulo: "SEMESTRAL",
    precio: "34,95€",
    price_id: "price_1RmMRUPPi0OG9ICK82sjrYNr",
    desc: "Pago semestral domiciliado. Ahorra en tu suscripción.",
    caracteristicas: [
      { text: "Acceso ilimitado al gimnasio" },
      { text: "Mejor precio por mes", className: "font-bold text-blue-700" },
      { text: "Con permanencia (1 año)", className: "font-bold text-red-600" },
    ],
    boton: "ELEGIR SEMESTRAL",
    botonActivo: "Tienes este",  // Agregado para "SEMESTRAL"
  },
  {
    titulo: "ANUAL",
    precio: "29,95€",
    price_id: "price_1RmMU5PPi0OG9ICKmNXyAwFP",
    desc: "Pago anual domiciliado. Máximo ahorro y ventajas exclusivas.",
    caracteristicas: [
      { text: "Acceso ilimitado al gimnasio" },
      { text: "Ahorro máximo", className: "font-bold text-blue-700" },
      { text: "Con permanencia (1 año)", className: "font-bold text-red-600" },
    ],
    destacado: "★ MÁS POPULAR",
    boton: "ELEGIR ANUAL",
    botonActivo: "Tienes este",  // Agregado para "ANUAL"
  },
];

const badgeVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 1.1, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function PlanesCards({ show = true }) {
  const [userPlan, setUserPlan] = useState(null);  // Almacenamos el plan del usuario
  const [hasToken, setHasToken] = useState(false);
  const [showNote, setShowNote] = useState(false);  // Controla la animación de la nota
  const navigate = useNavigate();
  const location = useLocation(); // Hook de ubicación para obtener la ruta actual

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decodificar el token
        //console.log("Token completo:", decoded);  // Imprime todo el contenido del token
        //console.log("Plan obtenido del token:", decoded.plan);  // Imprime solo el campo plan
        setUserPlan(decoded.plan);  // Asigna el plan del token
        setHasToken(true);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }

    // Mostrar la nota con animación después de que los planes carguen, solo si la ruta es /planes
    if (location.pathname === '/planes') {
      setTimeout(() => setShowNote(true), 500);  // Se muestra la nota con un retraso
    } else {
      setShowNote(true); // Si es /tarifas, se muestra de inmediato sin animación
    }
  }, [location.pathname]);

  if (!show) return null;

  const handlePlanClick = (plan) => {
    if (!hasToken) {
      navigate("/login");
      return;
    }
    console.log("Plan seleccionado:", plan);  // Imprime el plan seleccionado
    navigate("/checkout", { state: { plan } });
  };

  return (
    <div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={{ show: { transition: { delayChildren: 0.1, staggerChildren: 0.07 } } }}
        initial="hidden"
        animate="show"
      >
        {planes.map((plan, i) => (
          <motion.div
            key={i}
            className={`
              bg-white p-10 rounded-2xl shadow-xl text-left w-full border-2
              ${plan.destacado ? "border-yellow-400" : "border-blue-300"}
              relative flex flex-col justify-between min-h-[480px] max-w-lg mx-auto
              ${userPlan && userPlan.toLowerCase() === plan.titulo.toLowerCase() ? 'border-green-500 bg-green-50 shadow-xl transform scale-105' : ''}  // Aumentar el tamaño del card cuando es el activo
            `}
            style={plan.destacado ? { boxShadow: "0 0 24px 0 #fde04744" } : {}}
            variants={itemVariants}
          >
            {plan.destacado && (
              <motion.span
                className="absolute top-6 right-6 z-10 inline-block text-xs bg-yellow-400 text-yellow-900 font-bold px-5 py-2 rounded-full shadow cursor-default"
                variants={badgeVariants}
                animate="animate"
                style={{ boxShadow: "0 2px 12px #fde047a1" }}
              >
                {plan.destacado}
              </motion.span>
            )}

            {userPlan && userPlan.toLowerCase() === plan.titulo.toLowerCase() && (
              <motion.span
                className="absolute top-6 right-6 z-10 inline-block text-xs bg-green-500 text-white font-bold px-5 py-2 rounded-full shadow cursor-default"
                variants={badgeVariants}
                animate="animate"
                style={{ boxShadow: "0 2px 12px #2d6a4f" }}
              >
                <CheckCircle className="w-4 h-4 mr-2 inline-block" />
                Suscrito
              </motion.span>
            )}

            <div>
              <span className="block font-bold text-blue-700 text-2xl mb-2">
                {plan.titulo}
              </span>
              <span className="block text-3xl font-extrabold text-gray-900 mb-2">
                {plan.precio}
                <span className="text-base font-semibold text-gray-600 align-middle">
                  /mes
                </span>
              </span>
              <p className="text-gray-800 text-[15px] mb-4">{plan.desc}</p>
              <ul className="text-base text-blue-700 font-medium space-y-2 mb-6 pl-0">
                {plan.caracteristicas.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2 ${f.className || ""}`}>
                    {getIcon(f.text)}
                    <span className={f.className || ""}>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handlePlanClick(plan)}
              type="button"
              className={`
                w-full bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-bold py-3 rounded-full transition duration-200 text-base shadow mt-2
                ${userPlan ? 'cursor-not-allowed opacity-50' : ''}  // Deshabilitar todos los botones si el plan está seleccionado
              `}
              disabled={userPlan}  // Deshabilitar todos los botones si ya hay un plan seleccionado
            >
              {userPlan && userPlan.toLowerCase() === plan.titulo.toLowerCase() ? plan.botonActivo : plan.boton}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Nota después de los planes */}
      {showNote && (
        <motion.div
          className="mt-8 bg-blue-100 border-l-4 border-blue-400 text-blue-900 text-center text-sm font-semibold p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>
            Nota: Los planes con permanencia de 1 año tienen una penalización acordada en el contrato
            si se cancelan antes de completar el año de permanencia.
          </p>
        </motion.div>
      )}
    </div>
  );
}
