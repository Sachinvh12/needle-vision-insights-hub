
import React from 'react';
import { motion } from 'framer-motion';

interface SetupTransitionProps {
  children: React.ReactNode;
}

const SetupTransition: React.FC<SetupTransitionProps> = ({ children }) => {
  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };
  
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default SetupTransition;
