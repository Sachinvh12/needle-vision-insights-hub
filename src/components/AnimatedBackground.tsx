
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'glitter' | 'wave' | 'gradient' | 'flow' | 'nodes' | 'pulse';
  className?: string;
  color?: string;
  density?: 'low' | 'medium' | 'high';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'flow',
  className = '',
  color = 'needl-primary',
  density = 'medium'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Canvas-based wave animation
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

  // Canvas-based flow animation (data streams)
  useEffect(() => {
    if (variant === 'flow' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let animationFrameId: number;
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      
      // Colors based on needl palette
      const colors = {
        'needl-primary': {
          primary: '#367d8d',
          secondary: '#d0e8ec'
        },
        'blue': {
          primary: '#2563eb',
          secondary: '#dbeafe'
        }
      };
      
      const selectedColor = colors[color as keyof typeof colors] || colors['needl-primary'];
      
      // Flow line configuration
      const particleCount = density === 'high' ? 50 : density === 'medium' ? 30 : 15;
      const particles: {x: number; y: number; size: number; speed: number; opacity: number; direction: {x: number; y: number;}}[] = [];
      
      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          direction: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          }
        });
      }
      
      const connectionDistance = 150;
      
      const drawFlow = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Move and draw particles
        particles.forEach((p, i) => {
          p.x += p.direction.x * p.speed;
          p.y += p.direction.y * p.speed;
          
          // Wrap around edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `${selectedColor.secondary}${Math.round(p.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          
          // Connect particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              // Draw connection
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              const opacity = (1 - distance / connectionDistance) * 0.3 * p.opacity * p2.opacity;
              ctx.strokeStyle = `${selectedColor.primary}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = Math.min(p.size, p2.size) * 0.3;
              ctx.stroke();
            }
          }
        });
      };
      
      const render = () => {
        drawFlow();
        animationFrameId = requestAnimationFrame(render);
      };
      
      render();
      
      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [variant, color, density]);
  
  // Canvas-based nodes animation
  useEffect(() => {
    if (variant === 'nodes' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let animationFrameId: number;
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      
      // Colors based on needl palette
      const colors = {
        'needl-primary': {
          node: '#367d8d',
          highlight: '#4a8e9d',
          connection: '#d0e8ec'
        },
        'blue': {
          node: '#2563eb',
          highlight: '#3b82f6',
          connection: '#dbeafe'
        }
      };
      
      const selectedColor = colors[color as keyof typeof colors] || colors['needl-primary'];
      
      // Nodes configuration
      const nodeCount = density === 'high' ? 12 : density === 'medium' ? 8 : 5;
      const nodes: {x: number; y: number; size: number; speed: {x: number; y: number}; connections: number[]}[] = [];
      
      // Initialize nodes with connections
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 5 + 3,
          speed: {
            x: (Math.random() - 0.5) * 1,
            y: (Math.random() - 0.5) * 1
          },
          connections: []
        });
      }
      
      // Create connections between nodes (each node connects to 2-3 others)
      nodes.forEach((node, i) => {
        const connectionCount = Math.floor(Math.random() * 2) + 2; // 2-3 connections
        for (let c = 0; c < connectionCount; c++) {
          let targetIndex;
          do {
            targetIndex = Math.floor(Math.random() * nodeCount);
          } while (targetIndex === i || node.connections.includes(targetIndex));
          
          if (targetIndex !== undefined) {
            node.connections.push(targetIndex);
          }
        }
      });
      
      const drawNodes = (time: number) => {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections first (behind nodes)
        nodes.forEach((node, i) => {
          node.connections.forEach(targetIndex => {
            const target = nodes[targetIndex];
            
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            
            // Animated gradient for connections
            const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
            const phase = (Math.sin(time * 0.002 + i) + 1) / 2; // 0-1 oscillation
            
            gradient.addColorStop(phase, `${selectedColor.connection}10`);
            gradient.addColorStop((phase + 0.5) % 1, `${selectedColor.connection}50`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          });
        });
        
        // Draw nodes on top
        nodes.forEach((node, i) => {
          // Move node
          node.x += node.speed.x;
          node.y += node.speed.y;
          
          // Bounce off edges
          if (node.x < node.size || node.x > width - node.size) {
            node.speed.x *= -1;
          }
          if (node.y < node.size || node.y > height - node.size) {
            node.speed.y *= -1;
          }
          
          // Draw node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          
          // Pulsing effect
          const pulseScale = 1 + 0.2 * Math.sin(time * 0.003 + i * 0.5);
          
          // Gradient fill for node
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.size * pulseScale
          );
          gradient.addColorStop(0, selectedColor.highlight);
          gradient.addColorStop(0.7, selectedColor.node);
          gradient.addColorStop(1, `${selectedColor.node}00`);
          
          ctx.fillStyle = gradient;
          ctx.fill();
        });
      };
      
      let time = 0;
      const render = () => {
        time += 1;
        drawNodes(time);
        animationFrameId = requestAnimationFrame(render);
      };
      
      render();
      
      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [variant, color, density]);

  // Canvas-based pulse animation (ripple effect from center)
  useEffect(() => {
    if (variant === 'pulse' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let animationFrameId: number;
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      
      // Colors based on needl palette
      const colors = {
        'needl-primary': {
          primary: '#367d8d',
          secondary: '#d0e8ec'
        },
        'blue': {
          primary: '#2563eb',
          secondary: '#dbeafe'
        }
      };
      
      const selectedColor = colors[color as keyof typeof colors] || colors['needl-primary'];
      
      // Ripples configuration
      const ripples: {x: number; y: number; radius: number; maxRadius: number; speed: number; opacity: number}[] = [];
      const rippleCount = density === 'high' ? 7 : density === 'medium' ? 5 : 3;
      
      // Initialize ripples with staggered timing
      for (let i = 0; i < rippleCount; i++) {
        ripples.push({
          x: width / 2,
          y: height / 2,
          radius: 0,
          maxRadius: Math.min(width, height) * 0.4,
          speed: 0.5 + Math.random() * 0.5,
          opacity: 0.8
        });
      }
      
      const drawRipples = (time: number) => {
        ctx.clearRect(0, 0, width, height);
        
        ripples.forEach((ripple, i) => {
          // Update radius based on time and ripple index (stagger)
          const timerOffset = (i / rippleCount) * Math.PI * 2;
          const timerValue = (time * 0.001 + timerOffset) % (Math.PI * 2);
          
          // Reset ripple when cycle completes
          if (timerValue < 0.1 && ripple.radius > ripple.maxRadius * 0.9) {
            ripple.radius = 0;
          } else {
            // Expand ripple
            ripple.radius += ripple.speed;
          }
          
          // Only draw if ripple is active
          if (ripple.radius > 0 && ripple.radius < ripple.maxRadius) {
            // Calculate opacity that fades as the ripple expands
            const currentOpacity = ripple.opacity * (1 - ripple.radius / ripple.maxRadius);
            
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.lineWidth = 1 + (1 - ripple.radius / ripple.maxRadius) * 2;
            ctx.strokeStyle = `${selectedColor.primary}${Math.round(currentOpacity * 255).toString(16).padStart(2, '0')}`;
            ctx.stroke();
          }
        });
      };
      
      let time = 0;
      const render = () => {
        time += 1;
        drawRipples(time);
        animationFrameId = requestAnimationFrame(render);
      };
      
      render();
      
      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        // Update ripples center position after resize
        ripples.forEach(ripple => {
          ripple.x = width / 2;
          ripple.y = height / 2;
          ripple.maxRadius = Math.min(width, height) * 0.4;
        });
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [variant, color, density]);
  
  if (variant === 'wave' || variant === 'flow' || variant === 'nodes' || variant === 'pulse') {
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
