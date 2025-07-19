import React from "react";
import { motion } from "framer-motion";
import HeroTarifas from "../components/tarifas/HeroTarifas";
import Tarifas from "../components/inicio/Tarifas"; // ajusta la ruta si es necesario

import oferta1 from "../galeria/inicio/oferta.jpeg";
import oferta2 from "../galeria/inicio/tarifas2.png";
import PlanesCards from "../components/Planes/PlanesCards"; // ajusta ruta

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.18,
      duration: 0.65,
      ease: "easeOut",
    },
  }),
};

export default function TarifasPage() {
  const ofertas = [
    { img: oferta1, alt: "Oferta especial 1" },
    { img: oferta2, alt: "Oferta especial 2" },
  ];

  return (
    <div className="bg-white min-h-screen pb-0">
      <HeroTarifas />

      {/* Sección Tarifas */}
      <Tarifas />

      {/* Nueva sección para Planes con título igual que en la página Planes */}
      <section
        id="planes"
        className="bg-white pt-24 px-2 pb-16 flex flex-col items-center"
      >
        <div className="relative max-w-6xl mx-auto z-10 px-4">

          {/* Componente de cards de planes */}
          <PlanesCards show={true} />
        </div>
      </section>

      {/* Sección Ofertas y Descuentos */}
      <section className="w-full flex flex-col items-center justify-center bg-gray-50 pt-12 pb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          <span className="text-blue-800">Ofertas</span> y{" "}
          <span className="text-yellow-500">Descuentos</span>
        </h2>
        <div
          className={`
            grid gap-10 justify-center
            ${ofertas.length === 1
              ? "grid-cols-1"
              : ofertas.length === 2
              ? "sm:grid-cols-2 grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-3 grid-cols-1"
            }
            max-w-6xl mx-auto px-4
          `}
        >
          {ofertas.map((oferta, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden flex items-center justify-center p-4 mx-auto"
              style={{ minWidth: 300, maxWidth: 400 }}
            >
              <img
                src={oferta.img}
                alt={oferta.alt}
                className="object-contain w-full h-80"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
