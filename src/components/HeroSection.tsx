
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataFlowVisualization from './DataFlowVisualization';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 px-4 relative z-10">
      <div className="container mx-auto text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-needl-primary to-blue-600 bg-clip-text text-transparent">
            Turning Information into Intelligence
          </h1>
          
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Needl.ai consolidates insights from the web and your documents, 
            providing real-time intelligence for confident decision making.
          </motion.p>
        </motion.div>

        <DataFlowVisualization />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-10"
        >
          <Button 
            onClick={() => navigate('/use-cases')}
            className="bg-needl-primary hover:bg-needl-dark text-white px-8 py-6 rounded-md text-lg font-medium transition-all duration-300 hover:shadow-lg"
            size="lg"
          >
            Get Started <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
