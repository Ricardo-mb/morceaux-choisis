"use client";

import React, { useState, useEffect, createContext, JSX } from "react";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

  /**
   * Provider component that wraps the app and provides authentication
   * context to all components.
   *
   * Checks if there is a token in local storage and sets the
   * isAuthenticated state accordingly.
   *
   * @param {{ children: React.ReactNode }} props
   * @returns {JSX.Element}
   */
export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    console.log('Checking if there is a token in local storage');
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    setIsAuthenticated(!!token);
    console.log('isAuthenticated:', isAuthenticated);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };