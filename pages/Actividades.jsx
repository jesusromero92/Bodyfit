import React from "react";
import HeroActividades from "../components/actividades/HeroActividades";
import Servicios from "../components/actividades/Clases"; // ajusta la ruta si es necesario
import ActividadesDirigidas from "./ActividadesDirigidas"

export default function Actividades() {
  return (
    <div className="bg-white min-h-screen pb-8">
      <HeroActividades />

      {/* Aquí se muestra la sección de servicios con animación */}
      <Servicios />
      <ActividadesDirigidas />
    </div>
  );
}