"use client";

import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: any;
  login: (token: string, userData: any) => Promise<void>;
  register: (token: string, userData: any) => Promise<{ success: boolean; token: string; user: any }>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  login: async () => {},
  register: async () => ({ success: false, token: '', user: null }),
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const login = async (token: string, userData: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const register = async (token: string, userData: any) => {
    // Assuming the registration process returns a token
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    return {success : true, token, user : userData};

  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    setIsAuthenticated(!!token);
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated,
      user,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};