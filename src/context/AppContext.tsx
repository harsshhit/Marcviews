import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  type: "success" | "error";
  message: string;
}

interface AppContextType {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (notification: Notification) => {
    setNotification(notification);
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <AppContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
