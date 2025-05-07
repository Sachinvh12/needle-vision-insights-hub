
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const chipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-needl-primary text-white hover:bg-needl-dark",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        outline: "border border-gray-200 bg-transparent text-gray-700 hover:bg-gray-100",
        entity: "bg-needl-lighter text-needl-primary hover:bg-needl-lighter/80",
        criteria: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        status: "bg-amber-100 text-amber-800 hover:bg-amber-200",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        error: "bg-red-100 text-red-800 hover:bg-red-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      },
      interactive: {
        true: "cursor-pointer",
        false: "cursor-default",
      }
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  onClose?: () => void;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, interactive, onClose, children, ...props }, ref) => {
    return (
      <div
        className={cn(chipVariants({ variant, interactive }), className)}
        ref={ref}
        {...props}
      >
        <span>{children}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-1 -mr-1 h-3.5 w-3.5 rounded-full hover:bg-gray-300/20 inline-flex items-center justify-center"
            aria-label="Close"
          >
            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
