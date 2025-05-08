
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

  // Refined container animation with professional timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: "easeOut",
        duration: 0.8
      }
    }
  };
  
  // Sophisticated provider animation with elegant movement
  const providerVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.9 
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
    }
  };

  // Elegant hover animations
  const iconContainerVariants = {
    rest: { 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.2,
        ease: "easeInOut" 
      }
    },
    hover: { 
      scale: 1.08,
      y: -6,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  const iconBackgroundVariants = {
    rest: {
      opacity: 0.1,
      scale: 1
    },
    hover: {
      opacity: 0.2,
      scale: 1.15,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const rotatingRingVariants = {
    rest: {
      opacity: 0.1,
      rotate: 0
    },
    hover: {
      opacity: 0.3,
      rotate: 90,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const pulsingRingVariants = {
    rest: {
      opacity: 0.1,
      scale: 1
    },
    hover: {
      opacity: [0.1, 0.25, 0.1],
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="mt-12 mb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-gray-500 mb-8 font-medium"
      >
        Connect with your favorite platforms
      </motion.h3>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-10 md:gap-12"
      >
        {providers.map((provider, index) => (
          <motion.div 
            key={provider.id} 
            className="flex flex-col items-center" 
            variants={providerVariants}
            custom={index}
          >
            <motion.div
              className="relative"
              variants={iconContainerVariants}
              initial="rest"
              whileHover="hover"
            >
              {/* Main icon container */}
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-3 shadow-sm relative overflow-hidden z-10"
                whileHover={{ boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
              >
                {/* Ambient background glow */}
                <motion.div 
                  className="absolute inset-0 bg-needl-primary/10 rounded-full"
                  variants={iconBackgroundVariants}
                />
                
                <CloudProviderIcon 
                  provider={provider.id as any} 
                  className="w-8 h-8 relative z-20" 
                />
              </motion.div>
              
              {/* Decorative rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-needl-primary/5"
                variants={rotatingRingVariants}
              />
              
              {/* Pulsing outer ring */}
              <motion.div
                className="absolute -inset-2 rounded-full border border-needl-primary/10"
                variants={pulsingRingVariants}
              />
            </motion.div>
            
            <motion.span 
              className="text-sm text-gray-700 font-medium"
            >
              {provider.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Elegant section separator */}
      <motion.div
        className="mt-14 flex justify-center"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-needl-primary/30 to-transparent" />
      </motion.div>
    </motion.div>
  );
};

export default CloudProvidersSection;
