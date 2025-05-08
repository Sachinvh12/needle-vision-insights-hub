
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
import { ChevronUp, Link, MessageSquare, Shield } from 'lucide-react';
import AmbientBackground from '../components/AmbientBackground';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Enhanced scroll animations with smoother transitions
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.97]);
  const headerBackdrop = useTransform(
    scrollYProgress, 
    [0, 0.1], 
    ['blur(0px)', 'blur(12px)']
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
    document.title = "Needl.ai - Turning Information into Intelligence";
    window.scrollTo(0, 0);
    
    // Add a class to the body for specialized landing page styling
    document.body.classList.add('landing-page');
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);

  // Footer links for improved navigation
  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#' }
  ];
  
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
          
          {/* Enhanced divider with elegant animation */}
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
          
          {/* Testimonials with elegant staggered reveal */}
          <ScrollRevealSection 
            direction="up" 
            staggerChildren={0.2} 
            distance={30}
            duration={0.8}
            easing="easeOut"
          >
            <TestimonialsSection />
          </ScrollRevealSection>
          
          {/* CTA Section with enhanced animation */}
          <ScrollRevealSection 
            direction="none" 
            threshold={0.3}
            duration={1}
          >
            <CTASection />
          </ScrollRevealSection>
        </main>
        
        {/* Elegant footer with refined animations */}
        <motion.footer 
          className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              {/* Brand column */}
              <div className="mb-8 md:mb-0">
                <motion.div 
                  className="text-2xl font-bold bg-gradient-to-r from-needl-dark to-needl-primary bg-clip-text text-transparent inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  needl.ai
                </motion.div>
                <p className="text-gray-600 mt-2 mb-4">Transforming data into decisions</p>
                
                <div className="flex gap-4 mt-4">
                  {['linkedin', 'twitter', 'github'].map((social, i) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50"
                      whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      {social === 'linkedin' && <Link className="h-4 w-4" />}
                      {social === 'twitter' && <MessageSquare className="h-4 w-4" />}
                      {social === 'github' && <Shield className="h-4 w-4" />}
                    </motion.a>
                  ))}
                </div>
              </div>
              
              {/* Links columns */}
              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                {['Solutions', 'Resources', 'Company'].map((category, i) => (
                  <div key={category}>
                    <motion.h3
                      className="text-lg font-semibold mb-4 text-gray-800"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      {category}
                    </motion.h3>
                    <ul className="space-y-2">
                      {['Features', 'Documentation', 'Pricing', 'Support'].map((item, j) => (
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
            
            {/* Copyright section with refined animation */}
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                initial={{ letterSpacing: "0em" }}
                animate={{ letterSpacing: "0.01em" }}
                transition={{ duration: 1 }}
              >
                © {new Date().getFullYear()} Needl.ai - All rights reserved.
              </motion.div>
              
              <div className="flex gap-6 mt-4 md:mt-0">
                {footerLinks.map((link, i) => (
                  <motion.a 
                    key={link.label}
                    href={link.href} 
                    className="text-gray-500 hover:text-needl-primary transition-colors relative group"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-needl-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Elegant background decorations */}
          <motion.div 
            className="absolute top-0 right-0 w-72 h-72 bg-needl-primary/5 rounded-full blur-3xl -z-10"
            animate={{
              x: [10, 30, 10],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -z-10"
            animate={{
              x: [-10, -30, -10],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.footer>
        
        {/* Enhanced floating scroll-to-top button with elegant animation */}
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
