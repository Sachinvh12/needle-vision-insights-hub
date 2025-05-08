
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    }, 1500); // 1.5 seconds delay for animation to be visible

    return () => clearTimeout(redirectTimeout);
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <MainHeader showAlertIcon={true} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div 
          className="text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-needl-primary to-needl-dark flex items-center justify-center shadow-xl shadow-needl-primary/20"
            animate={{ 
              boxShadow: ['0px 0px 15px rgba(54, 125, 141, 0.3)', '0px 0px 30px rgba(54, 125, 141, 0.5)', '0px 0px 15px rgba(54, 125, 141, 0.3)']
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-needl-dark via-needl-primary to-needl-light bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            Redirecting...
          </motion.h1>
          
          <motion.div 
            className="flex justify-center space-x-2"
          >
            {[0, 1, 2].map(i => (
              <motion.div 
                key={i} 
                className="w-2.5 h-2.5 rounded-full bg-needl-primary"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  delay: i * 0.2,
                  ease: "easeInOut" 
                }} 
              />
            ))}
          </motion.div>
        </motion.div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={`bg-${index}`}
              className="absolute rounded-full mix-blend-screen bg-needl-lighter/30 blur-xl"
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
                duration: 5 + Math.random() * 15,
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
        </div>
      </div>
    </div>
  );
};

export default Index;
