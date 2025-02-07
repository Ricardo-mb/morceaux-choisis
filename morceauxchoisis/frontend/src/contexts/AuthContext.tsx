"use client";


import { useRouter } from "next/navigation";
import React from "react";
import { createContext, useState, useEffect, Dispatch, SetStateAction,useCallback } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
}
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: any;
  isAdmin: boolean;
  loading: boolean;
  login: (token: string, userData: any) => Promise<void>;
  register: (token: string, userData: any) => Promise<{ success: boolean; token: string; user: any }>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  isAdmin: false,
  loading: false,
  login: async () => {},
  register: async () => ({ success: false, token: '', user: null }),
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const isAdmin = user?.isAdmin || false;


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

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  }, [router]);


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
      isAdmin,
      loading: false,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};