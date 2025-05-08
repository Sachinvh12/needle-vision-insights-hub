
import { toast as sonnerToast } from "sonner";
import { ReactNode } from "react";

// Define proper type for the toast options
type ToasterToastOptions = {
  description?: ReactNode;
  action?: ReactNode;
  closeButton?: boolean;
  duration?: number;
  id?: string | number;
  important?: boolean;
  onAutoClose?: (id: string | number) => void;
  onDismiss?: (id: string | number) => void;
  onClose?: (id: string | number) => void;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  promise?: Promise<unknown>;
  style?: React.CSSProperties;
  unstyled?: boolean;
  className?: string;
  classNames?: {
    toast?: string;
    title?: string;
    description?: string;
    loader?: string;
    closeButton?: string;
    success?: string;
    error?: string;
    info?: string;
    warning?: string;
  };
};

// Type definition for our toast methods
interface ToastAPI {
  (message: ReactNode, options?: ToasterToastOptions): string | number;
  success: (message: ReactNode, options?: ToasterToastOptions) => string | number;
  error: (message: ReactNode, options?: ToasterToastOptions) => string | number;
  info: (message: ReactNode, options?: ToasterToastOptions) => string | number;
  warning: (message: ReactNode, options?: ToasterToastOptions) => string | number;
  custom: (message: ReactNode, options?: ToasterToastOptions) => string | number;
}

// Create and export our enhanced toast API
const toast = sonnerToast as unknown as ToastAPI;

export { toast };

// Export the useToast hook for consistent usage across the app
export const useToast = () => {
  return { toast };
};
