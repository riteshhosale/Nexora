import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../api/authApi";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await getCurrentUser();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    const { data } = await loginUser(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const { data } = await registerUser(userData);
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;