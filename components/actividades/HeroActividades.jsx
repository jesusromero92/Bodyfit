import React from "react";
import { motion } from "framer-motion";
import heroBg from "../../galeria/actividades/actividades_background.jpg";

export default function HeroActividades({ onEnter }) {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center sm:items-start justify-center h-full max-w-2xl px-6 text-center sm:text-left">
        {/* Título animado, igual que Hero de inicio */}
        <motion.h1
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow"
        >
        </motion.h1>
        <motion.h2
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.18 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3 drop-shadow"
          onViewportEnter={onEnter}
        >
          ACTIVIDADES <span className="text-blue-600">DIRIGIDAS</span>
        </motion.h2>
        <motion.p
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "tween", ease: "anticipate", duration: 0.8, delay: 0.32 }}
          className="text-white/80 text-base sm:text-lg font-medium"
        >
          Haz ejercicio y disfruta
        </motion.p>
      </div>
    </section>
  );
}
