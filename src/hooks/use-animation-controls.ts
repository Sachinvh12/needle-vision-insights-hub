
import { useState, useEffect, useRef } from 'react';
import { useAnimation } from 'framer-motion';

/**
 * Custom hook to handle animation controls with performance optimizations
 * @param threshold Intersection observer threshold (0-1)
 * @returns Animation controls and ref to attach to the element
 */
export const useAnimationControls = (threshold = 0.1) => {
  const controls = useAnimation();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Using Intersection Observer for better performance than scroll events
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView) {
          controls.start("visible");
        } else {
          // Optional: Reset animation when leaving viewport
          // controls.start("hidden");
        }
      },
      { 
        threshold,
        // Trigger animations slightly before element comes into view
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [controls, threshold]);

  return { controls, ref: elementRef, isInView };
};

export default useAnimationControls;
