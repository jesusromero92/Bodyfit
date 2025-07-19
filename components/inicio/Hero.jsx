import React from "react";
import { motion } from "framer-motion";
import heroBg from "../../galeria/inicio/background.jpeg";

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center h-screen text-center overflow-hidden bg-cover bg-center md:[background-position:center_25%]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {/* Título animado, igual color que servicios */}
        <motion.h1
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight"
        >
          NO EXISTEN{" "}
          <span className="text-blue-600">LÍMITES</span>
        </motion.h1>

        {/* Subtítulo animado, blanco */}
        <motion.p
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "tween", ease: "anticipate", duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl lg:text-3xl text-white font-semibold tracking-wide max-w-2xl"
        >
          DISFRUTA DEL DEPORTE Y LA MEJOR ATENCIÓN
        </motion.p>
      </div>
    </section>
  );
}
