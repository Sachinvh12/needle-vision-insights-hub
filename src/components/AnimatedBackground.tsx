
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'glitter' | 'wave' | 'gradient' | 'flow' | 'pulse' | 'network' | 'data';
  className?: string;
  color?: string;
  density?: 'low' | 'medium' | 'high';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'default',
  className = '',
  color = 'needl-primary',
  density = 'medium'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if ((variant === 'wave' || variant === 'flow' || variant === 'network' || variant === 'data') && canvasRef.current) {
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
      
      if (variant === 'wave') {
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
      }
      
      if (variant === 'flow') {
        // Particle system for flow visualization
        const particleCount = density === 'low' ? 50 : density === 'medium' ? 100 : 150;
        const particles: {x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number}[] = [];
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 3 + 1,
            color: [selectedColor.start, selectedColor.mid, selectedColor.end][Math.floor(Math.random() * 3)],
            opacity: Math.random() * 0.5 + 0.2
          });
        }
        
        const drawFlow = () => {
          ctx.clearRect(0, 0, width, height);
          
          // Update and draw particles
          particles.forEach(p => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            // Wrap around edges (alternative to bouncing)
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
            ctx.fill();
          });
          
          // Draw connections between nearby particles
          ctx.strokeStyle = selectedColor.mid + '40'; // Semi-transparent
          ctx.lineWidth = 0.5;
          
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                const opacity = 1 - distance / 100;
                ctx.globalAlpha = opacity;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
              }
            }
          }
          
          ctx.globalAlpha = 1;
        };
        
        const render = () => {
          drawFlow();
          animationFrameId = requestAnimationFrame(render);
        };
        
        render();
      }
      
      if (variant === 'network') {
        // Network graph visualization - perfect for data intelligence UI
        const nodeCount = density === 'low' ? 20 : density === 'medium' ? 30 : 40;
        const nodes: {x: number; y: number; vx: number; vy: number; size: number; connections: number[]}[] = [];
        
        // Initialize nodes
        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 2,
            connections: []
          });
        }
        
        // Create connections (edges) between nodes
        for (let i = 0; i < nodes.length; i++) {
          const connectionCount = Math.floor(Math.random() * 3) + 1;
          for (let j = 0; j < connectionCount; j++) {
            const target = Math.floor(Math.random() * nodes.length);
            if (target !== i && !nodes[i].connections.includes(target)) {
              nodes[i].connections.push(target);
            }
          }
        }
        
        const drawNetwork = () => {
          ctx.clearRect(0, 0, width, height);
          
          // Update node positions with slight movement
          nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 50 || node.x > width - 50) node.vx *= -1;
            if (node.y < 50 || node.y > height - 50) node.vy *= -1;
            
            // Draw connections (edges)
            ctx.strokeStyle = selectedColor.mid + '30';
            ctx.lineWidth = 0.7;
            
            node.connections.forEach(targetIndex => {
              const target = nodes[targetIndex];
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(target.x, target.y);
              ctx.stroke();
            });
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = selectedColor.start + 'AA';
            ctx.fill();
            
            // Draw node border
            ctx.strokeStyle = selectedColor.mid;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          });
        };
        
        const render = () => {
          drawNetwork();
          animationFrameId = requestAnimationFrame(render);
        };
        
        render();
      }
      
      if (variant === 'data') {
        // Data visualization with flowing data streams
        const streamCount = density === 'low' ? 15 : density === 'medium' ? 25 : 35;
        const streams: {points: {x: number; y: number; opacity: number}[]; width: number; speed: number; color: string}[] = [];
        
        // Initialize data streams
        for (let i = 0; i < streamCount; i++) {
          const startX = Math.random() * width;
          const startY = Math.random() * height;
          const length = Math.floor(Math.random() * 10) + 5;
          const points = [];
          
          for (let j = 0; j < length; j++) {
            points.push({
              x: startX,
              y: startY - j * 5,
              opacity: 1 - (j / length)
            });
          }
          
          streams.push({
            points,
            width: Math.random() * 2 + 1,
            speed: Math.random() * 2 + 1,
            color: [selectedColor.start, selectedColor.mid, selectedColor.end][Math.floor(Math.random() * 3)]
          });
        }
        
        const drawDataStreams = () => {
          ctx.clearRect(0, 0, width, height);
          
          // Update and draw streams
          streams.forEach(stream => {
            // Update points
            stream.points.forEach(point => {
              point.y += stream.speed;
              
              // Reset when off screen
              if (point.y > height + 20) {
                point.y = -10;
                point.x = Math.random() * width;
              }
            });
            
            // Draw stream
            for (let i = 0; i < stream.points.length - 1; i++) {
              const p1 = stream.points[i];
              const p2 = stream.points[i + 1];
              
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `${stream.color}${Math.round(p1.opacity * 255).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = stream.width;
              ctx.stroke();
              
              // Add data point
              if (i === 0 && Math.random() > 0.95) {
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, stream.width + 1, 0, Math.PI * 2);
                ctx.fillStyle = selectedColor.end;
                ctx.fill();
              }
            }
          });
        };
        
        const render = () => {
          drawDataStreams();
          animationFrameId = requestAnimationFrame(render);
        };
        
        render();
      }
      
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
  
  // Render canvas-based backgrounds
  if (['wave', 'flow', 'network', 'data'].includes(variant)) {
    return (
      <canvas 
        ref={canvasRef} 
        className={`fixed inset-0 -z-10 w-full h-full ${className}`}
      />
    );
  }
  
  // Enhanced gradient background
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
  
  // Enhanced pulse background - subtle concentric circles
  if (variant === 'pulse') {
    return (
      <div className={`animated-bg ${className}`}>
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={`pulse-${index}`}
              className="absolute rounded-full border border-needl-primary/20"
              style={{ 
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%'
              }}
              initial={{ width: 10, height: 10, opacity: 0.8 }}
              animate={{ 
                width: ['10%', '100%'], 
                height: ['10%', '100%'], 
                opacity: [0.15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                delay: index * 1.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  // Enhanced glitter background
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

  // Subtle background
  if (variant === 'subtle') {
    return (
      <div className={`animated-bg opacity-30 ${className}`} />
    );
  }

  // Default background
  return (
    <div className={`animated-bg ${className}`} />
  );
};

export default AnimatedBackground;
