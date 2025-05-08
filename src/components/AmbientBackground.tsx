
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

interface AmbientBackgroundProps {
  variant?: 'particles' | 'waves' | 'gradient' | 'minimal';
  intensity?: 'subtle' | 'medium' | 'high';
  color?: 'blue' | 'purple' | 'teal' | 'primary' | 'multi';
  interactive?: boolean;
  className?: string;
  blur?: boolean;
  responsiveness?: number;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  variant = 'particles',
  intensity = 'medium',
  color = 'primary',
  interactive = true,
  className = '',
  blur = false,
  responsiveness = 0.3
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Base colors based on the color prop
  const getBaseColor = () => {
    switch (color) {
      case 'blue': return { primary: 'rgba(56, 127, 237, 0.07)', secondary: 'rgba(37, 99, 235, 0.05)' };
      case 'purple': return { primary: 'rgba(134, 56, 237, 0.07)', secondary: 'rgba(109, 40, 217, 0.05)' };
      case 'teal': return { primary: 'rgba(20, 184, 166, 0.07)', secondary: 'rgba(13, 148, 136, 0.05)' };
      case 'multi': return { primary: 'rgba(56, 127, 237, 0.07)', secondary: 'rgba(134, 56, 237, 0.05)' };
      default: return { primary: 'rgba(54, 125, 141, 0.07)', secondary: 'rgba(30, 86, 99, 0.05)' };
    }
  };
  
  const colors = getBaseColor();
  
  // Configure elements based on intensity
  const particleCount = intensity === 'subtle' ? 12 : intensity === 'medium' ? 20 : 30;
  const waveCount = intensity === 'subtle' ? 2 : intensity === 'medium' ? 3 : 4;
  
  // Generate particles with sophisticated properties
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // % position
    y: Math.random() * 100, // % position
    size: Math.random() * (intensity === 'subtle' ? 1.5 : intensity === 'medium' ? 2.5 : 3.5) + 1,
    duration: 30 + Math.random() * 70, // Animation duration in seconds
    delay: Math.random() * -30, // Random delay to stagger animations
    blur: Math.random() > 0.7,
  }));
  
  // Sophisticated parallax effect on scroll with refined values
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150 * responsiveness]);
  const backgroundOpacity = useTransform(scrollY, [0, 400], [1, 0.92]);
  const mouseMoveStrength = intensity === 'subtle' ? 3 : intensity === 'medium' ? 6 : 10;
  
  // Track mouse position for interactive backgrounds
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);
  
  // Generate wave paths - for the waves variant
  const generateWavePath = (index: number) => {
    const amplitude = index === 0 ? 30 : 20 - index * 3;
    const frequency = index === 0 ? 0.005 : 0.005 + index * 0.001;
    const points = [];
    
    for (let x = 0; x <= 1000; x += 10) {
      const y = Math.sin(x * frequency) * amplitude;
      points.push(`${x},${50 + y}`);
    }
    
    return `M0,100 L0,50 L${points.join(' L')} L1000,50 L1000,100 Z`;
  };
  
  // Smooth spring for mouse movement
  const mouseX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });
  
  // Gradient rotation based on mouse position
  const gradientRotation = useTransform(
    mouseX, 
    [0, 100], 
    [interactive ? -5 : 0, interactive ? 5 : 0]
  );
  
  const gradientTranslateX = useTransform(
    mouseX,
    [0, 100],
    [interactive ? -mouseMoveStrength : 0, interactive ? mouseMoveStrength : 0]
  );
  
  const gradientTranslateY = useTransform(
    mouseY,
    [0, 100],
    [interactive ? -mouseMoveStrength : 0, interactive ? mouseMoveStrength : 0]
  );
  
  const gradientTransform = useMotionTemplate`rotate(${gradientRotation}deg) translate(${gradientTranslateX}px, ${gradientTranslateY}px)`;
  
  // Render the appropriate background variant
  const renderBackgroundVariant = () => {
    switch (variant) {
      case 'waves':
        return (
          <>
            {Array.from({ length: waveCount }).map((_, i) => (
              <motion.path
                key={i}
                d={generateWavePath(i)}
                fill={i % 2 === 0 ? colors.primary : colors.secondary}
                animate={{
                  d: generateWavePath(i + 1),
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 15 + i * 5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        );
      
      case 'gradient':
        return (
          <motion.div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: color === 'multi' 
                ? 'radial-gradient(circle at 50% 50%, rgba(134, 56, 237, 0.07) 0%, rgba(37, 99, 235, 0.05) 70%, rgba(255, 255, 255, 0) 100%)'
                : `radial-gradient(circle at 50% 50%, ${colors.primary} 0%, ${colors.secondary} 70%, rgba(255, 255, 255, 0) 100%)`,
              transform: gradientTransform
            }}
          />
        );
      
      case 'minimal':
        return (
          <motion.div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
              style={{
                background: color === 'multi'
                  ? 'linear-gradient(135deg, rgba(134, 56, 237, 0.3), rgba(37, 99, 235, 0.2))'
                  : `linear-gradient(135deg, ${colors.primary.replace('0.07', '0.3')}, ${colors.secondary.replace('0.05', '0.2')})`,
                transform: gradientTransform,
                filter: blur ? 'blur(120px)' : 'blur(80px)'
              }}
            />
          </motion.div>
        );
        
      default: // particles
        return (
          <>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full backdrop-blur-md"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}rem`,
                  height: `${particle.size}rem`,
                  background: color === 'multi'
                    ? particle.id % 3 === 0 
                      ? 'rgba(134, 56, 237, 0.15)'
                      : particle.id % 2 === 0 
                        ? 'rgba(37, 99, 235, 0.15)'
                        : 'rgba(20, 184, 166, 0.15)'
                    : particle.id % 2 === 0 
                      ? colors.primary.replace('0.07', '0.15')
                      : colors.secondary.replace('0.05', '0.15'),
                  filter: particle.blur ? 'blur(8px)' : 'blur(1px)'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  x: [
                    `${Math.random() * 15 - 7.5}%`, 
                    `${Math.random() * 15 - 7.5}%`,
                    `${Math.random() * 15 - 7.5}%`
                  ],
                  y: [
                    `${Math.random() * 15 - 7.5}%`, 
                    `${Math.random() * 15 - 7.5}%`,
                    `${Math.random() * 15 - 7.5}%`
                  ],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{
                  repeat: Infinity,
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
            
            {/* Elegant light beams for particles variant */}
            {intensity !== 'subtle' && (
              <>
                <motion.div
                  className="absolute top-0 left-1/4 w-80 h-96"
                  style={{ 
                    background: color === 'multi'
                      ? 'radial-gradient(circle at center, rgba(134, 56, 237, 0.06) 0%, rgba(255, 255, 255, 0) 70%)'
                      : `radial-gradient(circle at center, ${colors.primary} 0%, rgba(255, 255, 255, 0) 70%)`,
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                  }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 15, 
                    ease: "easeInOut" 
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-1/4 w-96 h-96"
                  style={{ 
                    background: color === 'multi'
                      ? 'radial-gradient(circle at center, rgba(20, 184, 166, 0.06) 0%, rgba(255, 255, 255, 0) 70%)'
                      : `radial-gradient(circle at center, ${colors.secondary} 0%, rgba(255, 255, 255, 0) 70%)`,
                    borderRadius: '50%',
                    filter: 'blur(70px)'
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 18, 
                    ease: "easeInOut" 
                  }}
                />
              </>
            )}
          </>
        );
    }
  };
  
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
      {variant === 'waves' ? (
        <svg 
          className="absolute inset-0 w-full h-full" 
          preserveAspectRatio="none" 
          viewBox="0 0 1000 100"
        >
          {renderBackgroundVariant()}
        </svg>
      ) : renderBackgroundVariant()}
    </motion.div>
  );
};

export default AmbientBackground;
