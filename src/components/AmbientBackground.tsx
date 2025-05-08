
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const { scrollY } = useScroll();
  
  // Configure particles based on intensity
  const particleCount = intensity === 'subtle' ? 8 : intensity === 'medium' ? 16 : 24;
  
  // Generate particles with refined properties
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // % position
    y: Math.random() * 100, // % position
    size: Math.random() * (intensity === 'subtle' ? 1.5 : intensity === 'medium' ? 2.5 : 3.5) + 1,
    duration: 20 + Math.random() * 60, // Animation duration in seconds
    delay: Math.random() * -30, // Random delay to stagger animations
  }));
  
  // Parallax effect on scroll with improved values
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 120]);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, 0.85]);
  
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
      {/* Elegant gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-needl-lighter/20 to-white/10"
        animate={{
          backgroundPosition: interactive ? 
            ['0% 0%', '10% 5%', '0% 0%'] : 
            ['0% 0%', '0% 0%', '0% 0%']
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Refined floating particles */}
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
              `${Math.random() * 8 - 4}%`, 
              `${Math.random() * 8 - 4}%`,
              `${Math.random() * 8 - 4}%`
            ],
            y: [
              `${Math.random() * 8 - 4}%`, 
              `${Math.random() * 8 - 4}%`,
              `${Math.random() * 8 - 4}%`
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
      
      {/* Elegant light beams */}
      {intensity !== 'subtle' && (
        <>
          <motion.div
            className={`absolute top-0 left-1/4 w-60 h-80 bg-${color}/5 rounded-full blur-3xl`}
            animate={{
              opacity: [0.2, 0.35, 0.2],
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute bottom-10 right-1/4 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl`}
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: [1, 1.1, 1],
              rotate: [0, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          />
        </>
      )}
    </motion.div>
  );
};

export default AmbientBackground;
