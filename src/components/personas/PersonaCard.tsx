
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart2, Info, Globe, FileText, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  recommendations?: string[];
  insights?: string;
  actionItems?: string[];
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
  delay = 0,
  recommendations = [],
  insights,
  actionItems = []
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
  
  // Determine persona-specific styling and elements
  const getPersonaStyles = () => {
    switch (personaType) {
      case 'trader':
        return {
          gradientBg: 'bg-gradient-to-r from-amber-50 to-amber-100',
          labelColor: 'text-amber-700',
          iconBg: 'bg-amber-100',
          accentColor: 'text-amber-600',
          borderColor: 'border-amber-200'
        };
      case 'analyst':
        return {
          gradientBg: 'bg-gradient-to-r from-blue-50 to-blue-100',
          labelColor: 'text-blue-700',
          iconBg: 'bg-blue-100',
          accentColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        };
      case 'researcher':
        return {
          gradientBg: 'bg-gradient-to-r from-purple-50 to-purple-100',
          labelColor: 'text-purple-700',
          iconBg: 'bg-purple-100',
          accentColor: 'text-purple-600',
          borderColor: 'border-purple-200'
        };
      default:
        return {
          gradientBg: 'bg-gradient-to-r from-gray-50 to-gray-100',
          labelColor: 'text-gray-700',
          iconBg: 'bg-gray-100',
          accentColor: 'text-gray-600',
          borderColor: 'border-gray-200'
        };
    }
  };
  
  const styles = getPersonaStyles();

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
        <div className={`p-5 ${styles.gradientBg} bg-opacity-40`}>
          <div className="flex justify-between items-start mb-3">
            <div className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center text-xl mb-2 shadow-sm`}>
              {icon}
            </div>
            <Chip variant="outline" className="text-xs font-medium">
              {title}
            </Chip>
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{alert}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          
          {insights && (
            <div className="mb-4 p-2.5 rounded-md bg-white bg-opacity-70 shadow-sm border border-gray-100">
              <h4 className={`text-sm font-medium ${styles.accentColor} flex items-center gap-1.5 mb-1`}>
                <CheckCircle className="h-4 w-4" />
                Key Insight
              </h4>
              <p className="text-xs text-gray-700">{insights}</p>
            </div>
          )}
          
          {focusAreas && focusAreas.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className={`text-xs uppercase ${styles.labelColor} mb-2 font-medium flex items-center gap-1`}>
                {getPersonaIcon()}
                {personaType === 'trader' ? 'Trading Focus Areas' : 
                 personaType === 'analyst' ? 'Analysis Priorities' : 
                 personaType === 'researcher' ? 'Research Topics' : 'Key Focus Areas'}
              </h4>
              
              <ul className="text-xs text-gray-600 space-y-1.5 mb-3">
                {focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-needl-primary flex-shrink-0`}></span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {actionItems && actionItems.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className={`text-xs uppercase ${styles.labelColor} mb-2 font-medium flex items-center gap-1`}>
                <AlertTriangle className="h-3.5 w-3.5" />
                Action Items
              </h4>
              
              <ul className="text-xs text-gray-600 space-y-1.5 mb-3">
                {actionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full ${
                      idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-amber-500' : 'bg-blue-500'
                    } flex-shrink-0`}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {metrics && metrics.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className={`text-xs uppercase ${styles.labelColor} mb-2 font-medium flex items-center gap-1`}>
                <BarChart2 className="h-3 w-3" />
                Key Metrics
              </h4>
              
              <div className="grid grid-cols-2 gap-2">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="bg-white rounded p-2 shadow-sm border border-gray-50">
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
          
          {recommendations && recommendations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className={`text-xs uppercase ${styles.labelColor} mb-2 font-medium flex items-center gap-1`}>
                <CheckCircle className="h-3.5 w-3.5" />
                Recommendations
              </h4>
              
              <ul className="text-xs text-gray-600 space-y-1.5 mb-0">
                {recommendations.slice(0, 2).map((rec, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-white p-1.5 rounded border border-gray-50">
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.accentColor} flex-shrink-0`}></span>
                    <span>{rec}</span>
                  </li>
                ))}
                {recommendations.length > 2 && (
                  <Badge variant="outline" className="text-xs">+{recommendations.length - 2} more</Badge>
                )}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default PersonaCard;
