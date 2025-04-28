import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Circle, Database, Server, Zap } from 'lucide-react';

interface DataFlowProps {
  isActive?: boolean;
  showLabels?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
  theme?: 'light' | 'dark';
  direction?: 'horizontal' | 'vertical';
  nodeSize?: 'small' | 'medium' | 'large';
}

const AdvancedDataFlowVisualization: React.FC<DataFlowProps> = ({
  isActive = true,
  showLabels = true,
  speed = 'medium',
  theme = 'light',
  direction = 'horizontal',
  nodeSize = 'medium'
}) => {
  const [isAnimating, setIsAnimating] = useState(isActive);
  
  useEffect(() => {
    setIsAnimating(isActive);
  }, [isActive]);
  
  // Calculate animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return 3;
      case 'fast': return 1;
      default: return 2;
    }
  };
  
  // Calculate node dimensions based on size
  const getNodeSize = () => {
    switch (nodeSize) {
      case 'small': return 'w-8 h-8';
      case 'large': return 'w-16 h-16';
      default: return 'w-12 h-12';
    }
  };
  
  // Theme-based styling
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        bg: 'bg-gray-800',
        text: 'text-gray-200',
        node1: 'bg-blue-600',
        node2: 'bg-purple-600',
        node3: 'bg-green-600',
        line: 'bg-gray-600',
        pulse: 'bg-blue-500'
      };
    }
    
    return {
      bg: 'bg-white',
      text: 'text-gray-800',
      node1: 'bg-blue-100',
      node2: 'bg-purple-100',
      node3: 'bg-green-100',
      line: 'bg-gray-200',
      pulse: 'bg-blue-400'
    };
  };
  
  const colors = getThemeColors();
  const duration = getDuration();
  const nodeClassName = getNodeSize();
  
  return (
    <div className={`p-6 rounded-lg ${colors.bg}`}>
      <div className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-row'} items-center justify-center gap-4`}>
        {/* Source Node */}
        <div className="flex flex-col items-center">
          <div className={`${nodeClassName} ${colors.node1} rounded-full flex items-center justify-center`}>
            <Database className={`${direction === 'vertical' ? 'h-5 w-5' : 'h-6 w-6'} ${colors.text}`} />
          </div>
          {showLabels && <span className={`mt-2 text-sm ${colors.text}`}>Source</span>}
        </div>
        
        {/* Connection Line with Animated Pulse */}
        <div className="relative flex items-center justify-center">
          <div 
            className={`${direction === 'vertical' ? 'h-16 w-1' : 'w-16 h-1'} ${colors.line} rounded-full`}
          ></div>
          
          {isAnimating && (
            <motion.div
              className={`absolute ${direction === 'vertical' ? 'w-2 h-2' : 'h-2 w-2'} ${colors.pulse} rounded-full`}
              animate={{
                [direction === 'vertical' ? 'y' : 'x']: [0, direction === 'vertical' ? 16 : 16],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
        
        {/* Processing Node */}
        <div className="flex flex-col items-center">
          <div className={`${nodeClassName} ${colors.node2} rounded-full flex items-center justify-center`}>
            <Zap className={`${direction === 'vertical' ? 'h-5 w-5' : 'h-6 w-6'} ${colors.text}`} />
          </div>
          {showLabels && <span className={`mt-2 text-sm ${colors.text}`}>Process</span>}
        </div>
        
        {/* Connection Line with Animated Pulse */}
        <div className="relative flex items-center justify-center">
          <div 
            className={`${direction === 'vertical' ? 'h-16 w-1' : 'w-16 h-1'} ${colors.line} rounded-full`}
          ></div>
          
          {isAnimating && (
            <motion.div
              className={`absolute ${direction === 'vertical' ? 'w-2 h-2' : 'h-2 w-2'} ${colors.pulse} rounded-full`}
              animate={{
                [direction === 'vertical' ? 'y' : 'x']: [0, direction === 'vertical' ? 16 : 16],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: duration / 3
              }}
            />
          )}
        </div>
        
        {/* Destination Node */}
        <div className="flex flex-col items-center">
          <div className={`${nodeClassName} ${colors.node3} rounded-full flex items-center justify-center`}>
            <Server className={`${direction === 'vertical' ? 'h-5 w-5' : 'h-6 w-6'} ${colors.text}`} />
          </div>
          {showLabels && <span className={`mt-2 text-sm ${colors.text}`}>Output</span>}
        </div>
      </div>
    </div>
  );
};

export default AdvancedDataFlowVisualization;
