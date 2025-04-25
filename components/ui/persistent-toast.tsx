"use client";

import { useState, useEffect } from "react";
import { X, Info, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersistentToastProps {
  id: string;
  title: string;
  description: string;
  variant?: "default" | "info" | "success" | "warning";
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center";
  onDismiss?: () => void;
}

export function PersistentToast({
  id,
  title,
  description,
  variant = "info",
  position = "bottom-right",
  onDismiss,
}: PersistentToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // Check if this toast has been dismissed before
  useEffect(() => {
    const checkDismissed = () => {
      const dismissedToasts = localStorage.getItem("dismissedToasts");
      if (dismissedToasts) {
        try {
          const parsedToasts = JSON.parse(dismissedToasts);
          if (Array.isArray(parsedToasts) && parsedToasts.includes(id)) {
            setIsVisible(false);
          }
        } catch (error) {
          console.log(error);
          localStorage.setItem("dismissedToasts", JSON.stringify([]));
        }
      }
    };

    // Only check once on mount
    checkDismissed();

    // Cleanup function to prevent memory leaks
    return () => {};
  }, [id]); // Empty dependency array ensures it only runs once

  const handleDismiss = () => {
    setIsVisible(false);

    // Save dismissed state to localStorage
    const dismissedToasts = localStorage.getItem("dismissedToasts");
    const parsedToasts = dismissedToasts ? JSON.parse(dismissedToasts) : [];
    parsedToasts.push(id);
    localStorage.setItem("dismissedToasts", JSON.stringify(parsedToasts));

    if (onDismiss) onDismiss();
  };

  const variantClasses = {
    default: "bg-background border-border",
    info: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
    success:
      "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
    warning:
      "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed z-[100] w-96 max-w-[calc(100vw-2rem)] shadow-lg rounded-lg border p-4 transition-all duration-300",
        variantClasses[variant]
      )}
      style={{
        // Use inline styles for positioning to ensure they take precedence
        top: position.includes("top")
          ? "1rem"
          : position === "center"
          ? "50%"
          : "auto",
        bottom: position.includes("bottom") ? "1rem" : "auto",
        left: position.includes("left")
          ? "1rem"
          : position === "center"
          ? "50%"
          : "auto",
        right: position.includes("right") ? "1rem" : "auto",
        transform: position === "center" ? "translate(-50%, -50%)" : "none",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm">{title}</h3>
            <button
              onClick={handleDismiss}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </button>
          </div>
          <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {description}
          </div>
          <div className="mt-3 flex justify-between items-center">
            <button
              onClick={handleDismiss}
              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Got it
            </button>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{currentStep + 1}/3</span>
              <button
                onClick={() => setCurrentStep((prev) => (prev + 1) % 3)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
