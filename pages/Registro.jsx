import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import config from "../config";
import { User as UserIcon } from "lucide-react"; // Nuevo ícono de usuario para iniciar sesión

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    primer_apellido: "",
    dni: "",
    sexo: "",
    fecha_nacimiento: "",
    telefono: "",
    email: "",
    password: "",
    repeat: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Nuevo estado para animación
  const { setUser } = useUser();
  const navigate = useNavigate();

  // --- REDIRECCIÓN AUTOMÁTICA SI YA HAY TOKEN ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.nombre ||
      !form.primer_apellido ||
      !form.dni ||
      !form.sexo ||
      !form.fecha_nacimiento ||
      !form.telefono ||
      !form.email ||
      !form.password ||
      !form.repeat
    ) {
      setError("Por favor, rellena todos los campos obligatorios.");
      return;
    }
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError("Correo no válido.");
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (form.password !== form.repeat) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${config.API_BASE_URL}/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          primer_apellido: form.primer_apellido,
          dni: form.dni,
          sexo: form.sexo,
          fecha_nacimiento: form.fecha_nacimiento,
          telefono: form.telefono,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear usuario");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccess(true); // Muestra animación

      setUser({
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
      });

      // Espera 2 segundos y navega a login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Error de conexión al servidor.");
      setLoading(false);
    }
  };

  if (success) {
    // ANIMACIÓN de éxito
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
            ¡Registro correcto!<br />Redirigiendo a login...
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white min-h-[calc(100vh-6rem)] pt-24 px-2 pb-16 flex flex-col items-center">
      {/* Contenedor principal más pequeño */}
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl border-2 border-gray-300 shadow-lg">
        {/* Ícono sobre el texto de registro */}
        <div className="flex justify-center mb-4">
          <UserIcon className="w-16 h-16 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Registro Bodyfit</h2>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5"
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Nombre *</label>
              <input
                className="w-full rounded-xl border border-gray-200 py-2 px-3"
                type="text"
                value={form.nombre}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nombre: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">Primer apellido *</label>
              <input
                className="w-full rounded-xl border border-gray-200 py-2 px-3"
                type="text"
                value={form.primer_apellido}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    primer_apellido: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">DNI *</label>
            <input
              className="w-full rounded-xl border border-gray-200 py-2 px-3"
              type="text"
              value={form.dni}
              onChange={(e) =>
                setForm((f) => ({ ...f, dni: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Sexo *</label>
            <select
              className="w-full rounded-xl border border-gray-200 py-2 px-3"
              value={form.sexo}
              onChange={(e) =>
                setForm((f) => ({ ...f, sexo: e.target.value }))
              }
              required
            >
              <option value="">Selecciona sexo</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Fecha nacimiento *</label>
            <input
              className="w-full rounded-xl border border-gray-200 py-2 px-3"
              type="date"
              value={form.fecha_nacimiento}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  fecha_nacimiento: e.target.value,
                }))
              }
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Teléfono *</label>
            <input
              className="w-full rounded-xl border border-gray-200 py-2 px-3"
              type="tel"
              value={form.telefono}
              onChange={(e) =>
                setForm((f) => ({ ...f, telefono: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">E-mail *</label>
            <input
              className="w-full rounded-xl border border-gray-200 py-2 px-3"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Contraseña *</label>
            <input
              className="w-full rounded-xl border border-gray-200 py-2 px-3"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Repite contraseña *</label>
            <input
              className="w-full rounded-xl border border-gray-200 py-2 px-3"
              type="password"
              value={form.repeat}
              onChange={(e) =>
                setForm((f) => ({ ...f, repeat: e.target.value }))
              }
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-6 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
      </div>
    </section>
  );
}
