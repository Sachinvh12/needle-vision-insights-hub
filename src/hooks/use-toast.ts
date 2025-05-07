
import { toast as sonnerToast } from "sonner";

// Define default toast options with close button
const defaultOptions = {
  closeButton: true
};

// Create properly typed toast methods
export const toast = {
  success: (message: string, options = {}) => sonnerToast.success(message, { ...defaultOptions, ...options }),
  error: (message: string, options = {}) => sonnerToast.error(message, { ...defaultOptions, ...options }),
  info: (message: string, options = {}) => sonnerToast.info(message, { ...defaultOptions, ...options }),
  warning: (message: string, options = {}) => sonnerToast.warning(message, { ...defaultOptions, ...options }),
  custom: (message: React.ReactNode, options = {}) => sonnerToast(message, { ...defaultOptions, ...options }),
  // Adding direct access to the toast function for compatibility
  toast: (message: React.ReactNode, options = {}) => sonnerToast(message, { ...defaultOptions, ...options }),
};

// Export the useToast hook for consistent usage across the app
export const useToast = () => {
  return toast;
};
