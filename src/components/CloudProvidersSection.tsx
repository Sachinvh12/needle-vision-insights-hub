
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

  // Staggered animation for container elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  // Individual provider animation
  const providerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      y: -8,
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1 
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
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {providers.map((provider) => (
          <motion.div 
            key={provider.id} 
            className="flex flex-col items-center" 
            variants={providerVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-2 shadow-md relative"
              whileHover={{ boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            >
              {/* Ambient glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-needl-primary/10 blur-xl opacity-0"
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: Math.random() * 2, // Randomize the start time
                }}
              />
              <CloudProviderIcon provider={provider.id as any} className="w-9 h-9" />
            </motion.div>
            
            <motion.span 
              className="text-sm text-gray-700 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {provider.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center mt-8 text-sm text-gray-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        Connect your favorite platforms and unlock powerful insights across your ecosystem
      </motion.div>
    </motion.div>
  );
};

export default CloudProvidersSection;
