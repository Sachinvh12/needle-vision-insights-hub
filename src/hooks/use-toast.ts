
import { toast as sonnerToast } from "sonner";
import React from "react";

// Define default toast options with close button
const defaultOptions = {
  closeButton: true
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

// Dummy toasts array to maintain compatibility with the shadcn toaster component
// This isn't actually used by sonner but prevents TypeScript errors
const dummyToasts = [];

export const useToast = () => {
  return { 
    toast,
    toasts: dummyToasts
  };
};
