import { useContext, createContext, useState, useEffect } from "react";
import api from "../axios/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bootstraps auth on page refresh
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/refresh-token"); // cookie auto sent
      //console.log("Response refresh token in auth req", res);
      localStorage.setItem("accessToken", res.data.accessToken);
      if (res.data.userData.id) {
        setUser(res.data.userData);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
    useEffect(() => {
    //console.log("User after logging put",user);
  }, [user]);

  const login = (response) => {
    // console.log("User login in", response);
    localStorage.setItem("accessToken", response.data.accessToken);
    setUser(response.data.user);
  };

  const register = (response) =>{
    localStorage.setItem("accessToken", response.data.accessToken);
    setUser(response.data.user);
  }

  const logout = async () => {
    const { data } = await api.post("/auth/logout"); // backend clears cookie
    //console.log("LOGOUT",data)
    localStorage.removeItem("accessToken");
    setUser(null);
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
