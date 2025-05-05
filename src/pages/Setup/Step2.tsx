
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { useApp } from '../../context/AppContext';
import { useToast } from '@/hooks/use-toast';
import CloudProviderIcon from '../../components/CloudProviderIcon';
import SetupPageWrapper from '../../components/setup/SetupPageWrapper';
import SetupStepIndicator from '../../components/setup/SetupStepIndicator';
import SetupTransition from '../../components/setup/SetupTransition';
import SetupNavButtons from '../../components/setup/SetupNavButtons';
import EnhancedCard from '../../components/setup/EnhancedCard';

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const { state, toggleConnectedApp } = useApp();
  const { toast } = useToast();
  const { connectedApps } = state;
  
  // Custom connector data with updated copy
  const connectors = [
    {
      id: 'google-drive',
      name: 'Google Drive',
      description: 'Connect your Google Drive to analyze files',
      icon: <CloudProviderIcon provider="google-drive" className="w-7 h-7 text-needl-primary" />
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Connect your DropBox to analyze files',
      icon: <CloudProviderIcon provider="dropbox" className="w-7 h-7 text-needl-primary" />
    },
    {
      id: 'onedrive',
      name: 'OneDrive',
      description: 'Connect your OneDrive to analyze files',
      icon: <CloudProviderIcon provider="onedrive" className="w-7 h-7 text-needl-primary" />
    },
    {
      id: 'upload',
      name: 'File Upload',
      description: 'Upload files to analyze your them in detail',
      icon: <Upload className="w-7 h-7 text-needl-primary" />
    }
  ];
  
  // Handler for connecting apps
  const handleConnectorClick = (connectorId: string) => {
    toggleConnectedApp(connectorId);
    const connector = connectors.find(c => c.id === connectorId);
    toast.success(`${connector?.name} ${connectedApps.includes(connectorId) ? 'disconnected' : 'connected'} successfully`);
  };
  
  // Animation for document flow visualization
  const DocumentFlowAnimation = () => (
    <div className="relative w-full h-40 my-8 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-needl-lighter to-needl-primary/30 flex items-center justify-center shadow-lg border border-needl-primary/20">
        <img 
          src="/lovable-uploads/0a70d7fb-99b8-48e3-aee0-4b62df7703cc.png" 
          alt="Needl.ai" 
          className="w-10 h-10 object-contain"
        />
      </div>
      
      {/* Document Icons flowing in */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={`doc-${index}`}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-md shadow-md border border-gray-200 w-10 h-12 flex items-center justify-center"
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
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md border border-gray-200 w-10 h-10 flex items-center justify-center"
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

  return (
    <SetupPageWrapper
      title="Connect Document Sources"
      subtitle="Connect your document repositories to enhance intelligence gathering"
      backgroundVariant="network"
    >
      <SetupStepIndicator currentStep={2} />
      
      <SetupTransition>
        <DocumentFlowAnimation />
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          {connectors.map((connector) => {
            const isConnected = connectedApps.includes(connector.id);
            
            return (
              <EnhancedCard
                key={connector.id}
                isSelected={isConnected}
                onClick={() => handleConnectorClick(connector.id)}
                glassmorphism
              >
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div 
                    className={`text-3xl mb-4 w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isConnected ? 'bg-green-100' : 'bg-gray-100'
                    }`}
                  >
                    {connector.icon}
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1">{connector.name}</h3>
                  <p className="text-sm text-gray-500 text-center mb-3">{connector.description}</p>
                  
                  {isConnected ? (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 py-1 px-3">
                      <Check className="w-3 h-3 mr-1" /> Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-needl-primary border-needl-primary/30 py-1 px-3">
                      Connect
                    </Badge>
                  )}
                </CardContent>
              </EnhancedCard>
            );
          })}
        </motion.div>
        
        <SetupNavButtons
          onBack={() => navigate('/setup/step1')}
          onNext={() => navigate('/setup/step3')}
          onSkip={() => navigate('/setup/step3')}
        />
      </SetupTransition>
    </SetupPageWrapper>
  );
};

export default Step2;
