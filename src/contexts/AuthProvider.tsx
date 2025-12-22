"use client";

import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { User } from '@/lib/types';
import { getUserById } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string, role?: 'Customer' | 'Seller' | 'Admin') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('loggedInUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
      sessionStorage.removeItem('loggedInUser');
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, pass: string, role?: 'Customer' | 'Seller' | 'Admin'): Promise<boolean> => {
    setLoading(true);
    // In a real app, you'd call Firebase Auth. This is a mock.
    // We're ignoring the password for this demo.
    console.log(`Attempting login for: ${email}, with password: ${pass}`);
    
    let loggedInUser: User | undefined;

    // Hardcoded special users
    if (email === 'admin@example.com') {
      loggedInUser = getUserById('admin-1');
    } else if (email === 'alice@example.com') {
      loggedInUser = getUserById('user-1');
    } else if (email === 'contact@farmfresh.com') {
        loggedInUser = getUserById('seller-1');
    } else if (email === 'hello@artisanbakery.com') {
        loggedInUser = getUserById('seller-2');
    }
    else {
        // Simple mock for any other user
        const storedUser = sessionStorage.getItem('user-' + email);
        if(storedUser) loggedInUser = JSON.parse(storedUser);
    }
    
    if (loggedInUser && (!role || loggedInUser.role === role)) {
      setUser(loggedInUser);
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  }, []);

  const signup = useCallback(async (name: string, email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    console.log(`Signing up ${name} with email ${email} and password ${pass}`);
    
    const newUser: User = {
        id: `user-${email}`,
        name,
        email,
        role: 'Customer', // All signups are Customers by default
    }
    sessionStorage.setItem('user-' + email, JSON.stringify(newUser));
    
    // Automatically log in user after signup
    setUser(newUser);
    sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));

    setLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('loggedInUser');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
