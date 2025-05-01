import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainHeader from '../../components/MainHeader';
import AnimatedBackground from '../../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Check, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockConnectors } from '../../utils/mockData';

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const { state, toggleConnectedApp } = useApp();
  const { connectedApps } = state;
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };
  
  // Animation for document flow visualization
  const DocumentFlowAnimation = () => (
    <div className="relative w-full h-40 my-8 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-needl-lighter flex items-center justify-center">
        <img 
          src="/lovable-uploads/0a70d7fb-99b8-48e3-aee0-4b62df7703cc.png" 
          alt="Needl.ai" 
          className="w-8 h-8 object-contain"
        />
      </div>
      
      {/* Document Icons flowing in */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={`doc-${index}`}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded shadow-sm border border-gray-200 w-10 h-12 flex items-center justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ 
            x: [null, 50, 120, 200],
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "loop", 
            delay: index * 0.8,
            times: [0, 0.2, 0.5, 1]
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 3v4a1 1 0 001 1h4" stroke="#367d8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="#367d8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 9h1M9 13h6M9 17h6" stroke="#367d8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      ))}
      
      {/* Web Icons flowing in from right */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={`web-${index}`}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-sm border border-gray-200 w-10 h-10 flex items-center justify-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ 
            x: [null, -50, -120, -200],
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "loop", 
            delay: index * 0.8,
            times: [0, 0.2, 0.5, 1]
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#367d8d" strokeWidth="2" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#367d8d" strokeWidth="2" />
          </svg>
        </motion.div>
      ))}
      
      {/* Pulse rings around the center */}
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={`pulse-${index}`}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-needl-primary"
          initial={{ width: 16, height: 16, opacity: 0.8 }}
          animate={{ 
            width: [16, 120], 
            height: [16, 120], 
            opacity: [0.8, 0],
            x: ['-50%', '-50%'],
            y: ['-50%', '-50%'],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop", 
            delay: index * 0.7 
          }}
        />
      ))}
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 relative">
        <AnimatedBackground variant="subtle" />
        
        <div className="container mx-auto py-12 px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Connect Document Sources</h2>
              <p className="text-gray-600">
                Connect your document repositories to include them in intelligence gathering
              </p>
            </motion.div>
            
            <DocumentFlowAnimation />
            
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              {mockConnectors.map((connector) => {
                const isConnected = connectedApps.includes(connector.id);
                
                return (
                  <motion.div key={connector.id} variants={item}>
                    <Card 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-md overflow-hidden ${
                        isConnected ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                      onClick={() => toggleConnectedApp(connector.id)}
                    >
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <div 
                          className={`text-3xl mb-4 w-12 h-12 rounded-full flex items-center justify-center ${
                            isConnected ? 'bg-green-100' : 'bg-gray-100'
                          }`}
                        >
                          {connector.id === 'upload' ? (
                            <Upload className="w-6 h-6 text-needl-primary" />
                          ) : (
                            connector.icon
                          )}
                        </div>
                        
                        <h3 className="font-medium mb-1">{connector.name}</h3>
                        <p className="text-xs text-gray-500 text-center mb-3">{connector.description}</p>
                        
                        {isConnected ? (
                          <Badge className="bg-green-500">
                            <Check className="w-3 h-3 mr-1" /> Connected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-needl-primary">
                            Connect
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <motion.div
              className="flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="outline"
                onClick={() => navigate('/setup/step1')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/setup/step3')}
                  className="text-gray-500"
                >
                  Skip this step
                </Button>
                
                <Button
                  onClick={() => navigate('/setup/step3')}
                  className="gap-2 bg-needl-primary hover:bg-needl-dark glaze"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Step2;
