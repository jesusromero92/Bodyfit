import React, { useState } from "react";

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3200);
    setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <div className="bg-white min-h-screen pt-24 px-2 pb-16 flex flex-col items-center">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center mb-4">
        <span className="text-gray-900">Contácta</span>
        <span className="text-blue-600">nos</span>
      </h1>
      <p className="mb-8 text-gray-500 text-center max-w-2xl">
        ¡No dudes en contactarnos! Envíanos tus dudas o sugerencias y te responderemos lo antes posible.
      </p>
      {/* Tarjetas de info */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Dirección */}
        <div className="flex flex-col items-center justify-center rounded-xl bg-blue-700 text-white p-7 shadow-lg">
          <span className="mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
              <circle cx="12" cy="11" r="2.5" />
            </svg>
          </span>
          <div className="font-semibold text-lg mb-1">Dirección</div>
          <div className="text-base font-normal text-white/90 text-center">
            Parque Comercial Alavera, Local 2, manzana 4<br />
            San Juan de Aznalfarache, Sevilla, 41920
          </div>
        </div>
        {/* Teléfono */}
        <div className="flex flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-800 p-7 shadow-md">
          <span className="mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2A19.72 19.72 0 013 5.09 2 2 0 015 3h3a2 2 0 012 1.72c.13.93.52 1.81 1.13 2.42l2.24 2.24a2 2 0 010 2.83l-1.42 1.42a16 16 0 006.38 6.38l1.42-1.42a2 2 0 012.83 0l2.24 2.24c.61.61 1.5 1 2.42 1.13A2 2 0 0122 16.92z" />
            </svg>
          </span>
          <div className="font-semibold text-lg mb-1">Teléfono</div>
          <a href="tel:610117752" className="text-base text-blue-700 hover:underline font-medium">
            610 117 752
          </a>
        </div>
        {/* Email */}
        <div className="flex flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-800 p-7 shadow-md">
          <span className="mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8zm0 0l-9 6-9-6" />
            </svg>
          </span>
          <div className="font-semibold text-lg mb-1">Email</div>
          <a href="mailto:bodyfitcenter@gmail.com" className="text-base text-blue-700 hover:underline font-medium">
            bodyfitcenter@gmail.com
          </a>
        </div>
      </div>

      {/* Mapa y formulario */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mapa */}
        <div className="rounded-xl overflow-hidden shadow-lg min-h-[350px]">
          <iframe
            title="Ubicación Bodyfit Center"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.408435941068!2d-6.024976!3d37.351996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126da9f9f3e6dd%3A0x9560b0997c6aa650!2sBODYFIT%20CENTER!5e0!3m2!1ses!2ses!4v1718716062977!5m2!1ses!2ses"
            width="100%"
            height="100%"
            style={{ minHeight: 350, border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* Formulario */}
        <form
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-800" htmlFor="nombre">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              name="nombre"
              type="text"
              required
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-800" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Tu email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-800" htmlFor="telefono">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              name="telefono"
              type="tel"
              required
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-800" htmlFor="mensaje">
              Mensaje <span className="text-red-500">*</span>
            </label>
            <textarea
              name="mensaje"
              required
              placeholder="¿En qué podemos ayudarte?"
              value={form.mensaje}
              onChange={handleChange}
              rows={3}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg rounded py-2 transition"
            disabled={enviado}
          >
            {enviado ? "¡Enviado!" : "Enviar"}
          </button>
          {enviado && (
            <div className="text-green-600 text-center font-medium animate-pulse">
              ¡Tu mensaje ha sido enviado!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
