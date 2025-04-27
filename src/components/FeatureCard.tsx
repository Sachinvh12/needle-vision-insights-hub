
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  animationId: string;
  iconColor: string;
  bgColor: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  animationId,
  iconColor,
  bgColor,
  index
}) => {
  // Animation variants for the cards
  const variants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: i * 0.1
      }
    })
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      custom={index}
      className="h-full"
    >
      <Card className="border border-gray-200 hover:border-needl-lighter h-full transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4 mb-2">
            <div className={`p-3 rounded-lg ${bgColor}`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
          <CardDescription className="text-base text-gray-600 mt-1">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center h-32 md:h-40">
            <div id={animationId} className="feature-animation w-full h-full flex items-center justify-center">
              <motion.div 
                className="feature-animation-inner relative w-4/5 h-4/5"
                animate={getAnimationForId(animationId)}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                {renderAnimationContent(animationId, iconColor)}
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const getAnimationForId = (id: string) => {
  switch(id) {
    case "real-time":
      return {
        scale: [1, 1.05, 1],
        rotate: [0, 5, 0, -5, 0]
      };
    case "personalized":
      return {
        y: [0, -10, 0]
      };
    case "integrated":
      return {
        rotate: [0, 360],
        transition: { duration: 10, repeat: Infinity, ease: "linear" }
      };
    case "actionable":
      return {
        scale: [1, 1.05, 1]
      };
    default:
      return {};
  }
};

const renderAnimationContent = (id: string, color: string) => {
  switch(id) {
    case "real-time":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle 
            cx="50" 
            cy="50" 
            r="45" 
            stroke={color.replace('text-', '')} 
            strokeWidth="2" 
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          />
          <motion.line 
            x1="50" 
            y1="50" 
            x2="75" 
            y2="50" 
            stroke={color.replace('text-', '')} 
            strokeWidth="3"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <motion.line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="30" 
            stroke={color.replace('text-', '')} 
            strokeWidth="2"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50px 50px' }}
          />
        </svg>
      );
    case "personalized":
      return (
        <div className="grid grid-cols-3 gap-2 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
            <motion.div
              key={i}
              className={`h-8 rounded ${i % 3 === 0 ? 'bg-' + color.replace('text-', '') : 'bg-gray-200'}`}
              initial={{ y: 0 }}
              animate={{ y: i % 3 === 0 ? -5 : 0 }}
              transition={{ 
                delay: i * 0.1, 
                duration: 1, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      );
    case "integrated":
      return (
        <div className="relative w-full h-full">
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-dashed"
            style={{ borderColor: color.replace('text-', '') }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2"
            style={{ borderColor: color.replace('text-', '') }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
            style={{ backgroundColor: color.replace('text-', '') }}
          />
        </div>
      );
    case "actionable":
      return (
        <div className="flex justify-between w-full h-full items-center">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className={`h-20 w-6 rounded-full ${i === 2 ? 'bg-' + color.replace('text-', '') : 'bg-gray-200'}`}
              initial={{ height: 40 }}
              animate={{ height: [40, 70, 40] }}
              transition={{ 
                delay: i * 0.2,
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
      );
    default:
      return <div className={`w-12 h-12 rounded-full bg-${color.replace('text-', '')}`} />;
  }
};

export default FeatureCard;
