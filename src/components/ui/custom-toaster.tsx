
import React from 'react';
import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

export function CustomToaster() {
  const { theme = "system" } = useTheme();
  
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
          fontSize: '14px',
          borderRadius: '8px',
        },
        classNames: {
          success: "border-l-4 border-l-green-500",
          error: "border-l-4 border-l-red-500",
          warning: "border-l-4 border-l-amber-500",
          info: "border-l-4 border-l-blue-500",
        },
        icons: {
          success: '✓',
          error: '✗',
          warning: '⚠',
          info: 'ℹ',
        }
      }}
      theme={theme as "light" | "dark" | "system"}
      className="toaster-improved"
      richColors
      closeButton
    />
  );
}
