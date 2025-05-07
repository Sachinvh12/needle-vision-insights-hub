
import { toast as sonnerToast } from "sonner";
import { ReactNode } from "react";

// Define types for our toast options
type ToastOptions = {
  closeButton?: boolean;
  [key: string]: any;
};

// Create properly typed toast methods
export const toast = {
  success: (message: string, options: ToastOptions = {}) => 
    sonnerToast.success(message, { closeButton: true, ...options }),
  error: (message: string, options: ToastOptions = {}) => 
    sonnerToast.error(message, { closeButton: true, ...options }),
  info: (message: string, options: ToastOptions = {}) => 
    sonnerToast.info(message, { closeButton: true, ...options }),
  warning: (message: string, options: ToastOptions = {}) => 
    sonnerToast.warning(message, { closeButton: true, ...options }),
  custom: (message: ReactNode, options: ToastOptions = {}) => 
    sonnerToast(message, { closeButton: true, ...options }),
  // Adding direct access to the toast function for compatibility
  toast: (message: ReactNode, options: ToastOptions = {}) => 
    sonnerToast(message, { closeButton: true, ...options }),
};

// Export the useToast hook for consistent usage across the app
export const useToast = () => {
  return toast;
};
