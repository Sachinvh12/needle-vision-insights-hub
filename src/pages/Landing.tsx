
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainHeader from '../components/MainHeader';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';
import CloudProviderIcon from '../components/CloudProviderIcon';
import AdvancedDataFlowVisualization from '../components/AdvancedDataFlowVisualization';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;

  // Staggered animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Always showAlertIcon as true for consistency across pages */}
      <MainHeader showAlertIcon={true} />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        
        {/* Enhanced Hero Section with our improved visualization */}
        <section className="py-16 md:py-24 px-4 relative z-10">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-needl-primary to-blue-600 bg-clip-text text-transparent">
                Turning Information into Intelligence
              </h1>
              
              <motion.p
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Needl.ai consolidates insights from your data sources in real-time, 
                empowering your team with actionable intelligence for confident decision making.
              </motion.p>
            </motion.div>

            {/* Our new advanced visualization component */}
            <AdvancedDataFlowVisualization />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-10 mt-8"
            >
              {['google-drive', 'dropbox', 'onedrive'].map((provider, index) => (
                <motion.div 
                  key={provider}
                  variants={itemVariants}
                  className="flex flex-col items-center"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-2 shadow-md">
                    <CloudProviderIcon provider={provider as any} className="w-9 h-9" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {provider === 'google-drive' ? 'Google Drive' : 
                     provider === 'dropbox' ? 'Dropbox' : 'OneDrive'}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12"
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
      </main>
    </div>
  );
};

export default Landing;
