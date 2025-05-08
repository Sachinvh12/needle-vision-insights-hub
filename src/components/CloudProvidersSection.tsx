
import React from 'react';
import { motion } from 'framer-motion';
import CloudProviderIcon from './CloudProviderIcon';

const CloudProvidersSection: React.FC = () => {
  const providers = [
    { name: 'Google Drive', id: 'google-drive' },
    { name: 'Dropbox', id: 'dropbox' },
    { name: 'OneDrive', id: 'onedrive' },
    { name: 'Slack', id: 'slack' },
    { name: 'Notion', id: 'notion' }
  ];

  // Enhanced container animation with elegant timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        ease: "easeOut",
        duration: 0.8
      }
    }
  };
  
  // Refined provider animation with subtle elegant movement
  const providerVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.92 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 240,
        damping: 20
      }
    },
    hover: { 
      y: -6,
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  // Elegant glow animation variants
  const glowVariants = {
    idle: {
      opacity: 0.15,
      scale: 1
    },
    hover: {
      opacity: [0.15, 0.4, 0.15],
      scale: [1, 1.15, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="mt-12 mb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-wrap justify-center gap-8 md:gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {providers.map((provider, index) => (
          <motion.div 
            key={provider.id} 
            className="flex flex-col items-center" 
            variants={providerVariants}
            whileHover="hover"
            custom={index}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 20,
              delay: index * 0.04
            }}
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-3 shadow-md relative overflow-hidden"
              whileHover={{ boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
            >
              {/* Subtle ambient glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-needl-primary/5"
                variants={glowVariants}
                initial="idle"
                whileHover="hover"
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(54, 125, 141, 0)",
                    "0 0 0 8px rgba(54, 125, 141, 0.03)",
                    "0 0 0 0px rgba(54, 125, 141, 0)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
              
              {/* Subtle rotating ring */}
              <motion.div
                className="absolute w-full h-full rounded-full border border-needl-primary/10"
                animate={{
                  rotate: 360
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear"
                }}
              />
              
              <CloudProviderIcon 
                provider={provider.id as any} 
                className="w-8 h-8 relative z-10" 
              />
            </motion.div>
            
            <motion.span 
              className="text-sm text-gray-700 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.08 }}
            >
              {provider.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center mt-8 text-sm text-gray-600 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <span className="font-medium bg-gradient-to-r from-needl-primary to-needl-dark bg-clip-text text-transparent">
          Connect your favorite platforms
        </span> and unlock powerful insights across your ecosystem
      </motion.div>
    </motion.div>
  );
};

export default CloudProvidersSection;
