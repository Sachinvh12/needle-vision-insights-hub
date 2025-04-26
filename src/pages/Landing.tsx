
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { FileText, Database, Cloud } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;

  // Animated dots for the intelligence processing visualization
  const IntelligenceDots = () => (
    <div className="relative w-full max-w-3xl mx-auto my-8">
      <motion.div
        className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🌐
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute top-1/4 left-1/2 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
        >
          <FileText className="h-6 w-6 text-green-600" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
        >
          <Cloud className="h-6 w-6 text-purple-600" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-needl-primary flex items-center justify-center shadow-xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
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
          className="w-10 h-10 object-contain"
        />
      </motion.div>
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <motion.line
          x1="25%" y1="50%" x2="50%" y2="50%"
          stroke="#367d8d"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.line
          x1="50%" y1="25%" x2="50%" y2="50%"
          stroke="#367d8d"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        />
        <motion.line
          x1="75%" y1="50%" x2="50%" y2="50%"
          stroke="#367d8d"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        />
      </svg>
      
      {/* Battlecards fanning out */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          className="w-32 h-20 bg-white border border-needl-lighter rounded-md shadow-md p-2 -rotate-12 origin-bottom-left absolute left-0"
          initial={{ rotate: 0, x: 50 }}
          animate={{ rotate: -12, x: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
        >
          <div className="h-2 w-16 bg-red-100 rounded mb-1"></div>
          <div className="h-2 w-24 bg-gray-100 rounded mb-1"></div>
          <div className="h-2 w-20 bg-gray-100 rounded"></div>
        </motion.div>
        
        <motion.div
          className="w-32 h-20 bg-white border border-needl-lighter rounded-md shadow-md p-2 z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
        >
          <div className="h-2 w-16 bg-needl-lighter rounded mb-1"></div>
          <div className="h-2 w-24 bg-gray-100 rounded mb-1"></div>
          <div className="h-2 w-20 bg-gray-100 rounded"></div>
        </motion.div>
        
        <motion.div
          className="w-32 h-20 bg-white border border-needl-lighter rounded-md shadow-md p-2 rotate-12 origin-bottom-right absolute right-0"
          initial={{ rotate: 0, x: -50 }}
          animate={{ rotate: 12, x: 0 }}
          transition={{ duration: 0.4, delay: 1.5 }}
        >
          <div className="h-2 w-16 bg-amber-100 rounded mb-1"></div>
          <div className="h-2 w-24 bg-gray-100 rounded mb-1"></div>
          <div className="h-2 w-20 bg-gray-100 rounded"></div>
        </motion.div>
      </motion.div>
      
      {/* Text Overlays */}
      <motion.div
        className="absolute top-10 left-20 bg-white/90 backdrop-blur-sm border border-needl-lighter rounded-md shadow-sm p-2 max-w-[150px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.7 }}
      >
        <div className="text-xs font-medium text-needl-dark">Analyst</div>
        <div className="text-xs text-gray-600">Alert: TechCorp stock jumped 5% after earnings</div>
      </motion.div>
      
      <motion.div
        className="absolute top-0 right-1/2 bg-white/90 backdrop-blur-sm border border-needl-lighter rounded-md shadow-sm p-2 max-w-[150px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.8 }}
      >
        <div className="text-xs font-medium text-needl-dark">Product</div>
        <div className="text-xs text-gray-600">Update: Competitor launched new AI-powered feature</div>
      </motion.div>
      
      <motion.div
        className="absolute top-10 right-20 bg-white/90 backdrop-blur-sm border border-needl-lighter rounded-md shadow-sm p-2 max-w-[150px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.9 }}
      >
        <div className="text-xs font-medium text-needl-dark">Sales</div>
        <div className="text-xs text-gray-600">Signal: Target account hired new CTO from industry leader</div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-needl-lighter rounded-md shadow-sm p-2 max-w-[150px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 2.0 }}
      >
        <div className="text-xs font-medium text-needl-dark">Research</div>
        <div className="text-xs text-gray-600">Insight: New market trend identified in latest reports</div>
      </motion.div>
    </div>
  );

  // Cloud storage provider icons
  const CloudProviders = () => (
    <motion.div 
      className="flex justify-center gap-8 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 2.3 }}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M19 12h-7m0 0 3-3m-3 3 3 3M5 12l3-3M5 12l3 3M5 12H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-1" />
          </svg>
        </div>
        <span className="text-xs text-gray-600">Google Drive</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="M7 18a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4V8H7v10z" />
            <path d="M10 8V6a2 2 0 1 1 4 0v2" />
            <path d="M21 12h-3l1-5" />
            <path d="M3 12h3l-1-5" />
          </svg>
        </div>
        <span className="text-xs text-gray-600">Dropbox</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
            <path d="M14 22H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v7" />
            <path d="M15 2H3v15" />
          </svg>
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
        
        <section className="py-16 px-4 relative z-10 flex flex-col items-center">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Turning Information into 
              <span className="text-needl-primary"> Intelligence</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Needl.ai consolidates insights from the web and your documents, 
              providing real-time intelligence for confident decision making.
            </motion.p>

            <IntelligenceDots />
            
            <CloudProviders />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="mt-8"
            >
              <Button 
                onClick={() => navigate('/use-cases')}
                className="bg-needl-primary hover:bg-needl-dark text-white px-8 py-6 rounded-md text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
