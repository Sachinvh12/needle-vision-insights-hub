
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EnhancedCardProps extends React.ComponentProps<typeof Card> {
  isSelected?: boolean;
  hoverEffect?: boolean;
  glassmorphism?: boolean;
  onClick?: () => void;
}

const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className,
  isSelected = false,
  hoverEffect = true,
  glassmorphism = false,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        onClick={onClick}
        className={cn(
          "border overflow-hidden transition-all duration-300",
          hoverEffect && "hover:shadow-lg cursor-pointer",
          isSelected && "border-needl-primary ring-1 ring-needl-primary/20 shadow-md",
          glassmorphism && "bg-white/80 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};

export default EnhancedCard;
