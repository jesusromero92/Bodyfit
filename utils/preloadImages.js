// src/utils/preloadImages.js

const imagesToPreload = [
  "/galeria/inicio/background.jpeg",
  "/galeria/actividades/actividades_background.jpg",
  "/galeria/servicios/servicios2.jpg",
  "/galeria/horario/horario2.png",
  "/galeria/tarifas/fondo_tarifas.jpg",
  // agrega aquí todas las rutas relativas de las imágenes que quieres precargar
];

export function preloadImages() {
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}