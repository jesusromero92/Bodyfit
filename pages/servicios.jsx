import React from "react";
import { motion } from "framer-motion";
import HeroServicios from "../components/servicios/HeroServicios";
import ScheduleViewer from "../components/horario/ScheduleViewer";
import premiumImg from "../galeria/inicio/trainingym.png";
import premiumIcons from "../galeria/servicios/resultados.png";
import personalImg from "../galeria/servicios/entrenamiento-personal.jpg";
import nutricionImg from "../galeria/servicios/nutricion.jpg";

// Animaciones
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Servicios() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroServicios />

      {/* PROGRAMA PREMIUM */}
      <motion.section
        className="py-20 bg-gradient-to-b from-blue-50 to-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-blue-700 text-center mb-12 tracking-tight drop-shadow"
            variants={itemVariants}
          >
            PROGRAMA PREMIUM – APP TRAININGYM
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Imagen App */}
            <motion.div className="flex justify-center" variants={itemVariants}>
              <ScheduleViewer
                imgSrc={premiumImg}
                alt="Programa Premium App Trainingym"
                className="w-full max-w-md rounded-3xl shadow-2xl border-4 border-white"
              />
            </motion.div>
            {/* Texto y lista */}
            <motion.div variants={itemVariants}>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Nuestro objetivo es que siempre estés motivado, asesorado y en todo momento sepas cuál es tu evolución en el entrenamiento. Por ello, nuestro sistema de entrenamiento PREMIUM único en el aljarafe está diseñado para que tu experiencia con nosotros sea lo más motivadora, saludable y eficaz posible.<br /><br />
                Disfrutarás de nuestra APP móvil, que te permitirá tener en tu teléfono toda la evolución y progreso en un clic. Además, tendrás la programación de tu entrenamiento semanal y diario.
              </p>
              <motion.div
                className="bg-white/90 p-6 rounded-2xl shadow-lg mb-6 border border-blue-100"
                variants={itemVariants}
              >
                <p className="font-semibold text-blue-700 mb-3 text-lg">
                  El programa premium consta de 4 partes:
                </p>
                <ul className="list-disc list-inside text-gray-800 space-y-2 pl-2">
                  <li>Entrevista inicial con tu entrenador.</li>
                  <li>Valoración del estado físico y nutricional por bioimpedancia.</li>
                  <li>Diseño de entrenamiento personalizado.</li>
                  <li>Seguimiento y revisiones periódicas.</li>
                </ul>
              </motion.div>
              {/* Iconos */}
              <motion.div className="flex justify-center md:justify-start mt-6" variants={itemVariants}>
                <img
                  src={premiumIcons}
                  alt="Iconos características Programa Premium"
                  className="w-full max-w-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ENTRENAMIENTO PERSONAL */}
      <motion.section
        className="py-16 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
          <motion.div className="flex justify-center" variants={itemVariants}>
            <ScheduleViewer
              imgSrc={personalImg}
              alt="Entrenamiento Personal"
              className="w-full h-auto rounded-2xl shadow-lg max-w-md"
            />
          </motion.div>
          <motion.div className="text-center md:text-left space-y-4" variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
              ENTRENAMIENTO PERSONAL
            </h2>
            <p className="text-gray-700">
              Con nuestro Entrenamiento Personal realizarás una entrevista inicial
              para fijar tus objetivos y recopilar datos esenciales. Gracias a la
              bioimpedancia diseñamos un plan a tu medida y supervisamos cada sesión
              para que avances con seguridad, evitando lesiones y optimizando
              resultados.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Entrevista y objetivos personalizados</li>
              <li>Diseño de plan según bioimpedancia</li>
              <li>Supervisión y corrección de técnica</li>
              <li>Seguimiento de la evolución en cada sesión</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* NUTRICIÓN */}
      <motion.section
        className="py-16 bg-white flex-1"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
          <motion.div className="flex justify-center" variants={itemVariants}>
            <ScheduleViewer
              imgSrc={nutricionImg}
              alt="Nutrición y Dietética"
              className="w-full h-auto rounded-2xl shadow-lg max-w-md"
            />
          </motion.div>
          <motion.div className="text-center md:text-left space-y-4" variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
              NUTRICIÓN Y DIETÉTICA
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Plan nutricional variado y equilibrado</li>
              <li>Reemplazar hábitos poco saludables</li>
              <li>Dieta personalizada según tus gustos y necesidades</li>
              <li>Perder peso, ganar masa muscular o mejorar rendimiento</li>
              <li>Bioimpedancia y seguimiento continuo</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
