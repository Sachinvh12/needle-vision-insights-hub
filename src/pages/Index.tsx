
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import MainHeader from '../components/MainHeader';

const Index = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;

  useEffect(() => {
    // Add a slight delay for animation to be visible
    const redirectTimeout = setTimeout(() => {
      if (isLoggedIn) {
        navigate('/dashboard');
      } else {
        navigate('/landing');
      }
    }, 1800); // 1.8 seconds delay for animation to be visible

    return () => clearTimeout(redirectTimeout);
  }, [isLoggedIn, navigate]);

  return (
    <AnimatePresence>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
        <MainHeader showAlertIcon={true} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-needl-primary to-needl-dark flex items-center justify-center shadow-xl shadow-needl-primary/20 relative"
              animate={{ 
                boxShadow: ['0px 0px 15px rgba(54, 125, 141, 0.3)', '0px 0px 30px rgba(54, 125, 141, 0.5)', '0px 0px 15px rgba(54, 125, 141, 0.3)']
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              {/* Elegant inner rotating rings */}
              <motion.div
                className="absolute w-full h-full rounded-full border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              />
              <motion.div
                className="absolute w-[90%] h-[90%] rounded-full border border-white/10"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              />
              
              {/* Center icon with subtle scale animation */}
              <motion.svg 
                width="42" 
                height="42" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-white relative z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <motion.path 
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-5 bg-gradient-to-r from-needl-dark via-needl-primary to-needl-light bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                Redirecting
              </motion.span>
              <motion.span
                animate={{ 
                  opacity: [0, 1, 0],
                  x: [0, 1, 0],
                }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >.</motion.span>
              <motion.span
                animate={{ 
                  opacity: [0, 1, 0],
                  x: [0, 1, 0], 
                }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
              >.</motion.span>
              <motion.span
                animate={{ 
                  opacity: [0, 1, 0],
                  x: [0, 1, 0], 
                }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
              >.</motion.span>
            </motion.h1>
            
            {/* Elegant loading indicator */}
            <motion.div 
              className="flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div 
                  key={i} 
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-needl-primary to-needl-dark"
                  animate={{ 
                    y: [0, -12, 0],
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    delay: i * 0.2,
                    ease: [0.76, 0, 0.24, 1]
                  }} 
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <motion.div
              className="absolute w-full h-full opacity-20"
              initial={{ backgroundPosition: '0% 0%' }}
              animate={{ backgroundPosition: '100% 100%' }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(54, 125, 141, 0.3) 0%, rgba(255, 255, 255, 0) 50%)',
                backgroundSize: '100% 100%',
              }}
            />
            
            {Array.from({ length: 15 }).map((_, index) => (
              <motion.div
                key={`bg-${index}`}
                className="absolute rounded-full mix-blend-screen bg-needl-lighter/40 backdrop-blur-xl"
                animate={{
                  x: [
                    Math.random() * 100 - 50, 
                    Math.random() * 100 - 50
                  ],
                  y: [
                    Math.random() * 100 - 50, 
                    Math.random() * 100 - 50
                  ],
                  scale: [
                    0.8 + Math.random() * 0.5,
                    1.2 + Math.random() * 0.5,
                    0.8 + Math.random() * 0.5
                  ],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 8 + Math.random() * 15,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${50 + Math.random() * 100}px`,
                  height: `${50 + Math.random() * 100}px`,
                }}
              />
            ))}
            
            {/* Elegant grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(54, 125, 141, 0.1) 1px, transparent 1px), 
                                  linear-gradient(90deg, rgba(54, 125, 141, 0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Index;
