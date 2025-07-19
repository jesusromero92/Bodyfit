import React from "react";
import { motion } from "framer-motion";
import ScheduleViewer from "../components/horario/ScheduleViewer";
import instruccionesImg from "../galeria/actividades-dirigidas/trainingym2.jpg";
import instruccionesImg2 from "../galeria/actividades-dirigidas/trainingym3.jpg";

// Variantes de animación
const titleVariant = {
  hidden: { y: -60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 13 } }
};

const imageVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.22, duration: 0.7, ease: "easeOut" }
  })
};

const preguntaVariant = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "tween", ease: "anticipate", duration: 0.7 } }
};

export default function ActividadesDirigidas() {
  return (
    <div className="pt-16 pb-16 px-4 bg-white">
      {/* Título de la página */}
      <motion.h1
        variants={titleVariant}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-8 text-gray-800"
      >
        Clases y <span className="text-blue-600">Entrenamientos Dirigidos</span>
      </motion.h1>

      {/* Imágenes seguidas sin márgenes extra */}
      <div className="max-w-4xl mx-auto flex flex-col">
        {[instruccionesImg, instruccionesImg2].map((img, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            className={i === 0 ? "mb-0 border-0 p-0 m-0" : "mt-2 border-0 p-0 m-0"}
          >
            <ScheduleViewer
              imgSrc={img}
              alt={`Instrucciones App Trainingym - Paso ${i + 1}`}
              className="border-0 p-0 m-0"
            />
          </motion.div>
        ))}
      </div>

      {/* Pregunta y respuesta */}
      <motion.div
        variants={preguntaVariant}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center mt-12"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
          ¿Olvidaste Reservar{" "}
          <span className="text-blue-600">Tu Plaza?</span>
        </h2>
        <p className="text-gray-700 text-base sm:text-lg">
          No te preocupes: entra sin reserva siempre que queden plazas disponibles.
          Aún así, te recomendamos confirmar con antelación para asegurarte el sitio.
        </p>
      </motion.div>
    </div>
  );
}
