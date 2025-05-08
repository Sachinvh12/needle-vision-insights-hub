
import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useScroll, useTransform } from 'framer-motion';

interface AmbientBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'high';
  color?: string;
  interactive?: boolean;
  className?: string;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  intensity = 'medium',
  color = 'needl-primary',
  interactive = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const controls = useAnimationControls();
  const { scrollY } = useScroll();
  
  // Configure particles based on intensity
  const particleCount = intensity === 'subtle' ? 15 : intensity === 'medium' ? 30 : 50;
  
  // Generate particles with randomized properties
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // % position
    y: Math.random() * 100, // % position
    size: Math.random() * (intensity === 'subtle' ? 2 : intensity === 'medium' ? 3 : 4) + 1,
    duration: 20 + Math.random() * 60, // Animation duration in seconds
    delay: Math.random() * -30, // Random delay to stagger animations
  }));
  
  // Parallax effect on scroll
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);
  
  // Handle mouse movement for interactive mode
  useEffect(() => {
    if (!interactive || !containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Get mouse position relative to container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update ref with current mouse position
      mouseRef.current = { 
        x: (x / rect.width) * 100, 
        y: (y / rect.height) * 100 
      };
      
      // Use animation controls to subtly move the background
      controls.start({
        backgroundPosition: `${50 + (mouseRef.current.x - 50) * 0.05}% ${50 + (mouseRef.current.y - 50) * 0.05}%`,
        transition: { duration: 2, ease: "easeOut" }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, controls]);
  
  return (
    <motion.div 
      ref={containerRef}
      style={{ 
        y: backgroundY,
        opacity: backgroundOpacity
      }}
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-needl-lighter/20 to-white/10"
        animate={controls}
        initial={{ backgroundPosition: "50% 50%" }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-${color}/10 backdrop-blur-md`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
          }}
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ 
            x: [
              `${Math.random() * 10 - 5}%`, 
              `${Math.random() * 10 - 5}%`,
              `${Math.random() * 10 - 5}%`
            ],
            y: [
              `${Math.random() * 10 - 5}%`, 
              `${Math.random() * 10 - 5}%`,
              `${Math.random() * 10 - 5}%`
            ],
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Light beams */}
      {intensity !== 'subtle' && (
        <>
          <motion.div
            className={`absolute top-0 left-1/4 w-60 h-80 bg-${color}/5 rounded-full blur-3xl`}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute bottom-10 right-1/4 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl`}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
              rotate: [0, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          />
        </>
      )}
    </motion.div>
  );
};

export default AmbientBackground;
