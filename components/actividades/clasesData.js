// src/data/clasesData.js

import cicloImg from "../../galeria/actividades/ciclo.jpg";
import powerImg from "../../galeria/actividades/power.jpg";
import pilatesImg from "../../galeria/actividades/pilates.jpg";
import zumbaImg from "../../galeria/actividades/zumba.jpg";
import hiitImg from "../../galeria/actividades/hit.jpg";
import crossImg from "../../galeria/actividades/cross.jpg";
import cardioImg from "../../galeria/actividades/cardiotono.jpg";
import espaldaImg from "../../galeria/actividades/espaldasana.png";

export const clases = [
  {
    titulo: "CICLO INDOOR",
    intensidad: "Media/alta (adaptable)",
    duracion: "45min",
    calorias: "500-700 Kcal",
    descripcion:
      "Clases colectivas de bicicleta indoor con música, diseñadas para mejorar resistencia cardiovascular y quemar calorías. Ejercicio adaptado para todos los niveles.",
    imagen: cicloImg,
  },
  {
    titulo: "POWER",
    intensidad: "Media/alta (adaptable)",
    duracion: "50min",
    calorias: "300-500 Kcal",
    descripcion:
      "Entrenamiento con barra y discos al ritmo de la música. Mejora fuerza, tonificación y resistencia general.",
    imagen: powerImg,
  },
  {
    titulo: "PILATES",
    intensidad: "Media/baja (adaptable)",
    duracion: "50min",
    calorias: "200-300 Kcal",
    descripcion:
      "Clases orientadas a la mejora de la flexibilidad, postura, fuerza y control corporal mediante ejercicios de suelo.",
    imagen: pilatesImg,
  },
  {
    titulo: "ZUMBA",
    intensidad: "Media (adaptable)",
    duracion: "50min",
    calorias: "300-500 Kcal",
    descripcion:
      "Sesiones de baile con música latina. Ideal para quemar calorías de forma divertida y mejorar la coordinación.",
    imagen: zumbaImg,
  },
  {
    titulo: "HIIT",
    intensidad: "Alta (adaptable)",
    duracion: "30min",
    calorias: "300-400 Kcal",
    descripcion:
      "Entrenamiento interválico de alta intensidad. Mezcla ejercicios funcionales para quemar muchas calorías en poco tiempo.",
    imagen: hiitImg,
  },
  {
    titulo: "CROSS TRAINING",
    intensidad: "Alta (adaptable)",
    duracion: "45min",
    calorias: "500-700 Kcal",
    descripcion:
      "Sesiones variadas basadas en ejercicios funcionales, fuerza, resistencia y circuitos.",
    imagen: crossImg,
  },
  {
    titulo: "CARDIOTONO",
    intensidad: "Media (adaptable)",
    duracion: "45min",
    calorias: "250-400 Kcal",
    descripcion:
      "Clases para mejorar la capacidad aeróbica y tonificar, combinando ejercicios cardiovasculares y de fuerza.",
    imagen: cardioImg,
  },
  {
    titulo: "ESPALDA SANA",
    intensidad: "Baja",
    duracion: "40min",
    calorias: "100-200 Kcal",
    descripcion:
      "Ejercicios de movilidad y fortalecimiento específicos para la salud de la espalda y la postura.",
    imagen: espaldaImg,
  },
];
