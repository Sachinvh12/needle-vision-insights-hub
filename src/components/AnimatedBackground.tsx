
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'glitter' | 'wave' | 'gradient';
  className?: string;
  color?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'default',
  className = '',
  color = 'needl-primary'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (variant === 'wave' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let animationFrameId: number;
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      
      // Colors based on needl palette
      const colors = {
        'needl-primary': {
          start: '#367d8d',
          mid: '#4a8e9d',
          end: '#d0e8ec'
        },
        'blue': {
          start: '#2563eb',
          mid: '#3b82f6',
          end: '#dbeafe'
        }
      };
      
      const selectedColor = colors[color as keyof typeof colors] || colors['needl-primary'];
      
      // Waves configuration
      const waves = [
        { y: height * 0.6, length: 0.01, amplitude: 20, speed: 0.0015, color: selectedColor.start, opacity: 0.2 },
        { y: height * 0.5, length: 0.012, amplitude: 15, speed: 0.002, color: selectedColor.mid, opacity: 0.15 },
        { y: height * 0.7, length: 0.015, amplitude: 10, speed: 0.0025, color: selectedColor.end, opacity: 0.1 }
      ];
      
      const drawWave = (time: number) => {
        ctx.clearRect(0, 0, width, height);
        
        waves.forEach(wave => {
          ctx.beginPath();
          ctx.moveTo(0, wave.y);
          
          for (let x = 0; x < width; x++) {
            const dx = x * wave.length;
            const dy = Math.sin(dx + time * wave.speed) * wave.amplitude;
            ctx.lineTo(x, wave.y + dy);
          }
          
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
          
          ctx.fillStyle = `${wave.color}${Math.round(wave.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        });
      };
      
      let time = 0;
      const render = () => {
        time += 1;
        drawWave(time);
        animationFrameId = requestAnimationFrame(render);
      };
      
      render();
      
      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        waves.forEach(wave => {
          wave.y = height * (wave.y / height);
        });
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [variant, color]);
  
  if (variant === 'wave') {
    return (
      <canvas 
        ref={canvasRef} 
        className={`fixed inset-0 -z-10 w-full h-full ${className}`}
      />
    );
  }
  
  if (variant === 'gradient') {
    return (
      <div className={`animated-bg gradient-bg ${className}`}>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-needl-primary/10 via-blue-400/5 to-teal-300/10"
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
    );
  }
  
  if (variant === 'glitter') {
    return (
      <div className={`animated-bg glitter-bg ${className}`}>
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="pulse-dot absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`animated-bg opacity-30 ${className}`} />
    );
  }

  return (
    <div className={`animated-bg ${className}`} />
  );
};

export default AnimatedBackground;
