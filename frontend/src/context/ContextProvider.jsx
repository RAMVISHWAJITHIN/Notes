// context/contextProvider.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

export default ContextProvider;
