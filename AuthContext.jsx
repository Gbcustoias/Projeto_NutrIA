import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    loadUser();
  }, [token]);

  async function login(email, password) {
    setAuthLoading(true);

    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const accessToken = response.data.access_token;

    localStorage.setItem("token", accessToken);
    setToken(accessToken);

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const me = await api.get("/users/me");
    setUser(me.data);
    setAuthLoading(false);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider
      value={{ user, token, authLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}