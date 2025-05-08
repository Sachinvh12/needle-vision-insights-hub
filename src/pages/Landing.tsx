
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import MainHeader from '../components/MainHeader';
import { useApp } from '../context/AppContext';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import { CustomToaster } from '../components/ui/custom-toaster';
import ScrollRevealSection from '../components/ScrollRevealSection';
import { ArrowDown } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress for animations
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);
  const headerBackdrop = useTransform(
    scrollYProgress, 
    [0, 0.1], 
    ['blur(0px)', 'blur(10px)']
  );
  
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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Header with scroll effects */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50"
        style={{ 
          opacity: headerOpacity,
          backdropFilter: headerBackdrop
        }}
      >
        <MainHeader showAlertIcon={true} />
      </motion.div>
      
      <main className="flex-1 pt-16 overflow-hidden">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section with scroll reveal animations */}
        <ScrollRevealSection>
          <FeaturesSection />
        </ScrollRevealSection>
        
        {/* Divider with animation */}
        <div className="relative flex justify-center py-10">
          <motion.div 
            className="w-24 h-px bg-gradient-to-r from-transparent via-needl-primary/30 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
        </div>
        
        {/* Testimonials with staggered reveal */}
        <ScrollRevealSection direction="up" staggerChildren={0.2}>
          <TestimonialsSection />
        </ScrollRevealSection>
        
        {/* CTA Section with stronger animation */}
        <ScrollRevealSection direction="none" threshold={0.3}>
          <CTASection />
        </ScrollRevealSection>
      </main>
      
      {/* Footer with subtle entrance animation */}
      <motion.footer 
        className="bg-gray-50 py-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <motion.div 
                className="text-2xl font-bold text-needl-primary"
                whileHover={{ scale: 1.05 }}
              >
                needl.ai
              </motion.div>
              <p className="text-gray-600 mt-2">Transforming data into decisions</p>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 hover:text-needl-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-needl-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-needl-primary transition-colors">
                About
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Needl.ai - All rights reserved.
          </div>
        </div>
      </motion.footer>
      
      {/* Floating scroll to top button that appears after scrolling */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 rounded-full bg-needl-primary/90 text-white z-40 shadow-md hover:bg-needl-primary transition-colors"
        initial={{ opacity: 0, y: 80 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
          y: scrollYProgress.get() > 0.2 ? 0 : 80,
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowDown className="h-5 w-5 rotate-180" />
      </motion.button>
      
      <CustomToaster />
    </div>
  );
};

export default Landing;
