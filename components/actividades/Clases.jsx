import React, { useState } from "react";
import { motion } from "framer-motion";
import { clases } from "./clasesData"; // Ajusta la ruta según tu proyecto

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.13,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Clases() {
  const [show, setShow] = useState(false);

  return (
    <section className="py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-extrabold text-center mb-12 tracking-tight
            text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            text-gray-800
            leading-tight
            w-full
            whitespace-normal"
          style={{ letterSpacing: "-0.01em", lineHeight: "1.08" }}
        >
          Conoce nuestras <span className="text-blue-600">clases</span>
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
          variants={gridVariants}
          initial="hidden"
          animate={show ? "show" : "hidden"}
        >
          {clases.map((clase, i) => (
            <motion.div
              key={i}
              className="flex flex-col md:flex-row bg-white border border-blue-200 rounded-2xl shadow-lg overflow-hidden h-full"
              variants={cardVariants}
              onViewportEnter={() => setShow(true)}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(30, 64, 175, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Imagen arriba en móvil, a la izquierda en desktop */}
              <div className="w-full md:w-44 aspect-[4/3] flex-shrink-0 overflow-hidden rounded-t-2xl md:rounded-t-none md:rounded-l-2xl">
                <img
                  src={clase.imagen}
                  alt={clase.titulo}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="flex-1 p-5 flex flex-col justify-start">
                <h3 className="font-extrabold text-xl md:text-2xl text-blue-900 mb-1 min-h-[3rem]">
                  {clase.titulo}
                </h3>
                <div className="flex flex-wrap gap-3 text-xs mb-2">
                  <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {clase.intensidad}
                  </span>
                  <span className="inline-block bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                    {clase.duracion}
                  </span>
                  <span className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded">
                    {clase.calorias}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{clase.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
