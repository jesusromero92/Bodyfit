import Header from "../components/inicio/Header";
import Hero from "../components/inicio/Hero";
import Servicios from "../components/inicio/Servicios";
import Unete from "../components/inicio/Unete";
import Tarifas from "../components/inicio/Tarifas";
import Descuentos from "../components/inicio/Descuentos";
import FinalInicio from "../components/inicio/FinalInicio";
import Footer from "../components/Footer"; // <--- Añade esta línea

export default function Inicio() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <div className="pt-8">
          <Servicios />
          <Unete />
          <Tarifas />
          <FinalInicio />
        </div>
      </main>
    </div>
  );
}
