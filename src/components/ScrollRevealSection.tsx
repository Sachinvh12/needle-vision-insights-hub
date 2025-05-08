
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
  threshold?: number;
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.7,
  staggerChildren = 0.1,
  once = true,
  threshold = 0.2
}) => {
  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      case 'none': return { opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay
      }
    }
  };

  const childVariants = {
    hidden: getInitialPosition(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200,
        duration: duration
      }
    }
  };

  // Check if children is an array and has items
  const childrenArray = React.Children.toArray(children);
  const hasMultipleChildren = childrenArray.length > 0;

  // If it has multiple children, we'll stagger them
  if (hasMultipleChildren) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: `-${threshold * 100}px` }}
        variants={containerVariants}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // If it's a single child or element, just animate it directly
  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: 25,
          stiffness: 200,
          duration: duration,
          delay: delay
        }
      }}
      viewport={{ once, margin: `-${threshold * 100}px` }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;
