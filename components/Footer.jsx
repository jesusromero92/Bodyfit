import React from "react";

export default function Footer() {
  return (
    <>
      <style>
        {`
          .footer-dev-mobile { display: none; }
          .footer-dev-desktop { display: flex; }
          @media (max-width: 1109px) {
            .footer-content {
              flex-direction: column !important;
              align-items: center !important;
              gap: 0.7rem !important;
              text-align: center;
            }
            .footer-section {
              width: 100% !important;
              justify-content: center !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
              text-align: center !important;
              margin-bottom: 0.3rem;
            }
            .footer-redes {
              justify-content: center !important;
              gap: 1.2rem !important;
              margin-bottom: 0.3rem;
            }
            .footer-dev-mobile { 
              display: flex !important; 
              justify-content: center; 
              align-items: center; 
              width: 100%; 
              margin-top: 1rem; 
              gap: 0.5rem;
            }
            .footer-dev-desktop { display: none !important; }
          }
        `}
      </style>
      <footer className="bg-blue-900 text-white py-4">
        <div className="footer-content max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-evenly gap-4">
          {/* IZQUIERDA */}
          <div className="footer-section text-center md:text-left text-xs md:text-sm flex-shrink-0 mx-4">
            © {new Date().getFullYear()} Bodyfit Center · Todos los derechos reservados
          </div>
          {/* CENTRO: ENLACE LEGAL */}
          <div className="footer-section flex flex-wrap gap-4 justify-center text-xs md:text-sm flex-shrink-0 mx-4">
            <a
              href="/aviso-legal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-blue-400 transition duration-300"
            >
              Aviso legal, Política de privacidad y Cookies
            </a>
          </div>
          {/* DERECHA: REDES O CONTACTO */}
          <div className="footer-section footer-redes flex items-center space-x-6 justify-end flex-shrink-0 text-white text-xs md:text-sm whitespace-nowrap mx-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bodyfitcenteralavera/"
              className="hover:text-blue-400 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 1 1-4.73-4.73" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:bodyfitcenter@gmail.com"
              className="hover:text-blue-400 transition duration-300"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            {/* Ubicación */}
            <a
              href="https://www.google.es/maps/place/BODYFIT+CENTER/@37.3520237,-6.024976,18z/data=!4m16!1m9!3m8!1s0xd126da9f9f3e6dd:0x9560b0997c6aa650!2sBODYFIT+CENTER!8m2!3d37.351996!4d-6.024976!9m1!1b1!16s%2Fg%2F11clvyf09g!3m5!1s0xd126da9f9e6dd:0x9560b0997c6aa650!8m2!3d37.351996!4d-6.024976!16s%2Fg%2F11clvyf09g?hl=es&entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
              className="hover:text-blue-400 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ubicación"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
            </a>
          </div>
          {/* Texto desarrollador SOLO escritorio */}
          <div className="footer-dev-desktop flex items-center gap-1 text-blue-400 font-semibold select-none mx-4 whitespace-nowrap flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
              <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span>Jesus Romero</span>
          </div>
        </div>
        {/* Texto desarrollador SOLO móvil, abajo centrado */}
        <div className="footer-dev-mobile text-blue-400 font-semibold select-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>Jesus Romero</span>
        </div>
      </footer>
    </>
  );
}
