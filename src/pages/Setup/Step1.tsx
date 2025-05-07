import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Crosshair, Lightbulb, Check, Info } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Chip } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import { useApp } from '../../context/AppContext';
import { useToast } from '@/hooks/use-toast';
import SetupPageWrapper from '../../components/setup/SetupPageWrapper';
import SetupStepIndicator from '../../components/setup/SetupStepIndicator';
import SetupTransition from '../../components/setup/SetupTransition';
import SetupNavButtons from '../../components/setup/SetupNavButtons';
import { CustomToaster } from '@/components/ui/custom-toaster';

const Step1: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateSetupState } = useApp();
  const { setupState } = state;
  const { toast } = useToast();
  
  const [query, setQuery] = useState(setupState.setupQuery || '');
  const [targetEntities, setTargetEntities] = useState<string[]>([]);
  const [trackingCriteria, setTrackingCriteria] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showTips, setShowTips] = useState(false);
  
  // Example queries based on persona types
  const exampleQueries = {
    trader: "Track crude oil price movements, supply changes in OPEC countries, and regulatory impacts on energy futures markets",
    analyst: "Monitor Tesla's quarterly earnings, analyst ratings changes, and market share in the EV industry compared to competitors",
    researcher: "Follow AI regulation developments in the EU, ML research breakthroughs, and adoption rates in healthcare sector"
  };

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
        ['trends', 'analysis', 'performance', 'launch', 'movement', 'change', 'growth', 'decline', 'innovation', 
         'competitor', 'market', 'price', 'supply', 'demand', 'regulatory', 'earnings', 'report', 'forecast'].some(
          criterion => word.toLowerCase().includes(criterion.toLowerCase())
        )
      );
      
      setTargetEntities([...new Set(potentialEntities.map(e => e.replace(/[,.;]/g, '')))]);
      setTrackingCriteria([...new Set(potentialCriteria.map(c => c.replace(/[,.;]/g, '')))]);
      
      // Generate persona-specific suggestions based on the query
      generateSuggestions(text);
      
      setIsProcessing(false);
    }, 500);
  }, []);

  // Generate suggestions based on query content
  const generateSuggestions = (text: string) => {
    const lowerText = text.toLowerCase();
    const newSuggestions: string[] = [];
    
    if (lowerText.includes('oil') || lowerText.includes('energy') || lowerText.includes('price')) {
      newSuggestions.push('Add "regulatory changes" to track policy impacts');
      newSuggestions.push('Include "geopolitical events" for supply disruption insights');
    }
    
    if (lowerText.includes('earnings') || lowerText.includes('analyst') || lowerText.includes('market share')) {
      newSuggestions.push('Add "competitor announcements" to track market positioning');
      newSuggestions.push('Include "valuation metrics" for financial comparison');
    }
    
    if (lowerText.includes('regulation') || lowerText.includes('research') || lowerText.includes('technology')) {
      newSuggestions.push('Add "academic publications" to track research trends');
      newSuggestions.push('Include "patent filings" for innovation tracking');
    }
    
    if (newSuggestions.length === 0) {
      newSuggestions.push('Try adding specific entities like company names');
      newSuggestions.push('Include market sectors or technologies of interest');
    }
    
    setSuggestions(newSuggestions);
  };

  // Process the query when it changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      processQuery(query);
    }, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [query, processQuery]);
  
  const handleContinue = () => {
    if (query.trim().length < 10) {
      toast.warning("Please provide a more detailed query for better insights");
      return;
    }
    
    updateSetupState({ setupQuery: query });
    toast.success("Intelligence query saved successfully");
    navigate('/setup/step2');
  };
  
  const applyExampleQuery = (type: keyof typeof exampleQueries) => {
    setQuery(exampleQueries[type]);
    toast.info(`Applied ${type} example query`);
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
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700">
              Describe what you want to track (be specific about entities and criteria)
            </label>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center gap-1"
              onClick={() => setShowTips(!showTips)}
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
              {showTips ? 'Hide Tips' : 'Show Tips'}
            </Button>
          </div>
          
          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-3"
              >
                <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center gap-1.5">
                  <Info className="h-4 w-4" />
                  Tips for better intelligence gathering
                </h4>
                <ul className="text-xs text-amber-700 space-y-1.5 ml-5 list-disc">
                  <li>Include specific entity names (companies, technologies, markets)</li>
                  <li>Specify the type of information you need (price changes, announcements, trends)</li>
                  <li>Define your time horizon (daily updates, quarterly reports, long-term trends)</li>
                  <li>Mention your analysis objectives (competitive analysis, investment decisions, etc.)</li>
                </ul>
                <div className="mt-3 mb-1">
                  <p className="text-xs text-amber-800 font-medium mb-2">Try one of these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => applyExampleQuery('trader')}>
                      Energy Trader Example
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => applyExampleQuery('analyst')}>
                      Analyst Example
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => applyExampleQuery('researcher')}>
                      Researcher Example
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
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
            
            {suggestions.length > 0 && query.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-gray-100 pt-3"
              >
                <div className="flex items-center mb-2">
                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center mr-2">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">AI Suggestions</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={`suggestion-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="bg-green-50/50 border border-green-100 rounded-md p-2 text-sm text-green-800 flex items-center"
                    >
                      <Lightbulb className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      {suggestion}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <SetupNavButtons
          onBack={() => navigate('/use-cases')}
          onNext={handleContinue}
          isNextDisabled={!query.trim()}
        />
      </SetupTransition>
      
      {/* Add the Toaster component for feedback */}
      <CustomToaster />
    </SetupPageWrapper>
  );
};

export default Step1;
