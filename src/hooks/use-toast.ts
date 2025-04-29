
import { toast as sonnerToast } from "sonner";

// Define default toast options with close button
const defaultOptions = {
  closeButton: true,
  dismissible: true
};

// Enhance the default toast methods to include close buttons
export const toast = {
  success: (message: string, options = {}) => sonnerToast.success(message, { ...defaultOptions, ...options }),
  error: (message: string, options = {}) => sonnerToast.error(message, { ...defaultOptions, ...options }),
  info: (message: string, options = {}) => sonnerToast.info(message, { ...defaultOptions, ...options }),
  warning: (message: string, options = {}) => sonnerToast.warning(message, { ...defaultOptions, ...options }),
  // Include other methods as needed
  custom: (message: React.ReactNode, options = {}) => sonnerToast(message, { ...defaultOptions, ...options }),
};

export const useToast = () => {
  return { toast };
};
