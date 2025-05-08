
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnhancedDataFlowVisualization from './EnhancedDataFlowVisualization';
import CloudProvidersSection from './CloudProvidersSection';
import AmbientBackground from './AmbientBackground';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Parallax effects based on scroll
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0.5]);
  const titleY = useTransform(scrollY, [0, 200], [0, -30]);
  const visualizationScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Heading text animation
  const headingWords = "Turning Information into Intelligence".split(" ");

  return (
    <>
      <AmbientBackground intensity="medium" />
    
      <section className="relative py-16 md:py-24 px-4 overflow-hidden z-10">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ opacity: titleOpacity, y: titleY }}
            className="mb-6 relative"
          >
            <motion.h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight relative">
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2 mb-1 bg-gradient-to-br from-needl-primary to-blue-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7,
                    delay: 0.2 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {word}
                </motion.span>
              ))}
              
              {/* Animated highlight decoration */}
              <motion.span
                className="absolute -z-10 bg-needl-lighter/80 rounded-full blur-2xl"
                initial={{ width: 0, height: 0, x: "50%", y: "50%" }}
                animate={{ 
                  width: "120%",
                  height: "120%", 
                  x: "-10%", 
                  y: "-10%",
                  opacity: [0, 0.3, 0.1]
                }}
                transition={{ 
                  delay: 0.8,
                  duration: 2.5,
                  ease: "easeOut"
                }}
              />
              
              {/* Subtle sparkle effect */}
              <motion.div
                className="absolute right-0 top-0 text-needl-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
              </motion.div>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Needl.ai consolidates insights from your data sources in real-time, 
              empowering your team with actionable intelligence for confident decision making.
            </motion.p>
          </motion.div>

          <motion.div
            style={{ scale: visualizationScale }}
            className="relative z-10"
          >
            <EnhancedDataFlowVisualization />
          </motion.div>
          
          <CloudProvidersSection />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-10 relative"
          >
            <Button 
              onClick={() => navigate('/use-cases')}
              className="bg-needl-primary hover:bg-needl-dark text-white px-8 py-6 rounded-md text-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              size="lg"
            >
              Get Started <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
            
            {/* Pulsating circle behind button */}
            <motion.div 
              className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-needl-primary/10 rounded-full"
              initial={{ width: 0, height: 0 }}
              animate={{ 
                width: ['100%', '120%', '100%'],
                height: ['100%', '120%', '100%'],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
        
        {/* Scroll indicator - appears when user hasn't scrolled */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasScrolled ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-gray-400 text-sm mb-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Scroll to explore
          </motion.div>
          <motion.div
            className="w-1 h-8 bg-gradient-to-b from-needl-primary/40 to-transparent rounded-full"
            animate={{ 
              scaleY: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
            }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
