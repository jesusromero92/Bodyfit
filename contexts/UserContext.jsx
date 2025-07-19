import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerUsuarioDesdeToken } from "../utils/jwt";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showClientArea, setShowClientArea] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = obtenerUsuarioDesdeToken(token);

      if (!userData) {
        // Si el token ha expirado o es inválido
        localStorage.removeItem("token");
        setUser(null);
        setShowClientArea(false);
        navigate("/login?sessionExpired=true"); // Redirigimos al login con el parámetro 'sessionExpired=true'
      } else {
        setUser(userData);
        setShowClientArea(true);
      }
    } else {
      setUser(null);
      setShowClientArea(false);
    }
  }, [navigate]);

  // Llama a esta función cuando detectes un cambio en el token
  const updateToken = (newToken) => {
    const userData = obtenerUsuarioDesdeToken(newToken);
    if (userData) {
      setUser(userData);
      localStorage.setItem("token", newToken); // Asegúrate de actualizar el localStorage
    } else {
      localStorage.removeItem("token"); // Si el nuevo token no es válido
      setUser(null);
      setShowClientArea(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, showClientArea, setShowClientArea, updateToken }}>
      {children}
    </UserContext.Provider>
  );
}
