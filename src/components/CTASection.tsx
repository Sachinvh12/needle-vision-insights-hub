
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  const benefits = [
    "Instant access to critical intelligence",
    "Comprehensive document analysis",
    "Real-time market monitoring",
    "Personalized alert system"
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-needl-primary/10 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Start Transforming <br className="hidden md:block" />
              <span className="text-needl-primary">Information into Intelligence</span>
            </h2>
            
            <p className="text-lg text-gray-700 mb-8">
              Join leading professionals who use Needl.ai to stay ahead with timely, relevant insights delivered exactly when needed.
            </p>
            
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <CheckCircle2 className="h-5 w-5 text-needl-primary mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/use-cases')}
                className="bg-needl-primary hover:bg-needl-dark text-white px-6 py-5 rounded-md text-base font-medium transition-all duration-300"
                size="lg"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                onClick={() => navigate('/login')}
                variant="outline"
                className="text-needl-primary border-needl-primary hover:bg-needl-primary/5"
                size="lg"
              >
                Request a Demo
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-needl-primary to-blue-400 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-1">
                  <img 
                    src="/lovable-uploads/0a70d7fb-99b8-48e3-aee0-4b62df7703cc.png"
                    alt="Needl.ai Dashboard Preview" 
                    className="w-full rounded-t-lg"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-semibold text-gray-900 mb-2">Actionable Intelligence Dashboard</h3>
                  <p className="text-sm text-gray-600">Visualize trends, receive alerts, and gain insights from your connected data sources in one centralized view.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
