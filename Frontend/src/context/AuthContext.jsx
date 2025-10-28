import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async (response) => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.post("http://localhost:3000/auth/google", {
        token: response.credential,
      });

      if (result.data.success) {
        const { token: jwtToken, user: userData } = result.data;
        localStorage.setItem("authToken", jwtToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(jwtToken);
        setUser(userData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
        return { success: true };
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Google login failed";
      setError(errorMsg);
      console.error("Google login error:", err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGitHub = async (code) => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.post("http://localhost:3000/auth/github", {
        code,
      });

      if (result.data.success) {
        const { token: jwtToken, user: userData } = result.data;
        localStorage.setItem("authToken", jwtToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(jwtToken);
        setUser(userData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

        return { success: true };
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "GitHub login failed";
      setError(errorMsg);
      console.error("GitHub login error:", err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        loginWithGoogle,
        loginWithGitHub,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
