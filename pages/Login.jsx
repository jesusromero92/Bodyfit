import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User as UserIcon } from "lucide-react"; // Nuevo ícono de usuario para iniciar sesión
import config from "../config";

// EyeIcon igual que siempre:
function EyeIcon({ open }) {
  return open ? (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2"
      viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.03-10-7s4.477-7 10-7c1.229 0 2.405.225 3.475.631M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M17.94 17.94l-1.41-1.41M2.06 2.06l1.41 1.41M19.78 19.78l-1.41-1.41" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2"
      viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function decodeJWT(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    let b64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const payloadStr = atob(b64);
    return JSON.parse(payloadStr);
  } catch (err) {
    console.error("Error decoding JWT:", err);
    return null;
  }
}

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Leer el parámetro 'sessionExpired' de la URL
  const sessionExpired = new URLSearchParams(location.search).get("sessionExpired");

  // REDIRECCIÓN AUTOMÁTICA SI YA HAY TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Introduce tu correo y contraseña.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`${config.API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Correo o contraseña incorrectos.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      const payload = decodeJWT(data.token);

      if (!payload || !payload.nombre) {
        setError("No se pudo obtener el usuario desde el token.");
        setLoading(false);
        return;
      }

      const userData = {
        nombre: payload.nombre,
        primer_apellido: payload.primer_apellido,
        telefono: payload.telefono,
        email: payload.email,
      };

      setSuccess(true);
      setLoading(false);

      // ANIMACIÓN unos 1.6 segundos y luego redirige a /
      setTimeout(() => navigate("/"), 1600);

    } catch (err) {
      setError("Error de conexión al servidor.");
      setLoading(false);
    }
  };

  // Animación de éxito antes de redirigir:
  if (success) {
    return (
      <div className="bg-white min-h-[calc(100vh-6rem)] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-bounce">
            <svg width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="#22c55e" />
              <polyline
                points="30,54 45,70 72,38"
                fill="none"
                stroke="#fff"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-green-700 font-bold text-xl text-center">
            ¡Bienvenido!<br />Has iniciado sesión con éxito.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[calc(100vh-6rem)] pt-24 px-2 pb-16 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-2xl border-2 border-gray-300 shadow-xl px-8 py-10 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-1">
            <UserIcon className="w-10 h-10 text-blue-600" />
          </span>
          <h1 className="text-2xl font-bold text-gray-800">Iniciar sesión</h1>
          <p className="text-gray-500 text-sm">Accede con tu cuenta de Bodyfit</p>
        </div>

        {/* Mostrar el mensaje si sessionExpired es verdadero */}
        {sessionExpired === "true" && (
          <div className="text-red-600 text-sm rounded-xl bg-red-50 px-3 py-2 mb-4">
            Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
              placeholder="tu@email.com"
              autoComplete="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none pr-10"
                placeholder="Tu contraseña"
                autoComplete="current-password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                disabled={loading}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1.5 p-1 rounded hover:bg-gray-100 transition"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                disabled={loading}
              >
                <EyeIcon open={showPwd} />
              </button>
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm rounded-xl bg-red-50 px-3 py-2">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            Iniciar sesión
          </button>
        </form>
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
          <Link to="/registro" className="text-blue-600 hover:underline font-semibold">¿No tienes cuenta? Regístrate</Link>
        </div>
      </div>
    </div>
  );
}
