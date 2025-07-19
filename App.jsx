import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/inicio/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Inicio from "./pages/inicio";
import AvisoLegal from "./pages/aviso-legal";
import Normativa from "./pages/normativa";
import Horario from "./pages/horario";
import ActividadesDirigidas from "./pages/ActividadesDirigidas";
import Servicios from "./pages/servicios";
import Tarifas from "./pages/Tarifas";
import Actividades from "./pages/Actividades";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import MiPerfil from "./pages/MiPerfil";
import Planes from "./pages/Planes";
import Checkout from "./components/Planes/Checkout";  // <-- IMPORTAR Checkout

import { preloadImages } from "./utils/preloadImages";

// Importing Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe public key here
const stripePromise = loadStripe("your-stripe-public-key");

function App() {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <ScrollToTop />
      <Header className="mb-16" />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/normativa" element={<Normativa />} />
          <Route path="/horario" element={<Horario />} />
          <Route path="/act-dirigidas" element={<ActividadesDirigidas />} />
          <Route path="/tarifas" element={<Tarifas />} />
          <Route path="/actividades" element={<Actividades />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<MiPerfil />} />
          <Route path="/planes" element={<Planes />} />
          {/* Wrap Checkout route in Elements */}
          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
