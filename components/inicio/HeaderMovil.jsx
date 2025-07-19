import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../galeria/inicio/logo_bodyfit2.png";
import { useUser } from "../../contexts/UserContext.jsx";

const menuItems = [
  { name: "Inicio", to: "/" },
  { name: "Actividades", to: "/actividades" },
  { name: "Servicios", to: "/servicios" },
  { name: "Horarios", to: "/horario" },
  { name: "Tarifas", to: "/tarifas" },
  { name: "Contacto", to: "/contacto" },
  { name: "Normativa", to: "/normativa" },
];

const clientMenuItems = [
  { name: "Mi perfil", to: "/perfil" },
  { name: "Planes", to: "/planes" },
];

export default function HeaderMovil() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user, setUser, showClientArea, setShowClientArea } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [identificateOpen, setIdentificateOpen] = useState(false);
  const identificateRef = useRef(null);
  const [identificateWidth, setIdentificateWidth] = useState(undefined);

  const [clientAreaOpen, setClientAreaOpen] = useState(false);
  const clientAreaRef = useRef(null);
  const [clientAreaWidth, setClientAreaWidth] = useState(undefined);

  // Ajusta ancho dropdown "Identifícate"
  useEffect(() => {
    if (identificateOpen && identificateRef.current) {
      setIdentificateWidth(identificateRef.current.offsetWidth);
    }
  }, [identificateOpen]);

  // Ajusta ancho dropdown "Área cliente"
  useEffect(() => {
    if (clientAreaOpen && clientAreaRef.current) {
      setClientAreaWidth(clientAreaRef.current.offsetWidth);
    }
  }, [clientAreaOpen]);

  // Cierra dropdowns al click fuera
  useEffect(() => {
    if (!identificateOpen) return;
    const handler = (e) => {
      if (!e.target.closest(".identificate-dropdown")) setIdentificateOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [identificateOpen]);

  useEffect(() => {
    if (!clientAreaOpen) return;
    const handler = (e) => {
      if (!e.target.closest(".clientarea-dropdown")) setClientAreaOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [clientAreaOpen]);

  // Controlar showClientArea según ruta y usuario, incluir /checkout
  useEffect(() => {
    if (!user) {
      setShowClientArea(false);
      return;
    }

    if (
      location.pathname === "/perfil" ||
      location.pathname === "/planes" ||
      location.pathname === "/checkout"
    ) {
      setShowClientArea(true);
    } else {
      setShowClientArea(false);
      setClientAreaOpen(false);
    }
  }, [user, location.pathname, setShowClientArea]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setShowClientArea(false);
    setClientAreaOpen(false);
    setIdentificateOpen(false);
    setDrawerOpen(false);
    navigate("/");
  };

  return (
    <header className="header-xl:hidden w-full bg-white/80 shadow backdrop-blur-sm fixed top-0 left-0 z-50 flex items-center justify-between h-14 px-4">
      <Link to="/" className="flex-none">
        <img src={logo} alt="Bodyfit" className="h-10" />
      </Link>

      {/* Botón hamburguesa */}
      <button
        className="text-blue-600 focus:outline-none"
        onClick={() => setDrawerOpen((o) => !o)}
        aria-label="Abrir menú"
      >
        {drawerOpen ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="transition-transform duration-200 transform rotate-90"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </motion.svg>
        ) : (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="transition-transform duration-200"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
          </motion.svg>
        )}
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-x-0 top-14 bg-white/90 backdrop-blur-md shadow-xl z-40 flex flex-col p-6 space-y-4 rounded-b-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Menú principal o área cliente */}
            {( !user || !showClientArea ? menuItems : clientMenuItems ).map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ delay: 0.05 * index, type: "tween", duration: 0.3 }}
              >
                <Link
                  to={item.to}
                  className={`block text-lg font-medium py-2 px-4 rounded hover:bg-blue-50 transition-colors ${
                    isActive(item.to) ? "bg-blue-100 text-blue-700" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setDrawerOpen(false);
                    setIdentificateOpen(false);
                    setClientAreaOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Opciones usuario */}
            {!user ? (
              <div className="relative identificate-dropdown mt-2">
                <button
                  ref={identificateRef}
                  className="flex items-center justify-center w-full gap-2 bg-blue-600 text-white rounded-xl shadow font-semibold hover:bg-blue-700 transition-colors py-2"
                  onClick={() => setIdentificateOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={identificateOpen}
                >
                  Identifícate
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {identificateOpen && (
                  <div
                    style={{ width: identificateWidth }}
                    className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-2 ring-1 ring-black/10 z-50"
                  >
                    <Link
                      to="/login"
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-50 text-center"
                      onClick={() => {
                        setIdentificateOpen(false);
                        setDrawerOpen(false);
                      }}
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/registro"
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-50 text-center"
                      onClick={() => {
                        setIdentificateOpen(false);
                        setDrawerOpen(false);
                      }}
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              showClientArea && (
                <div className="relative clientarea-dropdown mt-2">
                  <button
                    ref={clientAreaRef}
                    className="flex items-center justify-center w-full gap-2 bg-red-500 text-white rounded-xl shadow font-semibold hover:bg-red-600 transition-colors py-2"
                    onClick={() => setClientAreaOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={clientAreaOpen}
                  >
                    Área cliente
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {clientAreaOpen && (
                    <div
                      style={{ width: clientAreaWidth }}
                      className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-2 ring-1 ring-black/10 z-50"
                    >
                      <button
                        className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-50 text-left"
                        onClick={() => {
                          setShowClientArea(false);
                          setClientAreaOpen(false);
                          setDrawerOpen(false);
                          navigate("/");
                        }}
                      >
                        Salir área cliente
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left border-t border-red-100 font-semibold"
                        onClick={() => {
                          handleLogout();
                          setClientAreaOpen(false);
                          setDrawerOpen(false);
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              )
            )}

            {/* Botón acceder área cliente si usuario logueado pero no en área cliente */}
            {user && !showClientArea && (
              <button
                className="mt-4 bg-blue-600 text-white w-full rounded-xl py-3 font-bold shadow hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setShowClientArea(true);
                  setDrawerOpen(false);
                  navigate("/perfil");
                }}
              >
                Acceder al área cliente
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
