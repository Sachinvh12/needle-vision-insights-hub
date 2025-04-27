
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { FileText, Database, Folder, ChevronRight, BarChart2, Zap, Target, Globe } from 'lucide-react';
import CloudProviderIcon from '../components/CloudProviderIcon';
import PersonaSection from '../components/personas/PersonaSection';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

  // Trigger animations when component mounts
  useEffect(() => {
    setIsInView(true);
    controls.start("visible");
  }, [controls]);

  // Enhanced dynamic intelligence visualization
  const IntelligenceVisualization = () => {
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
          duration: 0.5,
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
          duration: 2.5
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
      { icon: <Globe className="h-5 w-5 text-blue-600" />, bg: "bg-blue-100", name: "Web" },
      { icon: <FileText className="h-5 w-5 text-green-600" />, bg: "bg-green-100", name: "Docs" },
      { icon: <Database className="h-5 w-5 text-purple-600" />, bg: "bg-purple-100", name: "Data" },
      { icon: <BarChart2 className="h-5 w-5 text-amber-600" />, bg: "bg-amber-100", name: "Market" }
    ];

    const outputTypes = [
      { icon: <Target className="h-5 w-5 text-red-600" />, label: "Alerts", bg: "bg-red-100" },
      { icon: <FileText className="h-5 w-5 text-indigo-600" />, label: "Reports", bg: "bg-indigo-100" },
      { icon: <BarChart2 className="h-5 w-5 text-emerald-600" />, label: "Insights", bg: "bg-emerald-100" }
    ];

    return (
      <div className="relative w-full max-w-4xl mx-auto my-8 lg:my-12 h-[280px] md:h-[320px]">
        {/* Central Processing Hub with pulsing effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={nodeVariants}
          custom={0}
        >
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-needl-primary to-blue-600 
                     flex items-center justify-center shadow-lg shadow-needl-primary/20"
            variants={pulseVariants}
            animate="pulse"
          >
            <Zap className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </motion.div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm 
                        px-3 py-1 rounded-full text-xs font-medium text-needl-primary shadow-sm">
            AI Processing
          </div>
        </motion.div>

        {/* Input Data Sources */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-10 md:px-20">
          {dataSources.map((source, i) => (
            <motion.div
              key={`source-${i}`}
              className="relative"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={nodeVariants}
              custom={i + 1}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className={`w-12 h-12 ${source.bg} rounded-full flex items-center justify-center shadow-md`}
                variants={floatVariants}
                animate="float"
                custom={i}
              >
                {source.icon}
              </motion.div>
              <div className="mt-2 text-center text-xs font-medium text-gray-700">{source.name}</div>
            </motion.div>
          ))}
        </div>

        {/* Output Types at Bottom */}
        <div className="absolute bottom-0 w-full flex justify-center gap-16 md:gap-32">
          {outputTypes.map((output, i) => (
            <motion.div
              key={`output-${i}`}
              className="relative flex flex-col items-center"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={nodeVariants}
              custom={i + 5}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`w-16 h-16 ${output.bg} rounded-lg flex items-center justify-center shadow-md`}
                variants={floatVariants}
                animate="float"
                custom={i + 4}
              >
                {output.icon}
              </motion.div>
              <div className="mt-2 text-center text-sm font-medium">{output.label}</div>
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
                d={`M ${x1} 20% Q 50% 30%, 50% 50%`}
                stroke="url(#gradientLine)"
                strokeWidth="2"
                fill="transparent"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={pathVariants}
                custom={i + 1}
              />
            );
          })}

          {/* Center to output connections */}
          {outputTypes.map((_, i) => {
            const x2 = `${25 + (i * 25)}%`;
            return (
              <motion.path
                key={`line-out-${i}`}
                d={`M 50% 50% Q 50% 70%, ${x2} 80%`}
                stroke="url(#gradientLine)"
                strokeWidth="2"
                fill="transparent"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
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
        <AnimatePresence>
          {isInView && dataSources.map((_, i) => {
            const x1 = `${15 + (i * 23)}%`;
            return (
              <motion.circle
                key={`data-particle-${i}`}
                cx={x1}
                cy="20%"
                r="4"
                fill="#367d8d"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  cx: ["15%", "50%"],
                  cy: ["20%", "50%"]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 2,
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    );
  };

  // Improved cloud storage provider icons with consistent styling
  const CloudProviders = () => (
    <motion.div 
      className="flex justify-center gap-10 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.0 }}
    >
      {['google-drive', 'dropbox', 'onedrive'].map((provider, index) => (
        <motion.div 
          key={provider}
          className="flex flex-col items-center"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-gray-100 rounded-full flex items-center justify-center mb-2 shadow-md">
            <CloudProviderIcon provider={provider} className="w-8 h-8" />
          </div>
          <span className="text-sm text-gray-700 font-medium">
            {provider === 'google-drive' ? 'Google Drive' : 
             provider === 'dropbox' ? 'Dropbox' : 'OneDrive'}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header showLoginButton={!isLoggedIn} />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        
        <section className="py-12 md:py-16 px-4 relative z-10 flex flex-col items-center">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-needl-primary to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Turning Information into Intelligence
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Needl.ai consolidates insights from the web and your documents, 
              providing real-time intelligence for confident decision making.
            </motion.p>

            {/* Enhanced visualization component */}
            <IntelligenceVisualization />
            
            {/* Improved cloud providers section */}
            <CloudProviders />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-10"
            >
              <Button 
                onClick={() => navigate('/use-cases')}
                className="bg-needl-primary hover:bg-needl-dark text-white px-8 py-6 rounded-md text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Get Started <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </motion.div>
            
            {/* Persona section must remain below the visualization */}
            <PersonaSection />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
