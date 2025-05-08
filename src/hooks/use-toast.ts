
import { toast as sonnerToast, type ToastOptions as SonnerToastOptions } from "sonner";
import { ReactNode } from "react";

// Extend the original Sonner types with our custom options
type ExtendedToastOptions = SonnerToastOptions & {
  description?: ReactNode;
  title?: string;
};

// Type definition for our toast methods
interface ToastAPI {
  toast: (message: ReactNode, options?: ExtendedToastOptions) => string | number;
  success: (message: ReactNode, options?: ExtendedToastOptions) => string | number;
  error: (message: ReactNode, options?: ExtendedToastOptions) => string | number;
  info: (message: ReactNode, options?: ExtendedToastOptions) => string | number;
  warning: (message: ReactNode, options?: ExtendedToastOptions) => string | number;
  custom: (message: ReactNode, options?: ExtendedToastOptions) => string | number;
}

// Create properly typed toast methods
export const toast: ToastAPI = {
  success: (message, options = {}) => 
    sonnerToast.success(message, { closeButton: true, ...options }),
  error: (message, options = {}) => 
    sonnerToast.error(message, { closeButton: true, ...options }),
  info: (message, options = {}) => 
    sonnerToast.info(message, { closeButton: true, ...options }),
  warning: (message, options = {}) => 
    sonnerToast.warning(message, { closeButton: true, ...options }),
  custom: (message, options = {}) => 
    sonnerToast(message, { closeButton: true, ...options }),
  // Adding direct access to the toast function for compatibility
  toast: (message, options = {}) => 
    sonnerToast(message, { closeButton: true, ...options }),
};

// Export the useToast hook for consistent usage across the app
export const useToast = () => {
  return toast;
};
