
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, FileText, Database, BarChart2, Zap, Briefcase, BrainCircuit, FileCheck, Target } from 'lucide-react';

interface DataFlowVisualizationProps {
  className?: string;
}

const DataFlowVisualization: React.FC<DataFlowVisualizationProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nodeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.8,
      transition: {
        delay: i * 0.15 + 0.2,
        duration: 0.8,
        ease: "easeInOut"
      }
    })
  };

  const pulseVariants = {
    pulse: {
      scale: [0.95, 1.05, 0.95],
      opacity: [0.8, 1, 0.8],
      transition: {
        repeat: Infinity,
        duration: 2.5,
        ease: "easeInOut"
      }
    }
  };

  const floatVariants = {
    float: (i: number) => ({
      y: [0, -8, 0],
      transition: {
        delay: i * 0.2,
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    })
  };

  const dataSources = [
    { icon: <Globe className="h-5 w-5 text-blue-600" />, name: "Web", bg: "bg-blue-50" },
    { icon: <FileText className="h-5 w-5 text-green-600" />, name: "Documents", bg: "bg-green-50" },
    { icon: <Database className="h-5 w-5 text-purple-600" />, name: "Data", bg: "bg-purple-50" },
    { icon: <BarChart2 className="h-5 w-5 text-amber-600" />, name: "Markets", bg: "bg-amber-50" }
  ];

  const insights = [
    { icon: <FileCheck className="h-5 w-5 text-indigo-600" />, name: "Reports", bg: "bg-indigo-50" },
    { icon: <Target className="h-5 w-5 text-red-600" />, name: "Alerts", bg: "bg-red-50" },
    { icon: <Briefcase className="h-5 w-5 text-emerald-600" />, name: "Insights", bg: "bg-emerald-50" }
  ];

  return (
    <div className={`relative w-full max-w-4xl mx-auto h-[320px] md:h-[360px] ${className}`}>
      {/* Central Intelligence Processing Hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={nodeVariants}
        custom={0}
      >
        <motion.div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-needl-primary to-blue-600 
                   flex items-center justify-center shadow-lg shadow-needl-primary/20 relative overflow-hidden"
          variants={pulseVariants}
          animate="pulse"
        >
          <BrainCircuit className="h-10 w-10 md:h-12 md:w-12 text-white" />
          
          {/* Data processing animation in background */}
          <div className="absolute inset-0 opacity-30">
            <div className="data-particles"></div>
          </div>
        </motion.div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm 
                      px-3 py-1 rounded-full text-xs font-medium text-needl-primary shadow-sm border border-needl-lighter">
          AI Processing
        </div>
      </motion.div>

      {/* Input Data Sources */}
      <div className="absolute top-2 left-0 w-full flex justify-between px-4 md:px-20">
        {dataSources.map((source, i) => (
          <motion.div
            key={`source-${i}`}
            className="relative"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={nodeVariants}
            custom={i + 1}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className={`w-12 h-12 md:w-16 md:h-16 ${source.bg} rounded-full flex items-center justify-center shadow-md`}
              variants={floatVariants}
              animate="float"
              custom={i}
            >
              {source.icon}
            </motion.div>
            <div className="mt-2 text-center text-xs md:text-sm font-medium text-gray-700">{source.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Output Insights */}
      <div className="absolute bottom-2 w-full flex justify-center gap-12 md:gap-28">
        {insights.map((insight, i) => (
          <motion.div
            key={`insight-${i}`}
            className="relative flex flex-col items-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={nodeVariants}
            custom={i + 5}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={`w-14 h-14 md:w-16 md:h-16 ${insight.bg} rounded-lg flex items-center justify-center shadow-md`}
              variants={floatVariants}
              animate="float"
              custom={i + 4}
            >
              {insight.icon}
            </motion.div>
            <div className="mt-2 text-center text-xs md:text-sm font-medium">{insight.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {/* Data source connections to center */}
        {dataSources.map((_, i) => {
          const x1 = `${15 + (i * 23)}%`;
          return (
            <motion.path
              key={`line-in-${i}`}
              d={`M ${x1} 10% Q 50% 30%, 50% 50%`}
              stroke="url(#gradientLine)"
              strokeWidth="2"
              fill="transparent"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={pathVariants}
              custom={i + 1}
            />
          );
        })}

        {/* Center to output connections */}
        {insights.map((_, i) => {
          const x2 = `${25 + (i * 25)}%`;
          return (
            <motion.path
              key={`line-out-${i}`}
              d={`M 50% 50% Q 50% 70%, ${x2} 90%`}
              stroke="url(#gradientLine)"
              strokeWidth="2"
              fill="transparent"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={pathVariants}
              custom={i + 5}
            />
          );
        })}

        {/* Gradient definition for paths */}
        <defs>
          <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>

      {/* Data Flow Animation */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        {isVisible && dataSources.map((_, i) => {
          const x1 = `${15 + (i * 23)}%`;
          return (
            <motion.circle
              key={`data-particle-${i}`}
              cx={x1}
              cy="10%"
              r="4"
              fill="#367d8d"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [x1, "50%"],
                cy: ["10%", "50%"]
              }}
              transition={{
                duration: 2,
                delay: i * 2,
                repeat: Infinity,
                repeatDelay: 6
              }}
            />
          );
        })}

        {isVisible && insights.map((_, i) => {
          const x2 = `${25 + (i * 25)}%`;
          return (
            <motion.circle
              key={`output-particle-${i}`}
              cx="50%"
              cy="50%"
              r="4"
              fill="#3b82f6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: ["50%", x2],
                cy: ["50%", "90%"]
              }}
              transition={{
                duration: 2,
                delay: 3 + i * 2,
                repeat: Infinity,
                repeatDelay: 6
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default DataFlowVisualization;
