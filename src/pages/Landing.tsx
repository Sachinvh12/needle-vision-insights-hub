
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MainHeader from '../components/MainHeader';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import { CustomToaster } from '../components/ui/custom-toaster';
import ScrollRevealSection from '../components/ScrollRevealSection';
import { ChevronUp } from 'lucide-react';
import AmbientBackground from '../components/AmbientBackground';

const Landing: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Enhanced scroll animations with professional transitions
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);
  const headerBackdrop = useTransform(
    scrollYProgress, 
    [0, 0.1], 
    ['blur(0px)', 'blur(10px)']
  );
  
  // Track scroll position for refined animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Reset scroll position and update title for better UX
  useEffect(() => {
    document.title = "Needl.ai - Transform Data into Decisions";
    window.scrollTo(0, 0);
    
    // Add a class to the body for specialized landing page styling
    document.body.classList.add('landing-page');
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);

  // Professionally animated section transitions
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <AnimatePresence>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Professional enhanced header with refined scroll effects */}
        <motion.div 
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
          style={{ 
            opacity: headerOpacity,
            backdropFilter: headerBackdrop
          }}
        >
          <motion.div
            className={`transition-all duration-500 ${isScrolled ? 'bg-white/90 shadow-sm' : 'bg-transparent'}`}
          >
            <MainHeader showAlertIcon={true} />
          </motion.div>
        </motion.div>
        
        {/* Elegant ambient background */}
        <AmbientBackground 
          variant="particles" 
          intensity="medium" 
          color="primary" 
          interactive={true} 
          blur={true}
        />
        
        <main className="flex-1 pt-16 overflow-hidden">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Features Section with elegant scroll reveal animations */}
          <ScrollRevealSection 
            direction="up" 
            distance={30} 
            threshold={0.2}
            duration={0.8}
            ease="easeOut"
            staggerChildren={0.1}
          >
            <motion.div variants={sectionVariants}>
              <FeaturesSection />
            </motion.div>
          </ScrollRevealSection>
          
          {/* Elegant section divider */}
          <div className="py-16 overflow-hidden">
            <div className="container mx-auto">
              <motion.div
                className="relative h-px bg-gradient-to-r from-transparent via-needl-primary/30 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="w-2 h-2 rounded-full bg-needl-primary/40 mx-auto mt-8 mb-4" />
              </motion.div>
            </div>
          </div>
          
          {/* Testimonials with elegant staggered reveal */}
          <ScrollRevealSection 
            direction="fade" 
            staggerChildren={0.2} 
            duration={0.8}
            ease="easeOut"
            cascade={true}
          >
            <motion.div variants={sectionVariants}>
              <TestimonialsSection />
            </motion.div>
          </ScrollRevealSection>
          
          {/* CTA Section with enhanced animation */}
          <ScrollRevealSection 
            direction="scale" 
            threshold={0.25}
            duration={0.9}
          >
            <motion.div variants={sectionVariants}>
              <CTASection />
            </motion.div>
          </ScrollRevealSection>
        </main>
        
        {/* Professional footer */}
        <motion.footer 
          className="relative bg-gray-50 py-16 px-4 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
              {/* Brand column */}
              <div className="md:col-span-1">
                <motion.div 
                  className="text-2xl font-bold bg-gradient-to-r from-needl-dark to-needl-primary bg-clip-text text-transparent inline-block mb-3"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  needl.ai
                </motion.div>
                <p className="text-gray-600 mb-6">Transforming data into decisions</p>
                
                <div className="flex gap-4 mt-2">
                  {['LinkedIn', 'Twitter', 'GitHub'].map((social, i) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50"
                      whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <span className="text-xs">{social.charAt(0)}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
              
              {/* Links columns */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Product',
                    links: ['Features', 'Solutions', 'Pricing', 'Updates']
                  },
                  {
                    title: 'Resources',
                    links: ['Documentation', 'Guides', 'API Reference', 'Support']
                  },
                  {
                    title: 'Company',
                    links: ['About Us', 'Careers', 'Blog', 'Contact']
                  }
                ].map((category, i) => (
                  <div key={category.title}>
                    <motion.h3
                      className="text-lg font-semibold mb-4 text-gray-800"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      {category.title}
                    </motion.h3>
                    <ul className="space-y-2">
                      {category.links.map((item, j) => (
                        <motion.li 
                          key={item}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 + j * 0.05 }}
                        >
                          <a href="#" className="text-gray-600 hover:text-needl-primary transition-colors text-sm">
                            {item}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Elegant divider */}
            <motion.div
              className="h-px bg-gray-200 mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Copyright section */}
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
              <div>
                © {new Date().getFullYear()} Needl.ai - All rights reserved.
              </div>
              
              <div className="flex gap-6 mt-4 md:mt-0">
                {['Privacy', 'Terms', 'Cookies', 'Contact'].map((link, i) => (
                  <motion.a 
                    key={link}
                    href="#" 
                    className="text-gray-500 hover:text-needl-primary transition-colors"
                    whileHover={{ y: -2 }}
                    transition={{ type: "tween" }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Elegant background decorations */}
          <motion.div 
            className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl -z-10 opacity-25"
            style={{ 
              background: 'radial-gradient(circle at center, rgba(54, 125, 141, 0.3) 0%, rgba(255, 255, 255, 0) 70%)' 
            }}
            animate={{
              x: [10, 30, 10],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.footer>
        
        {/* Professional floating scroll-to-top button with elegant animation */}
        <AnimatePresence>
          {isScrolled && (
            <motion.button
              className="fixed bottom-8 right-8 p-3 rounded-full bg-needl-primary text-white z-40 shadow-lg hover:shadow-needl-primary/20 hover:bg-needl-dark transition-all"
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
                  scale: [1, 1.15, 1],
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
