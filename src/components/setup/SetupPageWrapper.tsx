
import React from 'react';
import { motion } from 'framer-motion';
import MainHeader from '../MainHeader';
import AnimatedBackground from '../AnimatedBackground';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <div className="h-screen flex flex-col overflow-hidden">
      <MainHeader />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatedBackground variant={backgroundVariant} />
        
        <ScrollArea className="h-full w-full">
          <div className="container mx-auto py-3 px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-3">
                <h2 className="text-xl font-bold mb-1 bg-gradient-to-r from-needl-dark to-needl-primary bg-clip-text text-transparent">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-slate-600 max-w-xl mx-auto text-sm">
                    {subtitle}
                  </p>
                )}
              </div>
              
              {children}
            </motion.div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default SetupPageWrapper;
