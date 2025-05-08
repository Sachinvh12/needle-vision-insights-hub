
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollRevealSection from './ScrollRevealSection';
import CloudProvidersSection from './CloudProvidersSection';
import EnhancedDataFlowVisualization from './EnhancedDataFlowVisualization';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  
  // Enhanced parallax effects for professional-looking animations
  const titleOpacity = useTransform(scrollY, [0, 250], [1, 0.7]);
  const titleY = useTransform(scrollY, [0, 250], [0, -30]);
  const visualizationScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const visualizationY = useTransform(scrollY, [0, 300], [0, 15]);
  
  // Elegant title text animation variants
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };
  
  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", 
        stiffness: 100, 
        damping: 20
      }
    }
  };
  
  // Enhanced elegant subtitle animation
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="relative py-28 md:py-36 px-4 overflow-hidden z-10">
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="mb-8 relative"
        >
          {/* Elegant professional headline with staggered reveal */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-5 tracking-tight"
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-needl-dark via-needl-primary to-needl-light inline-block mb-2"
              variants={headlineVariants}
            >
              Transforming Data
            </motion.span>
            <br />
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-br from-slate-700 to-slate-900 dark:from-white dark:to-slate-200 inline-block"
              variants={headlineVariants}
            >
              Into Intelligent Decisions
            </motion.span>
            
            {/* Sophisticated highlight decoration */}
            <motion.div
              className="absolute -z-10 bg-needl-lighter/60 rounded-full blur-3xl"
              initial={{ width: 0, height: 0, x: "50%", y: "50%" }}
              animate={{ 
                width: "140%",
                height: "120%", 
                x: "-20%", 
                y: "-10%",
                opacity: [0, 0.3, 0.1]
              }}
              transition={{ 
                delay: 0.8,
                duration: 2.5,
                ease: "easeOut"
              }}
            />
            
            {/* Professional sparkle accent */}
            <motion.div
              className="absolute -right-3 top-0 text-needl-primary"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.3, duration: 0.7, type: "spring" }}
            >
              <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
            </motion.div>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            Needl.ai orchestrates insights from multiple sources, delivering actionable 
            intelligence that empowers decision makers across your organization.
          </motion.p>
        </motion.div>

        <motion.div
          style={{ 
            scale: visualizationScale,
            y: visualizationY
          }}
          className="relative z-10 mb-2 overflow-visible"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <EnhancedDataFlowVisualization />
          
          {/* Elegant glow effects under the visualization */}
          <motion.div
            className="absolute -inset-10 -z-10 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.3, 0.7] }}
            transition={{ delay: 1.5, duration: 5, repeat: Infinity, repeatType: "mirror" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-needl-lighter/20 via-transparent to-transparent rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
        
        <ScrollRevealSection
          delay={0.5}
          direction="up"
          distance={20}
          duration={0.8}
          once={true}
        >
          <CloudProvidersSection />
        </ScrollRevealSection>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 relative flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Button 
              onClick={() => navigate('/use-cases')}
              className="bg-needl-primary hover:bg-needl-dark text-white px-8 py-7 rounded-md text-lg font-medium transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
              size="lg"
            >
              <span className="relative z-10">Explore Needl.ai</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
              
              {/* Elegant button background animation */}
              <motion.div 
                className="absolute inset-0 bg-needl-dark"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
              />
            </Button>
            
            {/* Elegant button glow effect */}
            <motion.div 
              className="absolute -inset-1 -z-10 bg-gradient-to-br from-needl-primary to-needl-dark rounded-lg opacity-70 blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
                scale: isHovered ? [0.8, 1, 0.9] : 0.8
              }}
              transition={{ 
                duration: 2, 
                repeat: isHovered ? Infinity : 0, 
                repeatType: "mirror" 
              }}
            />
          </motion.div>
          
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 px-8 py-7 rounded-md text-lg font-medium transition-all duration-300"
            size="lg"
            variant="outline"
          >
            View Demo
          </Button>
        </motion.div>
        
        {/* Elegant scroll indicator with refined animation */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: [0, 1, 0.3], y: 0 }}
          transition={{ 
            delay: 2, 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            times: [0, 0.5, 1]
          }}
        >
          <span className="text-sm text-gray-400 mb-2">Discover More</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
