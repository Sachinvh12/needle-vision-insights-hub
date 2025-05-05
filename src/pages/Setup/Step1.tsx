import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Crosshair } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Chip } from '@/components/ui/chip';
import { useApp } from '../../context/AppContext';
import SetupPageWrapper from '../../components/setup/SetupPageWrapper';
import SetupStepIndicator from '../../components/setup/SetupStepIndicator';
import SetupTransition from '../../components/setup/SetupTransition';
import SetupNavButtons from '../../components/setup/SetupNavButtons';

const Step1: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateSetupState } = useApp();
  const { setupState } = state;
  
  const [query, setQuery] = useState(setupState.setupQuery || '');
  const [targetEntities, setTargetEntities] = useState<string[]>([]);
  const [trackingCriteria, setTrackingCriteria] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to extract entities and criteria from the query
  const processQuery = useCallback((text: string) => {
    if (!text.trim()) {
      setTargetEntities([]);
      setTrackingCriteria([]);
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const words = text.split(' ');
      
      // Simple extraction logic - in a real app, this would use NLP/AI
      const potentialEntities = words.filter(word => 
        word.length > 4 && 
        word.charAt(0) === word.charAt(0).toUpperCase() &&
        !['Market', 'Product', 'Company', 'Industry', 'Analysis', 'Performance'].includes(word)
      );
      
      const potentialCriteria = words.filter(word => 
        ['trends', 'analysis', 'performance', 'launch', 'movement', 'change', 'growth', 'decline', 'innovation', 'competitor', 'market'].some(
          criterion => word.toLowerCase().includes(criterion.toLowerCase())
        )
      );
      
      setTargetEntities([...new Set(potentialEntities.map(e => e.replace(/[,.;]/g, '')))]);
      setTrackingCriteria([...new Set(potentialCriteria.map(c => c.replace(/[,.;]/g, '')))]);
      setIsProcessing(false);
    }, 500);
  }, []);

  // Process the query when it changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      processQuery(query);
    }, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [query, processQuery]);
  
  const handleContinue = () => {
    updateSetupState({ setupQuery: query });
    navigate('/setup/step2');
  };
  
  return (
    <SetupPageWrapper
      title="Define Your Intelligence Needs"
      subtitle="Tell us what you want to track and we'll help you set up the perfect intelligence feed."
      backgroundVariant="subtle"
    >
      <SetupStepIndicator currentStep={1} />
      
      <SetupTransition>
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/80 p-5 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
            Describe what you want to track (be specific about entities and criteria)
          </label>
          
          <Textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., Track TechCorp's product launches, market share changes, and competitive positioning in the AI software industry"
            className="h-28 resize-none mb-5 focus:border-needl-primary focus:ring focus:ring-needl-lighter text-base"
          />
          
          <div className="space-y-5">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-7 h-7 rounded-full bg-needl-lighter flex items-center justify-center mr-2">
                  <Target className="w-4 h-4 text-needl-primary" />
                </div>
                <span className="font-medium text-gray-800">Target Entities</span>
              </div>
              
              <div className="min-h-[45px] p-3 rounded-lg bg-gray-50/80 border border-gray-100">
                <AnimatePresence>
                  {isProcessing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <div className="w-4 h-4 border-2 border-needl-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </motion.div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {targetEntities.length === 0 ? (
                        <span className="text-sm text-gray-500 italic">Entities will appear here as you type</span>
                      ) : (
                        targetEntities.map((entity, index) => (
                          <motion.div
                            key={`entity-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Chip variant="entity">{entity}</Chip>
                          </motion.div>
                        ))
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center mr-2">
                  <Crosshair className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium text-gray-800">Tracking Criteria</span>
              </div>
              
              <div className="min-h-[45px] p-3 rounded-lg bg-gray-50/80 border border-gray-100">
                <AnimatePresence>
                  {isProcessing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </motion.div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {trackingCriteria.length === 0 ? (
                        <span className="text-sm text-gray-500 italic">Criteria will appear here as you type</span>
                      ) : (
                        trackingCriteria.map((criteria, index) => (
                          <motion.div
                            key={`criteria-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Chip variant="criteria">{criteria}</Chip>
                          </motion.div>
                        ))
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
        
        <SetupNavButtons
          onBack={() => navigate('/use-cases')}
          onNext={handleContinue}
          isNextDisabled={!query.trim()}
        />
      </SetupTransition>
    </SetupPageWrapper>
  );
};

export default Step1;
