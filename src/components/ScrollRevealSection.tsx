
import React, { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

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
  easing?: "spring" | "easeOut" | "easeIn" | "easeInOut" | "circIn" | "circOut";
  damping?: number;
  stiffness?: number;
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
  threshold = 0.2,
  easing = "spring",
  damping = 25,
  stiffness = 200
}) => {
  // Calculate initial position based on direction with refined values
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

  // Enhanced animation variants with more sophisticated transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
        ease: easing === "spring" ? undefined : easing,
      }
    }
  };

  // Refined transition with better physics parameters
  const getTransition = () => {
    return easing === "spring" 
      ? { type: 'spring', damping, stiffness, duration, mass: 0.8 } 
      : { duration, ease: easing };
  };

  const childVariants = {
    hidden: getInitialPosition(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: getTransition()
    }
  };

  // Check if children is an array and has items
  const childrenArray = React.Children.toArray(children);
  const hasMultipleChildren = childrenArray.length > 0;

  // If it has multiple children, we'll stagger them with enhanced animations
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
          <motion.div 
            key={index} 
            variants={childVariants}
            className="will-change-transform will-change-opacity"
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // If it's a single child or element, animate it directly with improved animation
  return (
    <motion.div
      className={`${className} will-change-transform will-change-opacity`}
      initial={getInitialPosition()}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          ...getTransition(),
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
