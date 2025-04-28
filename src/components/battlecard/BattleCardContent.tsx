
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface BattleCardContentProps {
  title: string;
  content: React.ReactNode;
}

export const BattleCardContent: React.FC<BattleCardContentProps> = ({ title, content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="bg-gradient-to-r from-needl-lighter to-blue-50 p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="p-4">
          {content}
        </div>
      </Card>
    </motion.div>
  );
};
