
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface SetupNavButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
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
      className="flex justify-between mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {onBack ? (
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      <div className="space-x-3">
        {onSkip && !isLastStep && (
          <Button
            variant="outline"
            onClick={onSkip}
            className="text-gray-500"
          >
            Skip this step
          </Button>
        )}
        
        <Button
          onClick={onNext}
          disabled={isNextDisabled || isSubmitting}
          className="gap-2 bg-gradient-to-r from-needl-primary to-needl-dark hover:from-needl-dark hover:to-needl-primary text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              {isLastStep ? 'Complete Setup' : 'Continue'}
              {isLastStep ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default SetupNavButtons;
