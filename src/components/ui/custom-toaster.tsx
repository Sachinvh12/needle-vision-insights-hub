
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
        success: {
          style: {
            borderLeft: '4px solid #10B981',
          },
          icon: '✓',
        },
        error: {
          style: {
            borderLeft: '4px solid #EF4444',
          },
          icon: '✗',
        },
        warning: {
          style: {
            borderLeft: '4px solid #F59E0B',
          },
          icon: '⚠',
        },
        info: {
          style: {
            borderLeft: '4px solid #3B82F6',
          },
          icon: 'ℹ',
        },
      }}
      theme={theme as "light" | "dark" | "system"}
      className="toaster-improved"
      richColors
      closeButton
    />
  );
};
