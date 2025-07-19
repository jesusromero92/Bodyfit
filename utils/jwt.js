export function obtenerUsuarioDesdeToken(token) {
  if (!token) return null;
  
  try {
    const payloadBase64 = token.split('.')[1];
    // Corregimos: algunos JWT usan base64url, no base64
    let payloadStr = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    // Si falla el atob original, avísame
    const payload = JSON.parse(payloadStr);
    console.log("Payload JWT decodificado:", payload); // <-- DEBUG extra
    
    // Verificación de expiración del token
    const expDate = payload.exp * 1000; // Convertir a milisegundos
    const currentDate = new Date().getTime();
    
    if (currentDate > expDate) {
      // El token ha expirado
      console.log("El token ha expirado. Cerrando sesión...");
      localStorage.clear(); // Limpiar el localStorage
      return null;
    }

    return {
      nombre: payload.nombre,
      primer_apellido: payload.primer_apellido,
      telefono: payload.telefono,
      email: payload.email,
    };
  } catch (e) {
    console.error("Error decodificando JWT:", e);
    return null;
  }
}
