import { Toaster as Sonner } from "sonner";

// This component is not actively used in the app since we're using <Toaster /> directly in App.tsx
// Keeping it for compatibility with any code that might reference it
export function Toaster() {
  return (
    <Sonner 
      className="toaster group" 
      toastOptions={{ 
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        closeButton: true
      }}
    />
  );
}
