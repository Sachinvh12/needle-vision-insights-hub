
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart2, Info, Globe, FileText, Calendar } from 'lucide-react';

export interface PersonaCardProps {
  icon: React.ReactNode;
  title: string;
  alert: string;
  description: string;
  color: string;
  metrics?: Array<{
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
  focusAreas?: string[];
  personaType?: 'trader' | 'analyst' | 'researcher';
  onClick?: () => void;
  delay?: number;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ 
  icon, 
  title, 
  alert, 
  description, 
  color,
  metrics,
  focusAreas = [],
  personaType,
  onClick,
  delay = 0
}) => {
  const getPersonaIcon = () => {
    switch (personaType) {
      case 'trader':
        return <TrendingUp className="h-4 w-4 text-amber-500" />;
      case 'analyst':
        return <BarChart2 className="h-4 w-4 text-blue-500" />;
      case 'researcher':
        return <Globe className="h-4 w-4 text-purple-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card 
        className={`h-full overflow-hidden cursor-pointer transition-all hover:shadow-lg border-l-4 ${color}`}
        onClick={onClick}
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className={`w-12 h-12 rounded-full ${color.replace('border-', 'bg-')} bg-opacity-20 flex items-center justify-center text-xl mb-2`}>
              {icon}
            </div>
            <Chip variant="outline" className="text-xs font-medium">
              {title}
            </Chip>
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{alert}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          
          {focusAreas && focusAreas.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className="text-xs uppercase text-gray-500 mb-2 font-medium flex items-center gap-1">
                {getPersonaIcon()}
                {personaType === 'trader' ? 'Trading Focus Areas' : 
                 personaType === 'analyst' ? 'Analysis Priorities' : 
                 personaType === 'researcher' ? 'Research Topics' : 'Key Focus Areas'}
              </h4>
              
              <ul className="text-xs text-gray-600 space-y-1.5 mb-3">
                {focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-needl-primary flex-shrink-0"></span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {metrics && metrics.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className="text-xs uppercase text-gray-500 mb-2 font-medium flex items-center gap-1">
                <BarChart2 className="h-3 w-3" />
                Key Metrics
              </h4>
              
              <div className="grid grid-cols-2 gap-2">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="bg-gray-50 rounded p-2">
                    <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{metric.value}</div>
                      {metric.trend && (
                        <div>
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : metric.trend === 'down' ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : (
                            <Info className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default PersonaCard;
