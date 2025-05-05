
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SetupStepIndicatorProps {
  currentStep: 1 | 2 | 3;
  totalSteps?: number;
}

const SetupStepIndicator: React.FC<SetupStepIndicatorProps> = ({ 
  currentStep, 
  totalSteps = 3 
}) => {
  // Generate array of step numbers
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="py-6 px-4">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          
          // Variants for step number animation
          const stepVariants = {
            active: { scale: 1.1, transition: { duration: 0.3 } },
            inactive: { scale: 1, transition: { duration: 0.3 } }
          };
          
          return (
            <React.Fragment key={step}>
              {/* Step Circle */}
              <motion.div
                variants={stepVariants}
                animate={isActive ? 'active' : 'inactive'}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors duration-300",
                  isActive && "bg-needl-primary text-white shadow-lg shadow-needl-primary/20",
                  isCompleted && "bg-green-500 text-white",
                  !isActive && !isCompleted && "bg-gray-100 text-gray-500"
                )}
              >
                {step}
              </motion.div>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="relative w-16 mx-1">
                  <div className="absolute h-0.5 w-full bg-gray-200">
                    {(isCompleted || index === currentStep - 2) && (
                      <motion.div
                        initial={{ width: isCompleted ? "100%" : "0%" }}
                        animate={{ width: "100%" }} 
                        transition={{ duration: isCompleted ? 0 : 0.5, ease: "easeInOut" }}
                        className="absolute h-full bg-gradient-to-r from-needl-primary to-green-500"
                      />
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between mt-2 text-sm text-gray-600 max-w-sm mx-auto">
        <span className={currentStep === 1 ? "text-needl-primary font-medium" : ""}>Define</span>
        <span className={currentStep === 2 ? "text-needl-primary font-medium" : ""}>Connect</span>
        <span className={currentStep === 3 ? "text-needl-primary font-medium" : ""}>Configure</span>
      </div>
    </div>
  );
};

export default SetupStepIndicator;
