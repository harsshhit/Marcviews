import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response.data.user) {
          // Map _id to id for frontend consistency
          const userData = {
            ...response.data.user,
            id: response.data.user._id,
          };
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    // Map _id to id for frontend consistency
    const userData = {
      ...response.data.user,
      id: response.data.user._id,
    };
    setUser(userData);
    setIsAuthenticated(true);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authService.register({ name, email, password });
    // Map _id to id for frontend consistency
    const userData = {
      ...response.data.user,
      id: response.data.user._id,
    };
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
