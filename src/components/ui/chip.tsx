
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const chipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        entity:
          "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200",
        criteria:
          "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200",
      },
      removable: {
        true: "pr-1",
      },
    },
    defaultVariants: {
      variant: "default",
      removable: false,
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  onRemove?: () => void;
}

function Chip({
  className,
  variant,
  removable,
  onRemove,
  children,
  ...props
}: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant, removable }), className)} {...props}>
      <span className="text-xs">{children}</span>
      {removable && (
        <button
          type="button"
          className="ml-1 rounded-full hover:bg-muted p-0.5"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  );
}

export { Chip, chipVariants };
