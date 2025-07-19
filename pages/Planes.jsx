import React, { useState } from "react";
import PlanesCards from "../components/Planes/PlanesCards"; // ajusta ruta

export default function PlanesPage() {
  const [showCards, setShowCards] = useState(false);

  return (
    <section className="bg-white min-h-[calc(100vh-6rem)] pt-24 px-2 pb-16 flex flex-col items-center">
      <div className="relative max-w-6xl mx-auto z-10 px-4">
        <h2 className="font-extrabold text-center mb-12 tracking-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-800 leading-tight w-full whitespace-normal">
          PLANES <span className="text-blue-600">BODYFIT</span>
        </h2>

        {/* Mostrar cards */}
        <PlanesCards show={true} />
      </div>
    </section>
  );
}
