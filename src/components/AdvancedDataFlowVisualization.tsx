
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FileText, Globe, Database, Zap, Target, BarChart2, AlertTriangle, Check } from 'lucide-react';

const AdvancedDataFlowVisualization: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerControls = useAnimation();
  const pulseControls = useAnimation();
  
  // Set up animation sequence
  useEffect(() => {
    const startAnimation = async () => {
      setIsActive(true);
      
      // Initial animation of the central hub
      await centerControls.start({
        scale: [0, 1.3, 1],
        opacity: [0, 1],
        rotate: [0, 720],
        transition: { duration: 1.8, ease: "easeOut" }
      });
      
      // Start continuous pulse animation
      pulseControls.start({
        scale: [1, 1.15, 1],
        opacity: [0.85, 1, 0.85],
        transition: { 
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      });
    };
    
    const animationTimeout = setTimeout(() => {
      startAnimation();
    }, 500);
    
    return () => clearTimeout(animationTimeout);
  }, [centerControls, pulseControls]);
  
  // Data types and their configurations
  const dataSources = [
    { 
      id: 'web', 
      icon: <Globe className="h-6 w-6 text-blue-600" />, 
      label: "Web Sources",
      color: "#0891b2", // needl teal
      position: { x: "15%", y: "20%" }
    },
    { 
      id: 'docs', 
      icon: <FileText className="h-6 w-6 text-green-600" />, 
      label: "Documents",
      color: "#10b981", // green
      position: { x: "38%", y: "20%" }
    },
    { 
      id: 'data', 
      icon: <Database className="h-6 w-6 text-purple-600" />, 
      label: "Data Sets",
      color: "#8b5cf6", // purple
      position: { x: "62%", y: "20%" }
    },
    { 
      id: 'market', 
      icon: <BarChart2 className="h-6 w-6 text-amber-600" />, 
      label: "Market Stats",
      color: "#f59e0b", // amber
      position: { x: "85%", y: "20%" }
    }
  ];
  
  const outputTypes = [
    { 
      id: 'alerts', 
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />, 
      label: "Alerts",
      color: "#ef4444", // red
      position: { x: "25%", y: "80%" }
    },
    { 
      id: 'insights', 
      icon: <Target className="h-6 w-6 text-emerald-600" />, 
      label: "Insights",
      color: "#10b981", // emerald
      position: { x: "50%", y: "80%" }
    },
    { 
      id: 'reports', 
      icon: <Check className="h-6 w-6 text-blue-600" />, 
      label: "Reports",
      color: "#3b82f6", // blue
      position: { x: "75%", y: "80%" }
    }
  ];
  
  // Define smooth curved paths for data flow
  const getInputPath = (x: string) => {
    return `M ${x} 20% C ${x} 35%, 50% 35%, 50% 50%`;
  };
  
  const getOutputPath = (x: string) => {
    return `M 50% 50% C 50% 65%, ${x} 65%, ${x} 80%`;
  };

  // Generate data particles that will flow through the paths
  const generateParticles = (count: number) => {
    const particles = [];
    const paths = [
      ...dataSources.map(src => getInputPath(src.position.x)),
      ...outputTypes.map(out => getOutputPath(out.position.x))
    ];
    
    const colors = [
      ...dataSources.map(src => src.color),
      ...outputTypes.map(out => out.color)
    ];
    
    for (let i = 0; i < count; i++) {
      const pathIndex = i % paths.length;
      particles.push({
        id: `particle-${i}`,
        path: paths[pathIndex],
        color: colors[pathIndex],
        delay: i * 0.8 + Math.random() * 1.5,
        duration: 1.5 + Math.random() * 0.7,
        size: 3 + Math.random() * 4
      });
    }
    
    return particles;
  };
  
  const particles = generateParticles(42); // Create multiple particles for rich visualization

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto h-[380px] md:h-[460px] overflow-hidden"
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-needl-lighter/20 to-transparent rounded-3xl" />
      
      {/* Animated orbital rings */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-48 h-48 border border-needl-primary/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 w-64 h-64 border border-blue-400/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 w-80 h-80 border border-needl-primary/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />
      
      {/* Connection paths with gradient stroke */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="inputGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id="outputGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Input data paths */}
        {dataSources.map((source, i) => (
          <motion.path
            key={`input-path-${i}`}
            d={getInputPath(source.position.x)}
            stroke="url(#inputGradient)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
            style={{ filter: "url(#glow)" }}
          />
        ))}
        
        {/* Output data paths */}
        {outputTypes.map((output, i) => (
          <motion.path
            key={`output-path-${i}`}
            d={getOutputPath(output.position.x)}
            stroke="url(#outputGradient)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.2, delay: 1.2 + i * 0.15 }}
            style={{ filter: "url(#glow)" }}
          />
        ))}
      </svg>
      
      {/* Central processing hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={centerControls}
      >
        <motion.div
          animate={pulseControls}
          className="relative"
        >
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-full bg-needl-primary/30 blur-xl transform scale-150" />
          
          {/* Main hub */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-needl-primary to-blue-600 
                     flex items-center justify-center shadow-lg shadow-needl-primary/20 z-20">
            <Zap className="h-12 w-12 md:h-14 md:w-14 text-white" />
            
            {/* Inner pulsing ring */}
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Processing ring */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-needl-primary/30 z-10"
            animate={{ 
              rotate: 360, 
              borderColor: ['rgba(8, 145, 178, 0.3)', 'rgba(37, 99, 235, 0.5)', 'rgba(8, 145, 178, 0.3)']
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Outer processing ring */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-400/30 scale-125 z-10"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Label */}
          <motion.div 
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm 
                      px-5 py-2 rounded-full text-sm font-medium text-needl-primary shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Needl.ai Core
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Input Data Source Icons */}
      {dataSources.map((source, index) => (
        <motion.div
          key={`source-${source.id}`}
          className="absolute z-10"
          style={{ left: source.position.x, top: source.position.y, transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.5, 
              delay: index * 0.5, 
              ease: "easeInOut" 
            }}
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-md border border-gray-100"
              whileHover={{ boxShadow: "0 0 15px rgba(8, 145, 178, 0.5)" }}
            >
              {source.icon}
            </motion.div>
            <div className="mt-2 text-center text-sm font-medium text-gray-700">{source.label}</div>
          </motion.div>
        </motion.div>
      ))}
      
      {/* Output Result Icons */}
      {outputTypes.map((output, index) => (
        <motion.div
          key={`output-${output.id}`}
          className="absolute z-10"
          style={{ left: output.position.x, top: output.position.y, transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ 
              y: [0, -6, 0],
              scale: output.id === 'insights' ? [1, 1.05, 1] : [1, 1, 1]
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 3.5, delay: index * 0.5, ease: "easeInOut" },
              scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
            }}
          >
            <motion.div 
              className="w-18 h-18 bg-gradient-to-br from-white to-gray-50 rounded-xl flex items-center justify-center shadow-md p-4 border border-gray-100"
              whileHover={{ boxShadow: `0 0 15px ${output.color}80` }}
            >
              {output.icon}
            </motion.div>
            <div className="mt-2 text-center text-sm font-medium text-gray-700">{output.label}</div>
          </motion.div>
        </motion.div>
      ))}
      
      {/* Animated data particles flowing through the network */}
      {isActive && (
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute z-30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              style={{
                width: particle.size,
                height: particle.size,
                borderRadius: '50%',
                background: particle.color,
                boxShadow: `0 0 6px ${particle.color}`,
                position: 'absolute',
                top: 0,
                left: 0,
                offsetPath: `path("${particle.path}")`,
                offsetDistance: '0%',
                offsetRotate: '0deg'
              }}
              animate={{
                offsetDistance: ['0%', '100%'],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                offsetDistance: {
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: 'easeInOut'
                },
                opacity: {
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: 4,
                  times: [0, 0.2, 1],
                  ease: 'easeInOut'
                },
                scale: {
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: 4,
                  times: [0, 0.2, 1],
                  ease: 'easeInOut'
                }
              }}
            />
          ))}
        </AnimatePresence>
      )}
      
      {/* Additional light effects and flourishes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light beams emanating from center */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-needl-primary/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default AdvancedDataFlowVisualization;
