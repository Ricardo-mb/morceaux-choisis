"use client";


import { useRouter } from "next/navigation";
import React from "react";
import { createContext, useState, useEffect, Dispatch, SetStateAction,useCallback } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  role:  'ADMIN' | 'USER'| 'GUEST';  
}

interface LoginUserData {
  email: string;
  password: string;
  username: string;
  isAdmin: boolean;
  role:  'ADMIN' | 'USER'| 'GUEST';
}

interface RegisterUserData {
  email: string;
  password: string;
  username: string;
  isAdmin: boolean;
  role:  'ADMIN' | 'USER'| 'GUEST';
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (token: string, userData: any) => Promise<void>;
  register: (token: string, userData: any) => Promise<{ success: boolean; token: string; user: any }>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setIsAdmin: () => {},
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  // const isAdmin = user?.isAdmin || false;



const login = async (token: string, userData: LoginUserData): Promise<void> => {
  localStorage.setItem('token', token);
  localStorage.setItem('isAdmin', String(userData.isAdmin));
  localStorage.setItem('role', userData.role);
  setIsAuthenticated(true);
  setIsAdmin(userData.isAdmin);
  setUser(userData);
};


  // const login = async (token: string, userData: any) => {
  //   const user = {...userData, isAdmin: userData.role === 'admin' || userData.role === 'ADMIN'};
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('user', JSON.stringify(user)); 
  //   setIsAuthenticated(true);
  //   setUser(user);
  //   setIsAdmin(user.isAdmin);
  // };

  const register = async (token: string, userData: RegisterUserData): Promise<{ success: boolean; token: string; user: any }> => {
    const user = {...userData, isAdmin: userData.role === 'ADMIN'};
    console.log("USER from context", user);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', user.role);   
    setIsAuthenticated(true);
    setUser(user);
    setIsAdmin(user.isAdmin);
    return {success : true, token, user};

  }

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  }, [router]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    setIsAuthenticated(!!token);
    setUser(userData);
    if (userData) {
      setIsAdmin(userData.isAdmin);
    }else{
      setIsAdmin(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated,
      setIsAdmin,
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