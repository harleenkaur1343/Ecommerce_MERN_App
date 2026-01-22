import { useContext, createContext, useState, useEffect } from "react";
import api from "../axios/axios.js";
import { User } from "lucide-react";

const AuthContext = createContext(); //default value

//creating the authcontext provider for

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/refresh-token");
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      setUser(null);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //functions for setting the user status
  const login = (userData, token) => {
    localStorage.setItem("accessToken", token);
    setUser(userData);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    await api.post("/auth/logout", { refreshToken });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
