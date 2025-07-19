// src/components/HeroServicios.jsx
import React from "react";
import { motion } from "framer-motion";
import serviciosHero from "../../galeria/servicios/servicios.jpg";
import serviciosHeroMobile from "../../galeria/servicios/servicios2.jpg";

export default function HeroServicios() {
  const titleAnim = {
    initial: { y: -60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 100, damping: 15 },
  };
  const subtitleAnim = {
    initial: { x: -40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: "tween", duration: 0.8, delay: 0.3 },
  };
  const listAnim = {
    initial: { opacity: 0, x: 20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.6 + i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <picture>
        <source media="(max-width: 767px)" srcSet={serviciosHeroMobile} />
        <img
          src={serviciosHero}
          alt="Hero Servicios"
          className="w-full h-full object-cover object-left md:object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
        <div className="flex flex-col items-center text-center text-white space-y-6 max-w-2xl mx-auto">
          <motion.h1
            initial={titleAnim.initial}
            animate={titleAnim.animate}
            transition={titleAnim.transition}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            SÓMOS ÚNICOS, PIONEROS EN{" "}
            <span className="text-blue-600">SERVICIOS</span>
          </motion.h1>
          <motion.p
            initial={subtitleAnim.initial}
            animate={subtitleAnim.animate}
            transition={subtitleAnim.transition}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
          >
            Asegúrate resultados, consigue tu objetivo de una forma más rápida,
            más segura y más eficaz
          </motion.p>
          <ul className="flex flex-col items-center space-y-4">
            {["Programas PREMIUM", "Entrenamiento Personal"].map((text, idx) => (
              <motion.li
                key={text}
                custom={idx}
                initial="initial"
                animate="animate"
                variants={listAnim}
                className="flex items-center text-lg sm:text-xl font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 12h14m0 0l-6-6m6 6l-6 6"
                  />
                </svg>
                <span className="font-bold">{text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
