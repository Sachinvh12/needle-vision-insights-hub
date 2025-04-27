
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { FileText, Database, Folder, ChevronRight } from 'lucide-react';
import CloudProviderIcon from '../components/CloudProviderIcon';
import PersonaSection from '../components/personas/PersonaSection';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;

  // Animated dots for the intelligence processing visualization with faster animations
  const IntelligenceDots = () => (
    <div className="relative w-full max-w-3xl mx-auto my-6 lg:my-8 h-[180px]">
      <motion.div
        className="absolute top-1/4 left-1/4 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          🌐
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute top-1/4 left-1/2 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      >
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
        >
          <FileText className="h-5 w-5 text-green-600" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute top-1/4 right-1/4 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 }}
        >
          <Database className="h-5 w-5 text-purple-600" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-needl-primary flex items-center justify-center shadow-xl z-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.3,
          scale: {
            times: [0, 0.7, 1],
            type: "spring",
            stiffness: 300,
            damping: 15
          }
        }}
      >
        <img 
          src="/lovable-uploads/0a70d7fb-99b8-48e3-aee0-4b62df7703cc.png" 
          alt="Needl.ai" 
          className="w-8 h-8 object-contain"
        />
      </motion.div>
      
      {/* Connecting lines with faster animations */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <motion.line
          x1="25%" y1="25%" x2="50%" y2="50%"
          stroke="#367d8d"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.25, delay: 0.4 }}
        />
        <motion.line
          x1="50%" y1="25%" x2="50%" y2="50%"
          stroke="#367d8d"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.25, delay: 0.45 }}
        />
        <motion.line
          x1="75%" y1="25%" x2="50%" y2="50%"
          stroke="#367d8d"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.25, delay: 0.5 }}
        />
      </svg>
      
      {/* Battlecards fanning out with faster animations */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.6 }}
      >
        <motion.div
          className="w-28 h-16 bg-white border border-needl-lighter rounded-md shadow-md p-2 -rotate-12 origin-bottom-left absolute left-0"
          initial={{ rotate: 0, x: 30 }}
          animate={{ rotate: -12, x: 0 }}
          transition={{ duration: 0.25, delay: 0.7 }}
        >
          <div className="h-2 w-14 bg-red-100 rounded mb-1"></div>
          <div className="h-2 w-20 bg-gray-100 rounded mb-1"></div>
          <div className="h-2 w-16 bg-gray-100 rounded"></div>
        </motion.div>
        
        <motion.div
          className="w-28 h-16 bg-white border border-needl-lighter rounded-md shadow-md p-2 z-10"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.8 }}
        >
          <div className="h-2 w-14 bg-needl-lighter rounded mb-1"></div>
          <div className="h-2 w-20 bg-gray-100 rounded mb-1"></div>
          <div className="h-2 w-16 bg-gray-100 rounded"></div>
        </motion.div>
        
        <motion.div
          className="w-28 h-16 bg-white border border-needl-lighter rounded-md shadow-md p-2 rotate-12 origin-bottom-right absolute right-0"
          initial={{ rotate: 0, x: -30 }}
          animate={{ rotate: 12, x: 0 }}
          transition={{ duration: 0.25, delay: 0.9 }}
        >
          <div className="h-2 w-14 bg-amber-100 rounded mb-1"></div>
          <div className="h-2 w-20 bg-gray-100 rounded mb-1"></div>
          <div className="h-2 w-16 bg-gray-100 rounded"></div>
        </motion.div>
      </motion.div>
    </div>
  );

  // Cloud storage provider icons with actual icons
  const CloudProviders = () => (
    <motion.div 
      className="flex justify-center gap-8 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.0 }}
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
          <CloudProviderIcon provider="google-drive" />
        </div>
        <span className="text-xs text-gray-600">Google Drive</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
          <CloudProviderIcon provider="dropbox" />
        </div>
        <span className="text-xs text-gray-600">Dropbox</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
          <CloudProviderIcon provider="onedrive" />
        </div>
        <span className="text-xs text-gray-600">OneDrive</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header showLoginButton={!isLoggedIn} />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        
        <section className="py-12 md:py-16 px-4 relative z-10 flex flex-col items-center">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-needl-primary to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Turning Information into Intelligence
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Needl.ai consolidates insights from the web and your documents, 
              providing real-time intelligence for confident decision making.
            </motion.p>

            <IntelligenceDots />
            
            <CloudProviders />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8"
            >
              <Button 
                onClick={() => navigate('/use-cases')}
                className="bg-needl-primary hover:bg-needl-dark text-white px-8 py-6 rounded-md text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Get Started <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </motion.div>
            
            <PersonaSection />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
