
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
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-100 flex items-center transition-all duration-300"
      >
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mr-4 shadow-md">
          <Bell className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-700 mb-1">Total Alerts</p>
          <p className="text-2xl font-semibold text-blue-900">{totalAlerts}</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-100 flex items-center transition-all duration-300"
      >
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mr-4 shadow-md">
          <Info className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-amber-700 mb-1">Unread Alerts</p>
          <p className="text-2xl font-semibold text-amber-900">{unreadAlerts}</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 rounded-xl border border-red-100 flex items-center transition-all duration-300"
      >
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mr-4 shadow-md">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-red-700 mb-1">High Importance</p>
          <p className="text-2xl font-semibold text-red-900">{highImportanceAlerts}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default MetricCards;
