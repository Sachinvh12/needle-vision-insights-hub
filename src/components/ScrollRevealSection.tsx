
import React, { useRef, ReactNode } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
  duration?: number;
  staggerChildren?: number;
  staggerDirection?: number;
  once?: boolean;
  threshold?: number;
  ease?: string;
  damping?: number;
  stiffness?: number;
  cascade?: boolean;
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.7,
  staggerChildren = 0.1,
  staggerDirection = 1,
  once = true,
  threshold = 0.1,
  ease = "easeOut",
  damping = 25,
  stiffness = 200,
  cascade = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: `-${threshold * 100}px`,
    amount: 0.2
  });
  
  // Calculate initial position based on direction with elegant values
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      case 'fade': return { opacity: 0 };
      case 'scale': return { scale: 0.92, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  // Enhanced container animation with refined timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        staggerDirection: staggerDirection,
        delayChildren: delay,
        ease: ease
      }
    }
  };

  // Sophisticated animation variants with more refined transitions
  const itemVariants = {
    hidden: getInitialPosition(),
    visible: {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: direction === 'scale' ? "spring" : "tween",
        damping: damping,
        stiffness: stiffness,
        duration: duration,
        ease: ease
      }
    }
  };

  // Check if children is an array and handle cascading animations
  const childrenArray = React.Children.toArray(children);
  const hasMultipleChildren = childrenArray.length > 1;

  // Handle cascade animation (each child animates independently when it comes into view)
  if (cascade && hasMultipleChildren) {
    return (
      <div className={className} ref={ref}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            initial={getInitialPosition()}
            animate={isInView ? {
              y: 0,
              x: 0,
              scale: 1,
              opacity: 1
            } : getInitialPosition()}
            transition={{
              duration: duration,
              delay: delay + (index * staggerChildren),
              ease: ease
            }}
            className="will-change-transform"
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  // If it has multiple children, stagger them with enhanced animations
  if (hasMultipleChildren) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {React.Children.map(children, (child) => (
          <motion.div 
            variants={itemVariants}
            className="will-change-transform"
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // If it's a single child, animate it directly with improved animation
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className={`${className} will-change-transform`}
        initial={getInitialPosition()}
        animate={isInView ? {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1
        } : getInitialPosition()}
        transition={{
          type: direction === 'scale' ? "spring" : "tween",
          damping: damping,
          stiffness: stiffness,
          duration: duration,
          delay: delay,
          ease: ease
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ScrollRevealSection;
