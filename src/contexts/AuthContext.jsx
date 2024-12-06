import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    
    localStorage.setItem('jwt', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem('jwt');
  };

  useEffect(() => {
    if (token) {
      // Fetch user details if token is available
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
