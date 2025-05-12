import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    token: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user data that can be called from anywhere
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch user data from the server
      const response = await authService.getCurrentUser();
      if (response.data && response.data.user) {
        const userData: User = {
          id: response.data.user._id || response.data.user.id || '',
          name: response.data.user.name,
          email: response.data.user.email,
          createdAt: response.data.user.createdAt,
        };
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // If no user data is returned, clear the token
        localStorage.removeItem("token");
        localStorage.removeItem("rememberMe");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If there's an error (like expired token), clear the token
      localStorage.removeItem("token");
      localStorage.removeItem("rememberMe");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password, rememberMe });
      if (response.data && response.data.user) {
        const userData: User = {
          id: response.data.user._id || response.data.user.id || '',
          name: response.data.user.name,
          email: response.data.user.email,
          createdAt: response.data.user.createdAt,
        };
        setUser(userData);
        setIsAuthenticated(true);
        if (response.token) {
          localStorage.setItem("token", response.token);
          if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberMe");
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setIsLoading(true);
    try {
      const response = await authService.register({
        name,
        email,
        password,
        confirmPassword,
      });
      if (response.data && response.data.user) {
        const userData: User = {
          id: response.data.user._id || response.data.user.id || '',
          name: response.data.user.name,
          email: response.data.user.email,
          createdAt: response.data.user.createdAt,
        };
        setUser(userData);
        setIsAuthenticated(true);
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred during password reset request");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string
  ) => {
    setIsLoading(true);
    try {
      await authService.resetPassword({ token, password, confirmPassword });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred during password reset");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rememberMe");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    refreshUserData: fetchUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
