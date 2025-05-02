
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import MainHeader from '../components/MainHeader';
import AnimatedBackground from '../components/AnimatedBackground';

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
    }, 1500); // 1.5 seconds delay for animation to be visible

    return () => clearTimeout(redirectTimeout);
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <MainHeader showAlertIcon={true} />
      <AnimatedBackground variant="gradient" />
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 text-needl-primary"
            animate={{ 
              opacity: [0.6, 1, 0.6], 
              y: [0, -5, 0] 
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Redirecting...
          </motion.h1>
          <motion.div 
            className="flex justify-center space-x-2"
            animate={{ 
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            {[0, 1, 2].map(i => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-needl-primary"
                style={{ 
                  animationDelay: `${i * 0.2}s`, 
                  animation: "pulse-glow 1.5s ease-in-out infinite" 
                }} 
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
