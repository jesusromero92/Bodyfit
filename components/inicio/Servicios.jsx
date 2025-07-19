import React, { useState } from "react";
import { motion } from "framer-motion";

const servicios = [
  {
    titulo: "ENTRENAMIENTO FITNESS",
    descripcion: [
      "1000m2 de sala de fitness con más de 100 puestos de entrenamiento",
      "Equipos de cardio y fuerza BH",
      "Zona de Cross Training",
      "Zona de Peso Libre",
      "Zona de Cardio",
      "Área estiramientos"
    ]
  },
  {
    titulo: "ACTIVIDADES DIRIGIDAS",
    descripcion: [
      "3 Salas de clases dirigidas",
      "Más de 80h de actividades/semana",
      "Clases para todos los niveles",
      "Especial clases wellness/salud",
      "Clases Virtuales"
    ]
  },
  {
    titulo: "ENTRENAMIENTO PERSONAL",
    descripcion: [
      "Entrenamiento Personal con personal altamente cualificado",
      "Bioimpedancia incluida",
      "Entrenamiento específico incluido",
      "Mensualidad de gimnasio incluida",
      "Asesoramiento nutricional incluido",
      "Amplia disponibilidad horario"
    ]
  },
  {
    titulo: "PROGRAMAS PREMIUM",
    descripcion: [
      "Entrevista inicial con tu entrenador",
      "Bioimpedancia y seguimiento cada 21 días",
      "Entrenamiento específico cada 21 días",
      "APP Trainingym"
    ]
  },
  {
    titulo: "ASESORAMIENTO NUTRICIONAL",
    descripcion: [
      "Asesoramiento nutricional",
      "Aprende a comer de forma saludable",
      "Bioimpedancia y estudio incluido",
      "Menú semanal incluido"
    ]
  },
  {
    titulo: "APP TRAININGYM",
    descripcion: [
      "APP exclusiva para usuarios premium",
      "Entrenamiento completamente guiado",
      "Ve los resultados de tus pesajes",
      "Comprueba tu evolución",
      "Consulta el horario de actividades"
    ]
  },
  {
    titulo: "PARKING GRATUITO",
    descripcion: ["Gran superficie para aparcar", "Totalmente gratis"]
  },
  {
    titulo: "SUPLEMENTACIÓN DEPORTIVA",
    descripcion: [
      "Amplia variedad de suplementos",
      "Asesoramiento de suplementación",
      "Pedidos personalizados"
    ]
  }
];

// Variantes para el título
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Variantes para el grid: retrasa 0.5s antes de animar los ítems
const gridVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.15
    }
  }
};

// Variantes para cada tarjeta
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Servicios() {
  const [showCards, setShowCards] = useState(false);

  return (
    <section id="servicios" className="relative pt-4 pb-20 bg-gradient-to-b from-white to-blue-50">
      <div className="relative max-w-6xl mx-auto z-10 px-4">
        {/* Título animado al entrar en view */}
<motion.h2
  className={`
    font-extrabold text-center mb-12 tracking-tight
    text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
    text-gray-800
    leading-tight
    w-full
    whitespace-normal
  `}
  style={{ letterSpacing: "-0.01em", lineHeight: "1.08" }}
  variants={titleVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
  onViewportEnter={() => setShowCards(true)}
>
  NUESTROS <span className="text-blue-600">SERVICIOS</span>
</motion.h2>

        {/* Grid de tarjetas: disparar animación 0.5s tras el título */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate={showCards ? "show" : "hidden"}
        >
          {servicios.map((serv, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-xl text-left max-w-xs mx-auto lg:mx-0 w-full"
              variants={itemVariants}
            >
              <span className="block text-2xl font-extrabold text-blue-400 mb-1 font-mono opacity-80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block font-bold mb-2 text-gray-800 text-lg">
                {serv.titulo}
              </span>
              <ul className="text-sm text-blue-600 font-medium space-y-1 pl-4 list-disc">
                {serv.descripcion.map((desc, j) => (
                  <li key={j} className="leading-snug">
                    {desc}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
