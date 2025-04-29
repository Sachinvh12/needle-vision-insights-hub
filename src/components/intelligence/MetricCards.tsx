
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Info, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MetricCardsProps {
  totalAlerts: number;
  unreadAlerts: number;
  highImportanceAlerts: number;
}

const MetricCards: React.FC<MetricCardsProps> = ({ 
  totalAlerts, 
  unreadAlerts, 
  highImportanceAlerts 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center hover:shadow-md transition-all duration-300"
      >
        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-sm">
          <Badge className="h-6 w-6 flex items-center justify-center rounded-full text-white bg-blue-500">
            {totalAlerts}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-blue-700">Total Alerts</p>
          <p className="text-xl font-semibold text-blue-900">{totalAlerts}</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-center hover:shadow-md transition-all duration-300"
      >
        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-sm">
          <Info className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <p className="text-sm text-amber-700">Unread Alerts</p>
          <p className="text-xl font-semibold text-amber-900">{unreadAlerts}</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-red-50 p-4 rounded-lg border border-red-100 flex items-center hover:shadow-md transition-all duration-300"
      >
        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-sm">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <p className="text-sm text-red-700">High Importance</p>
          <p className="text-xl font-semibold text-red-900">{highImportanceAlerts}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default MetricCards;
