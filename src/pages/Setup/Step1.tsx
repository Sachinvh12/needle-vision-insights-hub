
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import AnimatedBackground from '../../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Chip } from '@/components/ui/chip';
import { Target, Crosshair, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        <AnimatedBackground variant="glitter" />
        
        <div className="container mx-auto py-12 px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.h2
              className="text-2xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Define Your Intelligence Needs
            </motion.h2>
            
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
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
                className="h-32 resize-none mb-4 focus:border-needl-primary focus:ring focus:ring-needl-lighter"
              />
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Target className="w-4 h-4 text-needl-primary mr-2" />
                    <span className="text-sm font-medium text-gray-700">Target Entities</span>
                  </div>
                  
                  <div className="min-h-[40px]">
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
                            <span className="text-sm text-gray-500">Entities will appear here as you type</span>
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
                    <Crosshair className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Tracking Criteria</span>
                  </div>
                  
                  <div className="min-h-[40px]">
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
                            <span className="text-sm text-gray-500">Criteria will appear here as you type</span>
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
            
            <motion.div
              className="flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="outline"
                onClick={() => navigate('/use-cases')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={!query.trim()}
                className="gap-2 bg-needl-primary hover:bg-needl-dark glaze"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Step1;
