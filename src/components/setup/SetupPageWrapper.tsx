
import React from 'react';
import { motion } from 'framer-motion';
import MainHeader from '../MainHeader';
import AnimatedBackground from '../AnimatedBackground';

interface SetupPageWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backgroundVariant?: "network" | "pulse" | "subtle" | "glitter";
}

const SetupPageWrapper: React.FC<SetupPageWrapperProps> = ({ 
  children, 
  title, 
  subtitle,
  backgroundVariant = "network" 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 relative">
        <AnimatedBackground variant={backgroundVariant} />
        
        <div className="container mx-auto py-12 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-needl-dark to-needl-primary bg-clip-text text-transparent">
                {title}
              </h2>
              {subtitle && (
                <p className="text-slate-600 max-w-xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
            
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SetupPageWrapper;
