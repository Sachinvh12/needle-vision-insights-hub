
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { motion } from 'framer-motion';

export interface PersonaCardProps {
  icon: React.ReactNode;
  title: string;
  alert: string;
  description: string;
  color: string;
  onClick?: () => void;
  delay?: number;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ 
  icon, 
  title, 
  alert, 
  description, 
  color,
  onClick,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
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
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default PersonaCard;
