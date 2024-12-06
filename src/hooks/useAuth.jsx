import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // States for user and token
  const [user, setUserState] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setTokenState] = useState(() => localStorage.getItem("token"));

  // Function to set user and token both locally and in localStorage
  const setUser = ({ user, token }) => {
    setUserState(user);
    setTokenState(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  // Function to clear user data and logout
  const logout = () => {
    setUserState(null);
    setTokenState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Login function
  const login = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const { user, token } = result;
        setUser({ user, token });
        return result; // For optional chaining after calling login
      } else {
        const error = await response.json();
        throw new Error(error.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Register function
  const register = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const { user, token } = result;
        setUser({ user, token });
        return result; // For optional chaining after calling register
      } else {
        const error = await response.json();
        throw new Error(error.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  // Persist user and token state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) setUserState(JSON.parse(savedUser));
    if (savedToken) setTokenState(savedToken);
  }, []);

  // Provide all auth-related functions and states
  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
