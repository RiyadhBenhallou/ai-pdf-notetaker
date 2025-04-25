"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type ToastType = {
  id: string;
  title: string;
  description: string;
  variant?: "default" | "info" | "success" | "warning";
};

type ToastContextType = {
  toasts: ToastType[];
  showToast: (toast: ToastType) => void;
  hideToast: (id: string) => void;
  isVisible: (id: string) => boolean;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [dismissedToasts, setDismissedToasts] = useState<string[]>([]);

  // Load dismissed toasts from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dismissedToasts");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setDismissedToasts(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading dismissed toasts:", error);
      localStorage.setItem("dismissedToasts", JSON.stringify([]));
    }
  }, []);

  // Show a toast
  const showToast = (toast: ToastType) => {
    // Don't add if already dismissed
    if (dismissedToasts.includes(toast.id)) return;

    // Don't add if already showing
    if (toasts.some((t) => t.id === toast.id)) return;

    setToasts((prev) => [...prev, toast]);
  };

  // Hide a toast and mark as dismissed
  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

    // Save to dismissed list
    if (!dismissedToasts.includes(id)) {
      const newDismissed = [...dismissedToasts, id];
      setDismissedToasts(newDismissed);
      localStorage.setItem("dismissedToasts", JSON.stringify(newDismissed));
    }
  };

  // Check if a toast is visible
  const isVisible = (id: string) => {
    return toasts.some((toast) => toast.id === id);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast, isVisible }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
