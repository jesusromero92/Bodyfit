import React from "react";
import descuentosImg from "../../galeria/inicio/tarifas2.png";
import ofertaImg from "../../galeria/inicio/oferta.jpeg";

export default function Descuentos() {
  return (
    <section className="py-16 bg-white flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Card 1 */}
        <div className="group rounded-3xl shadow-2xl bg-white overflow-hidden aspect-[1/1] flex items-center justify-center transition-all duration-300 hover:shadow-[0_8px_40px_rgba(52,105,203,0.12)] hover:scale-105">
          <img
            src={descuentosImg}
            alt="Descuentos"
            className="object-contain w-full h-full transition-all duration-300 group-hover:scale-105 bg-white"
            draggable={false}
          />
        </div>
        {/* Card 2 */}
        <div className="group rounded-3xl shadow-2xl bg-white overflow-hidden aspect-[1/1] flex items-center justify-center transition-all duration-300 hover:shadow-[0_8px_40px_rgba(52,105,203,0.12)] hover:scale-105 relative">
          <img
            src={ofertaImg}
            alt="Oferta"
            className="object-contain w-full h-full transition-all duration-300 group-hover:scale-105 bg-white"
            draggable={false}
          />
          {/* Etiqueta Oferta */}
          <span className="absolute top-5 left-5 bg-yellow-400 text-gray-900 px-4 py-1 rounded-xl text-xs font-bold shadow-lg uppercase tracking-widest z-10">
            Oferta
          </span>
        </div>
      </div>
    </section>
  );
}
