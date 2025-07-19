import React from "react";
import { motion } from "framer-motion";
import uneteBg from "../../galeria/inicio/foto_gym.jpg"; // Ajusta la ruta según tu proyecto

// Variants para animación en contenedor y elementos
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
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Unete() {
  return (
    <motion.section
      className="relative py-16 overflow-hidden"
      style={{
        backgroundImage: `url(${uneteBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <motion.div className="relative z-10 max-w-5xl mx-auto text-center text-white px-4 space-y-6">
        <motion.h3
          className="text-4xl md:text-5xl font-bold mb-6"
          variants={itemVariants}
        >
          FORME PARTE DE BODYFIT
        </motion.h3>

        {/* Texto descriptivo animado */}
        <motion.div
          className="text-lg md:text-xl font-medium leading-relaxed space-y-6 mb-6"
          variants={itemVariants}
        >
          <p>
            En Bodyfit Center somos muy conscientes de las necesidades de las personas en la actualidad, por eso
            focalizamos nuestro trabajo en adaptar al máximo cada programa a cada tipo de usuario.
          </p>
        </motion.div>

        <motion.div
          className="text-lg md:text-xl font-medium leading-relaxed space-y-6 mb-6"
          variants={itemVariants}
        >
          <p>
            Contamos con amplias zonas de aparcamiento para que no pierdas tiempo, más de 220 horas de actividades al mes
            con una amplia variedad de disciplinas que te ayudarán a alcanzar tu objetivo de una forma más dinámica y divertida.
            Además disponemos de un amplio horario de apertura de Lunes a Domingo.
          </p>
        </motion.div>

        <motion.div
          className="text-lg md:text-xl font-medium leading-relaxed space-y-6"
          variants={itemVariants}
        >
          <p>
            Como nuestro objetivo principal es tu bienestar, somos el único centro deportivo en el Aljarafe con un sistema de
            entrenamiento PREMIUM en el que se te personalizará una serie de servicios para que puedas cumplir tu objetivo
            de una forma más rápida y segura.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
