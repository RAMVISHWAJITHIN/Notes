import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') {
        localStorage.removeItem('token');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.log('Verification failed:', error.response?.data?.message || error.message);
        setUser(null);
        localStorage.removeItem('token');
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
      toast.success(`${user?.name || 'User'} logged out successfully`);
    setUser(null);
    localStorage.removeItem('token');
     
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default ContextProvider;


