
import React, { useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Database, FileText, Globe, BarChart2, Zap, Target, AlertTriangle, FileCheck } from 'lucide-react';
import useAnimationControls from '../hooks/use-animation-controls';

// Define particle types for the visualization
interface Particle {
  id: number;
  path: string;
  duration: number;
  delay: number;
  color: string;
}

const EnhancedDataFlowVisualization: React.FC = () => {
  const { controls: controlsCenter, ref: centerRef } = useAnimationControls(0.2);
  const controlsPulse = useAnimation();
  
  // Animate the central hub on mount
  useEffect(() => {
    const animateSequence = async () => {
      // Initial appearance animation
      await controlsCenter.start({
        scale: [0, 1.2, 1],
        opacity: [0, 1],
        rotate: [0, 360],
        transition: { duration: 1.5, ease: "easeOut" }
      });
      
      // Start continuous pulse animation
      controlsPulse.start({
        scale: [1, 1.15, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      });
    };
    
    animateSequence();
  }, [controlsCenter, controlsPulse]);
  
  // Generate particles for data flow visualization
  const generateParticles = (count: number): Particle[] => {
    const particles: Particle[] = [];
    const paths = [
      "M 15% 20% Q 50% 30%, 50% 50%", // Top-left to center
      "M 38% 20% Q 50% 35%, 50% 50%", // Top-mid-left to center
      "M 62% 20% Q 50% 35%, 50% 50%", // Top-mid-right to center
      "M 85% 20% Q 50% 30%, 50% 50%", // Top-right to center
      "M 50% 50% Q 50% 70%, 25% 80%", // Center to bottom-left
      "M 50% 50% Q 50% 70%, 50% 80%", // Center to bottom-center
      "M 50% 50% Q 50% 70%, 75% 80%"  // Center to bottom-right
    ];
    
    // Elegant color palette
    const colors = [
      "#0ea5e9", // Sky blue
      "#10b981", // Emerald
      "#6366f1", // Indigo
      "#8b5cf6", // Violet
      "#ec4899", // Pink
      "#f59e0b", // Amber
      "#3b82f6"  // Blue
    ];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        path: paths[i % paths.length],
        duration: 1.2 + Math.random() * 0.8,
        delay: i * 0.3 + Math.random() * 1.5,
        color: colors[i % colors.length]
      });
    }
    
    return particles;
  };
  
  const particles = generateParticles(28); // Generate multiple particles for rich visualization
  
  // Define data source icons
  const dataSources = [
    { id: 1, icon: <Globe className="h-5 w-5 text-blue-600" />, bg: "bg-blue-100", name: "Web", x: "15%", y: "20%" },
    { id: 2, icon: <FileText className="h-5 w-5 text-green-600" />, bg: "bg-green-100", name: "Documents", x: "38%", y: "20%" },
    { id: 3, icon: <Database className="h-5 w-5 text-purple-600" />, bg: "bg-purple-100", name: "Data", x: "62%", y: "20%" },
    { id: 4, icon: <BarChart2 className="h-5 w-5 text-amber-600" />, bg: "bg-amber-100", name: "Market", x: "85%", y: "20%" }
  ];
  
  // Define output icons
  const outputs = [
    { id: 1, icon: <AlertTriangle className="h-5 w-5 text-red-600" />, label: "Alerts", bg: "bg-red-100", x: "25%", y: "80%" },
    { id: 2, icon: <FileCheck className="h-5 w-5 text-indigo-600" />, label: "Reports", bg: "bg-indigo-100", x: "50%", y: "80%" },
    { id: 3, icon: <Target className="h-5 w-5 text-emerald-600" />, label: "Insights", bg: "bg-emerald-100", x: "75%", y: "80%" }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 lg:my-12 h-[300px] md:h-[380px]" ref={centerRef}>
      {/* Glass morphism background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent rounded-3xl backdrop-blur-[2px]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM2N2Q4ZCIgc3Ryb2tlLXdpZHRoPSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-50 rounded-3xl" />
      
      {/* Central processing hub with pulsing effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={controlsCenter}
      >
        <motion.div
          className="relative"
          animate={controlsPulse}
        >
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-full bg-needl-primary/20 blur-xl transform scale-150" />
          
          {/* Main hub - shiny gradient effect */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-needl-primary via-blue-500 to-needl-primary 
                     flex items-center justify-center shadow-lg shadow-needl-primary/20 z-30 overflow-hidden">
            <Zap className="h-10 w-10 md:h-12 md:w-12 text-white drop-shadow-md" />
            
            {/* Shimmering effect within the hub */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ 
                x: ['-100%', '100%'],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: 'linear',
                repeatDelay: 1.5
              }}
            />
          </div>
          
          {/* Processing ring with rotation animation */}
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
          
          {/* Secondary processing ring rotating the opposite direction */}
          <motion.div 
            className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] rounded-full border border-blue-400/20 z-5"
            animate={{ 
              rotate: -360
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          
          {/* Glass-like label */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm 
                        px-4 py-1.5 rounded-full text-sm font-semibold text-needl-primary shadow-sm border border-white/50">
            AI Processing
          </div>
        </motion.div>
      </motion.div>
      
      {/* Input Data Sources */}
      <div className="absolute top-0 left-0 w-full flex justify-between px-8 md:px-16">
        {dataSources.map((source) => (
          <motion.div
            key={`source-${source.id}`}
            className="relative z-20"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: source.id * 0.15 }}
            whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div
              className={`w-14 h-14 ${source.bg} rounded-full flex items-center justify-center shadow-md 
                         border border-white/50 backdrop-blur-sm`}
              animate={{ 
                y: [0, -8, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                delay: source.id * 0.5,
                ease: "easeInOut" 
              }}
            >
              {source.icon}
              
              {/* Subtle inner glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-white/40 opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  delay: source.id * 0.3,
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
            <div className="mt-2 text-center text-sm font-medium text-gray-700">{source.name}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Output Types at Bottom */}
      <div className="absolute bottom-0 w-full flex justify-around">
        {outputs.map((output) => (
          <motion.div
            key={`output-${output.id}`}
            className="relative z-20 flex flex-col items-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: output.id * 0.15 + 0.6 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <motion.div
              className={`w-16 h-16 ${output.bg} rounded-lg flex items-center justify-center shadow-md 
                         border border-white/50 backdrop-blur-sm`}
              animate={{
                scale: output.id === 2 ? [1, 1.05, 1] : [1, 1, 1],
                y: [0, -6, 0]
              }}
              transition={{
                scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 3.5, delay: output.id * 0.5, ease: "easeInOut" }
              }}
            >
              {output.icon}
              
              {/* Subtle inner glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-lg bg-white/40 opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5,
                  delay: output.id * 0.4,
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
            <div className="mt-2 text-center text-sm font-medium">{output.label}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                  markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="url(#lineGradient)" />
          </marker>
        </defs>
        
        {/* Data source connections to center */}
        {dataSources.map((source, i) => (
          <motion.path
            key={`line-in-${i}`}
            d={`M ${source.x} ${source.y} Q 50% 35%, 50% 50%`}
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
            style={{ filter: "url(#glow)" }}
          />
        ))}
        
        {/* Center to output connections */}
        {outputs.map((output, i) => (
          <motion.path
            key={`line-out-${i}`}
            d={`M 50% 50% Q 50% 65%, ${output.x} ${output.y}`}
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 + 1 }}
            style={{ filter: "url(#glow)" }}
          />
        ))}
      </svg>
      
      {/* Animated particles flowing through the network */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute top-0 left-0 z-20 w-3 h-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              path: particle.path,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            style={{ 
              offsetPath: `path("${particle.path}")`,
              backgroundColor: particle.color,
              borderRadius: "50%",
              boxShadow: `0 0 10px ${particle.color}`
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Orbital rings around center */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-40 h-40 border border-blue-400/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 w-60 h-60 border border-indigo-400/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />
      
      {/* Subtle pulsing backdrop for dramatic effect */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
    </div>
  );
};

export default EnhancedDataFlowVisualization;
