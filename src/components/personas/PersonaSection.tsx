
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Search, Users, BookOpen, AlertCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';

// Enhanced persona data with better descriptions and alert examples
const personas = [
  {
    id: 'energy-trader',
    title: 'Energy Trader',
    description: 'Track market movements, competitor activities, and financial performance for energy investment decisions.',
    icon: <TrendingUp className="h-6 w-6 text-amber-500" />,
    alert: {
      title: 'Crude Oil Faces Supply Surge',
      description: 'OPEC+ weighs June output increase amid market volatility',
      color: 'bg-amber-100 text-amber-800'
    }
  },
  {
    id: 'junior-analyst',
    title: 'Junior Analyst',
    description: 'Monitor financial movements, market shifts, and opportunity discovery for comprehensive portfolio analysis.',
    icon: <Search className="h-6 w-6 text-blue-500" />,
    alert: {
      title: 'Private Equity Deals Spike',
      description: 'Harvard, Prestige Hospitality, Max Estates drive liquidity shifts',
      color: 'bg-blue-100 text-blue-800'
    }
  },
  {
    id: 'sdr',
    title: 'SDR',
    description: 'Identify sales opportunities, track potential clients, and receive alerts on relevant market openings.',
    icon: <Users className="h-6 w-6 text-green-500" />,
    alert: {
      title: 'Hospitality Sector Heats Up',
      description: 'New IPOs and acquisitions open fresh sales opportunities',
      color: 'bg-green-100 text-green-800'
    }
  },
  {
    id: 'researcher',
    title: 'Researcher',
    description: 'Access comprehensive data on market trends, geopolitical factors, and global industry shifts.',
    icon: <BookOpen className="h-6 w-6 text-purple-500" />,
    alert: {
      title: 'Global Oil Markets Under Pressure',
      description: 'Geopolitical shifts and oversupply concerns impact forecasts',
      color: 'bg-purple-100 text-purple-800'
    }
  }
];

const PersonaSection: React.FC = () => {
  const navigate = useNavigate();
  const { updateSetupState } = useApp();
  
  const handlePersonaSelect = (personaId: string) => {
    updateSetupState({ selectedPersona: personaId });
    navigate('/setup/step1');
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="mt-16 md:mt-24 w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Intelligence for Every Role
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tailored insights for your specific needs, delivering actionable intelligence when and where you need it.
        </p>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {personas.map((persona) => (
          <motion.div key={persona.id} variants={item}>
            <Card className="h-full border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-gray-100 rounded-md">
                    {persona.icon}
                  </div>
                  <Badge variant="secondary" className="font-normal">
                    Role-Based
                  </Badge>
                </div>
                <CardTitle className="mt-3 text-xl">{persona.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {persona.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="py-2">
                <div className={`rounded-md p-3 ${persona.alert.color} flex items-start gap-3`}>
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">{persona.alert.title}</h4>
                    <p className="text-xs mt-1">{persona.alert.description}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-2 mt-auto">
                <Button 
                  className="w-full justify-between bg-needl-primary hover:bg-needl-dark text-white"
                  onClick={() => handlePersonaSelect(persona.id)}
                >
                  Select this role
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="text-center mt-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/setup/step1')}
          className="text-needl-primary hover:text-needl-dark hover:bg-blue-50"
        >
          Custom Intelligence Setup <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default PersonaSection;
