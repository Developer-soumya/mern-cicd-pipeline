import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check whether a user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();

        setUser(response.data.user);
      } catch (error) {
        logoutUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (userData) => {
    const response = await loginUser(userData);

    localStorage.setItem("token", response.data.token);

    setUser(response.data.user);

    return response;
  };

  // Register
  const register = async (userData) => {
    const response = await registerUser(userData);

    localStorage.setItem("token", response.data.token);

    setUser(response.data.user);

    return response;
  };

  // Logout
  const logout = () => {
    logoutUser();
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

export const useAuth = () => {
  return useContext(AuthContext);
};
