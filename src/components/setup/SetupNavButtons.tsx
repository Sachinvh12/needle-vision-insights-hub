
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface SetupNavButtonsProps {
  onBack?: () => void;
  onNext?: () => void; // Changed type to not require parameters
  onSkip?: () => void;
  isLastStep?: boolean;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
}

const SetupNavButtons: React.FC<SetupNavButtonsProps> = ({
  onBack,
  onNext,
  onSkip,
  isLastStep = false,
  isNextDisabled = false,
  isSubmitting = false
}) => {
  return (
    <motion.div 
      className="flex justify-between mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {onBack ? (
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm py-1 h-auto"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      <div className="space-x-2">
        {onSkip && !isLastStep && (
          <Button
            variant="outline"
            onClick={onSkip}
            className="text-gray-500 text-sm py-1 h-auto"
          >
            Skip
          </Button>
        )}
        
        <Button
          onClick={onNext}
          disabled={isNextDisabled || isSubmitting}
          className="gap-1 bg-gradient-to-r from-needl-primary to-needl-dark hover:from-needl-dark hover:to-needl-primary text-white transition-all duration-300 shadow-md hover:shadow-lg text-sm py-1 h-auto"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full mr-1"></div>
              Processing...
            </>
          ) : (
            <>
              {isLastStep ? 'Complete Setup' : 'Continue'}
              {isLastStep ? <Check className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default SetupNavButtons;
