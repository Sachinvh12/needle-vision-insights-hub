
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`p-6 border-l-4 ${color} hover:shadow-lg transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && (
              <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}% from last period
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color.replace('border', 'bg')}/10`}>
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
