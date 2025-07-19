import React from "react";
import { motion } from "framer-motion";
import aperturaBg from "../galeria/horario/horario2.png";
import ScheduleViewer from "../components/horario/ScheduleViewer";
import scheduleImg from "../galeria/inicio/horario.jpg";
import actividadesPdf from "../galeria/horario/horario_verano_bodyfit.pdf";

// Animación título principal
const heroTitleVariant = {
  hidden: { y: -60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 13 } }
};

export default function Horarios() {
  return (
    <div className="bg-gray-50">
      {/* Horario de apertura */}
      <section
        className="relative h-[400px] md:h-[600px] bg-cover bg-top"
        style={{ backgroundImage: `url(${aperturaBg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            className="text-white text-center w-full md:max-w-2xl lg:max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 13 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 tracking-tight"
            >
              Horario de <span className="text-blue-600">Apertura</span>
            </motion.h2>
            <motion.ul
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="list-disc list-inside space-y-2 text-base sm:text-lg md:text-xl lg:text-2xl"
            >
              <li className="text-center flex items-center justify-center">
                <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-3" />
                <strong className="mr-3">Lunes a Viernes:</strong> 07:00h - 22:30h
              </li>
              <li className="text-center flex items-center justify-center">
                <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-3" />
                <strong className="mr-3">Sábados y Domingos:</strong> 09:00h - 14:00h
              </li>
            </motion.ul>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="italic text-blue-200 mt-2 text-center"
            >
              (Julio-Agosto: Domingos cerrado)
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Horario actividades dirigidas */}
<section className="py-16 bg-white">
  <div className="w-full px-4 text-center"> {/* <- SIN max-w */}
    <motion.h2
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 13 }}
      className={`
        font-extrabold text-center mb-12 tracking-tight
        text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
        text-gray-800
        leading-tight
        w-full
        whitespace-normal
      `}
      style={{
        letterSpacing: "-0.01em",
        lineHeight: "1.08",
      }}
    >
      Horario de <span className="text-blue-600">ACTIVIDADES DIRIGIDAS</span>
    </motion.h2>

    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <ScheduleViewer imgSrc={scheduleImg} alt="Horario actividades dirigidas" />
      </div>
    </div>

    <a
      href={actividadesPdf}
      download
      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition transform hover:-translate-y-1 duration-200 mt-10"
    >
      Descargar PDF Verano 2025
    </a>
  </div>
</section>

    </div>
  );
}
