
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MainHeader from '../components/MainHeader';
import { useApp } from '../context/AppContext';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import { CustomToaster } from '../components/ui/custom-toaster';
import ScrollRevealSection from '../components/ScrollRevealSection';
import { ArrowDown, ChevronUp } from 'lucide-react';
import AmbientBackground from '../components/AmbientBackground';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Transform scroll progress for enhanced animations
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.97]);
  const headerBackdrop = useTransform(
    scrollYProgress, 
    [0, 0.1], 
    ['blur(0px)', 'blur(12px)']
  );
  
  // Track scroll position for scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Update page title and handle scroll restoration
  useEffect(() => {
    document.title = "Needl.ai - Turning Information into Intelligence";
    window.scrollTo(0, 0);
    
    // Optional: Add a class to the body for specific landing page styling
    document.body.classList.add('landing-page');
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);
  
  return (
    <AnimatePresence>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Enhanced header with refined scroll effects */}
        <motion.div 
          className="fixed top-0 left-0 right-0 z-50 transition-colors"
          style={{ 
            opacity: headerOpacity,
            backdropFilter: headerBackdrop
          }}
        >
          <motion.div
            className={`transition-all duration-500 ${isScrolled ? 'bg-white/80 shadow-sm' : 'bg-transparent'}`}
          >
            <MainHeader showAlertIcon={true} />
          </motion.div>
        </motion.div>
        
        {/* Professional ambient background */}
        <AmbientBackground intensity="medium" interactive={true} />
        
        <main className="flex-1 pt-16 overflow-hidden">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Features Section with elegant scroll reveal animations */}
          <ScrollRevealSection 
            direction="up" 
            distance={40} 
            threshold={0.25}
            duration={0.9}
            easing="easeOut"
          >
            <FeaturesSection />
          </ScrollRevealSection>
          
          {/* Enhanced divider with animation */}
          <div className="relative flex justify-center py-16">
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <motion.div 
                className="w-px h-16 bg-gradient-to-b from-transparent via-needl-primary/40 to-transparent"
                animate={{ 
                  scaleY: [0.7, 1.3, 0.7],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
              <motion.div 
                className="w-24 h-px bg-gradient-to-r from-transparent via-needl-primary/30 to-transparent mt-3"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 140, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>
          </div>
          
          {/* Testimonials with staggered elegant reveal */}
          <ScrollRevealSection 
            direction="up" 
            staggerChildren={0.2} 
            distance={30}
            duration={0.8}
            easing="easeOut"
          >
            <TestimonialsSection />
          </ScrollRevealSection>
          
          {/* CTA Section with stronger animation */}
          <ScrollRevealSection 
            direction="none" 
            threshold={0.3}
            duration={1}
          >
            <CTASection />
          </ScrollRevealSection>
        </main>
        
        {/* Footer with subtle entrance animation */}
        <motion.footer 
          className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <motion.div 
                  className="text-2xl font-bold bg-gradient-to-r from-needl-dark to-needl-primary bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  needl.ai
                </motion.div>
                <p className="text-gray-600 mt-2">Transforming data into decisions</p>
              </div>
              
              <div className="flex gap-10">
                {['Privacy', 'Terms', 'About'].map((item, i) => (
                  <motion.a 
                    key={item}
                    href="#" 
                    className="text-gray-600 relative group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <span className="relative z-10">{item}</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-needl-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="mt-10 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                initial={{ letterSpacing: "0em" }}
                animate={{ letterSpacing: "0.02em" }}
                transition={{ duration: 1 }}
              >
                © {new Date().getFullYear()} Needl.ai - All rights reserved.
              </motion.div>
            </motion.div>
          </div>
        </motion.footer>
        
        {/* Enhanced floating scroll button with elegant animation */}
        <AnimatePresence>
          {isScrolled && (
            <motion.button
              className="fixed bottom-8 right-8 p-3.5 rounded-full bg-needl-primary text-white z-40 shadow-lg hover:shadow-needl-primary/20 hover:bg-needl-dark transition-all"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronUp className="h-5 w-5" />
              <motion.div 
                className="absolute -inset-1 rounded-full border border-white/30 z-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>
        
        <CustomToaster />
      </div>
    </AnimatePresence>
  );
};

export default Landing;
