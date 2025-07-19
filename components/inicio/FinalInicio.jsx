// src/pages/FinalInicio.jsx
import React from "react";
import ScheduleViewer from "../../components/horario/ScheduleViewer";
import garantizateImg from "../../galeria/inicio/resultados.jpg";
import horarioImg from "../../galeria/inicio/horario.jpg";
import cardioprotegidoImg from "../../galeria/inicio/centrocardioprotegido.jpg";

export default function FinalInicio() {
  return (
    <section className="py-10 px-2 bg-white flex flex-col items-center">
      {/* Iconos + frase */}
      <div className="w-full max-w-2xl mb-8">
        <img
          src={garantizateImg}
          alt="Garantízate resultados"
          className="w-full h-auto mx-auto"
        />
      </div>

      {/* Horario de actividades dirigidas usando ScheduleViewer */}
      <div className="w-full max-w-3xl mb-8 bg-gray-50 rounded-xl shadow-lg p-4">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">
          HORARIO DE ACTIVIDADES DIRIGIDAS
        </h3>
        <ScheduleViewer imgSrc={horarioImg} alt="Horario de actividades dirigidas" />
      </div>

      {/* Sello cardioprotegido */}
      <div className="w-full max-w-xs mb-8">
        <img
          src={cardioprotegidoImg}
          alt="Centro cardioprotegido"
          className="w-full h-auto mx-auto"
        />
      </div>

      {/* Texto informativo */}
      <p className="text-xs text-gray-600 text-center max-w-3xl italic px-4">
        Bodyfit Alavera SL ha recibido una ayuda de la Unión Europea con cargo al Programa Operativo FEDER de Andalucía 2014-2020,
        financiada como parte de la respuesta de la Unión a la pandemia de COVID-19 (REACT-UE), para compensar el sobrecoste energético de gas natural y/o electricidad a pymes y autónomos especialmente afectados por el incremento de los precios del gas natural y la electricidad provocados por el impacto de la guerra de agresión de Rusia contra Ucrania.
      </p>
    </section>
  );
}
