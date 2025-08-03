"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import React from "react"; // Added missing import

interface AdminUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AdminUser | null;
  login: (user: AdminUser) => void;
  logout: () => void; // Add logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  // Check for token on mount
  React.useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      // You may want to decode token for user info, here we just set a dummy user
      setUser({ name: 'Admin', email: 'admin@example.com' });
    }
  }, []);

  const login = (userData: AdminUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}





