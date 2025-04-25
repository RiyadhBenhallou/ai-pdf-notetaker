"use client";
import { useToast } from "@/contexts/toast-context";
import { X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlobalToastContainer() {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

type ToastItemProps = {
  toast: {
    id: string;
    title: string;
    description: string;
    variant?: "default" | "info" | "success" | "warning";
  };
  onDismiss: () => void;
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const variantClasses = {
    default: "bg-background border-border text-foreground",
    info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
    success:
      "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
  };

  return (
    <div
      className={cn(
        "w-96 max-w-[calc(100vw-2rem)] shadow-lg rounded-lg border p-4 pointer-events-auto",
        variantClasses[toast.variant || "default"]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm">{toast.title}</h3>
            <button
              onClick={onDismiss}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </button>
          </div>
          <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {toast.description}
          </div>
          <div className="mt-3 flex justify-between items-center">
            <button
              onClick={onDismiss}
              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
