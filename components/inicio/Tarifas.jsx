import React from "react";
import { motion } from "framer-motion";
import tarifasBg from "../../galeria/inicio/tarifas.jpg"; // Ajusta la ruta según tu proyecto

// Variants para animación con stagger en contenido
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Tarifas() {
  return (
    <motion.section
      className="py-8 flex items-center justify-center bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Imagen izquierda */}
        <motion.div
          className="md:w-auto flex items-center justify-center p-6"
          variants={itemVariants}
        >
          <img
            src={tarifasBg}
            alt="Personas entrenando"
            className="rounded-lg shadow-lg"
            style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
          />
        </motion.div>
        {/* Tarifas y extras */}
        <motion.div
          className="flex-1 flex flex-col justify-center p-6 items-center text-center md:items-start md:text-left"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-blue-900 mb-4"
            variants={itemVariants}
          >
            TARIFAS - SIN MATRÍCULA
          </motion.h2>
          <motion.ul
            className="text-blue-800 text-base space-y-2 font-semibold mb-4 list-disc list-inside"
            variants={itemVariants}
          >
            <li><span className="font-bold">MENSUAL</span> 39,95€</li>
            <li>
              <span className="font-bold">SEMESTRAL</span> 34,95€
              <span className="block text-xs font-normal ml-6 text-blue-800">
                (domiciliado) o (único pago + 1 mes gratis)
              </span>
            </li>
            <li>
              <span className="font-bold">ANUAL</span> 29,95€
              <span className="block text-xs font-normal ml-6 text-blue-800">
                (domiciliado) o (único pago + 2 meses gratis)
              </span>
            </li>
            <li><span className="font-bold">PASE DE DÍA</span> 6€</li>
            <li><span className="font-bold">SEMANA</span> 25€</li>
            <li><span className="font-bold">LLAVE DE ACCESO</span> 2€</li>
          </motion.ul>
          <motion.ul
            className="text-blue-900 mt-4 space-y-1 text-sm italic font-normal"
            variants={itemVariants}
          >
            <li>Sin Matrícula</li>
            <li>Acceso ilimitado</li>
            <li>Todas las clases incluidas</li>
            <li>Entrenamiento personalizado</li>
            <li>Bioimpedancias</li>
            <li>Seguimiento cada 21 días</li>
            <li>APP Trainingym</li>
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
