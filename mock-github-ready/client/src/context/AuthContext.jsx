import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Validate session on mount
  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await api.getMe();
          if (res.user) {
            setUser(res.user);
            localStorage.setItem('user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Session verification error:', err.message);
          logout();
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const changePassword = async (passwords) => {
    return await api.changePassword(passwords);
  };

  const loginAsDemoAdmin = async () => {
    return await login('admin@mockinterview.pro', 'Admin@12345');
  };

  const loginAsDemoCandidate = async () => {
    return await login('candidate@mockinterview.pro', 'Candidate@12345');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        login,
        register,
        logout,
        changePassword,
        loginAsDemoAdmin,
        loginAsDemoCandidate,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
