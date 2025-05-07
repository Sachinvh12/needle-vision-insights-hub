
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Search, BookOpen, AlertCircle, ChevronRight, Calendar, BarChart2, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';

// Enhanced persona data with better descriptions and alert examples
const personas = [
  {
    id: 'energy-trader',
    title: 'Energy Trader',
    description: 'Track market movements, price trends, regulatory shifts, and supply-demand dynamics for energy investment decisions.',
    icon: <TrendingUp className="h-6 w-6 text-amber-500" />,
    personaType: 'trader',
    focusAreas: [
      "Futures pricing and volatility analysis",
      "Global supply-demand dynamics",
      "Geopolitical risk assessment",
      "Regulatory impact on energy markets"
    ],
    alert: {
      title: 'Crude Oil Futures Volatility Spike',
      description: 'OPEC+ production cuts and Middle East tensions drive 16% price swing',
      color: 'bg-amber-100 text-amber-800'
    },
    metrics: [
      { label: "WTI Price", value: "$72.18", trend: "up" },
      { label: "Volatility", value: "32%", trend: "up" }
    ]
  },
  {
    id: 'junior-analyst',
    title: 'Junior Analyst',
    description: 'Monitor company financials, earnings reports, analyst ratings, and market performance for comprehensive portfolio analysis.',
    icon: <BarChart2 className="h-6 w-6 text-blue-500" />,
    personaType: 'analyst',
    focusAreas: [
      "Earnings call transcripts analysis",
      "Financial statement interpretation",
      "Analyst rating tracking",
      "Valuation model comparisons"
    ],
    alert: {
      title: 'Tech Sector Earnings Surprise',
      description: 'Cloud revenue growth exceeds expectations by 23%, driving equity valuations higher',
      color: 'bg-blue-100 text-blue-800'
    },
    metrics: [
      { label: "Revenue Growth", value: "+8.2%", trend: "up" },
      { label: "PE Ratio", value: "24.6", trend: "neutral" }
    ]
  },
  {
    id: 'researcher',
    title: 'Researcher',
    description: 'Access comprehensive data on market trends, emerging technologies, competitive intelligence, and regulatory developments.',
    icon: <Globe className="h-6 w-6 text-purple-500" />,
    personaType: 'researcher',
    focusAreas: [
      "Industry-specific legislative tracking",
      "Emerging technology assessment",
      "Academic and scientific publications",
      "Patent and IP monitoring"
    ],
    alert: {
      title: 'Emerging Tech Regulatory Shift',
      description: 'New global framework for AI governance signals compliance challenges ahead',
      color: 'bg-purple-100 text-purple-800'
    },
    metrics: [
      { label: "Research Coverage", value: "86%", trend: "up" },
      { label: "Data Points", value: "28.4K", trend: "neutral" }
    ]
  }
];

const PersonaSection: React.FC = () => {
  const navigate = useNavigate();
  const { updateSetupState } = useApp();
  
  const handlePersonaSelect = (personaId: string) => {
    // Map our new personas to the existing persona types in the system
    const personaTypeMap: {[key: string]: string} = {
      'energy-trader': 'investor',
      'junior-analyst': 'product',
      'researcher': 'researcher'
    };
    
    updateSetupState({ 
      selectedPersona: personaId,
      personaType: personaTypeMap[personaId] as 'investor' | 'product' | 'researcher'
    });
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
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
                
                <div className="mt-4">
                  <h5 className="text-xs uppercase text-gray-500 mb-2 font-medium flex items-center gap-1">
                    {persona.personaType === 'trader' && <Calendar className="h-3 w-3" />}
                    {persona.personaType === 'analyst' && <BarChart2 className="h-3 w-3" />}
                    {persona.personaType === 'researcher' && <BookOpen className="h-3 w-3" />}
                    Focus Areas
                  </h5>
                  <ul className="space-y-1">
                    {persona.focusAreas.slice(0, 2).map((area, idx) => (
                      <li key={idx} className="flex text-xs text-gray-600">
                        <span className="mr-2 text-needl-primary">•</span>
                        {area}
                      </li>
                    ))}
                  </ul>
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
