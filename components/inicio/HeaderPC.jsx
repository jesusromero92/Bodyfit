import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

export default function HeaderPC() {
  const { user, setUser, showClientArea, setShowClientArea } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(undefined);

  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [loginDropdownWidth, setLoginDropdownWidth] = useState(undefined);

  const areaButtonRef = useRef(null);
  const loginButtonRef = useRef(null);

  // Ajusta el ancho de dropdowns según botón
  useEffect(() => {
    if (dropdownOpen && areaButtonRef.current) {
      setDropdownWidth(areaButtonRef.current.offsetWidth);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (loginDropdownOpen && loginButtonRef.current) {
      setLoginDropdownWidth(loginButtonRef.current.offsetWidth);
    }
  }, [loginDropdownOpen]);

  // Cierra dropdown si clic fuera
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (!e.target.closest(".clientarea-dropdown")) setDropdownOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!loginDropdownOpen) return;
    const handler = (e) => {
      if (!e.target.closest(".user-dropdown")) setLoginDropdownOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [loginDropdownOpen]);

  // Controlar showClientArea según ruta y usuario
  useEffect(() => {
    if (!user) {
      setShowClientArea(false);
      return;
    }

    // Mostrar área cliente en /perfil, /planes o /checkout
    if (
      location.pathname === "/perfil" ||
      location.pathname === "/planes" ||
      location.pathname === "/checkout"
    ) {
      setShowClientArea(true);
    } else {
      setShowClientArea(false);
      setDropdownOpen(false);
    }
  }, [user, location.pathname, setShowClientArea]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setShowClientArea(false);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="hidden header-xl:flex w-full bg-white/80 shadow backdrop-blur-sm fixed top-0 left-0 z-50 items-center justify-between h-14 px-4">
      {/* Logo */}
      <Link to="/" className="flex-none">
        <img src={logo} alt="Bodyfit" className="h-10" />
      </Link>

      {/* NAV CENTRAL */}
      <nav className="flex absolute left-1/2 transform -translate-x-1/2 space-x-6 overflow-x-auto whitespace-nowrap px-2 no-scrollbar max-w-[90vw] items-center">
        {/* Normal (no user o no área cliente) */}
        {(!user || (user && !showClientArea)) &&
          menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`relative px-1 text-gray-700 hover:text-blue-600 transition-colors border-b-2
                ${isActive(item.to)
                  ? "text-blue-700 font-semibold border-blue-600"
                  : "border-transparent font-semibold"
                }`}
            >
              {item.name}
            </Link>
          ))
        }
        {/* Área cliente activa */}
        {user && showClientArea &&
          clientMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`relative px-2 text-gray-700 hover:text-blue-600 transition-colors border-b-2 text-lg
                ${isActive(item.to)
                  ? "text-blue-700 font-semibold border-blue-600"
                  : "border-transparent font-semibold"
                }`}
            >
              {item.name}
            </Link>
          ))
        }
      </nav>

      {/* DERECHA */}
      <div>
        {/* NO user: botón identifícate con dropdown */}
        {!user && (
          <div className="relative user-dropdown">
            <button
              ref={loginButtonRef}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-xl shadow font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => setLoginDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={loginDropdownOpen}
            >
              Identifícate
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown */}
            {loginDropdownOpen && (
              <div
                style={{ width: loginDropdownWidth }}
                className="flex-col absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-2 ring-1 ring-black/10 z-50"
              >
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-50 text-left"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-50 text-left"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        )}

        {/* SI usuario logueado y NO área cliente: botón acceder área cliente */}
        {user && !showClientArea && (
          <button
            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold shadow transition"
            onClick={() => {
              setShowClientArea(true);
              navigate("/perfil");
            }}
          >
            Acceder al área cliente
          </button>
        )}

        {/* SI usuario logueado y SÍ área cliente: botón salir área cliente con dropdown */}
        {user && showClientArea && (
          <div className="relative clientarea-dropdown inline-block">
            <button
              ref={areaButtonRef}
              className="ml-3 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-bold shadow transition flex items-center gap-2"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Área cliente
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <div
                style={{ width: dropdownWidth }}
                className="flex-col absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-2 ring-1 ring-black/10 z-50"
              >
                <button
                  className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-50 text-left"
                  onClick={() => {
                    setShowClientArea(false);
                    setDropdownOpen(false);
                    navigate("/");
                  }}
                >
                  Salir área cliente
                </button>
                <button
                  className="block w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left border-t border-red-100 font-semibold"
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
