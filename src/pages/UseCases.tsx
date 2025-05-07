
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BarChart2, TrendingUp, FileSearch, Info, Calendar, BookOpen, Globe } from 'lucide-react';
import MainHeader from '../components/MainHeader';
import AnimatedBackground from '../components/AnimatedBackground';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useApp } from '../context/AppContext';
import { PersonaInsight } from '@/types/feedTypes';

const UseCases: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const {
    updateSetupState
  } = useApp();
  
  const personaInsights: Record<string, PersonaInsight> = {
    'persona-1': {
      title: "Energy Trading Intelligence",
      description: "Real-time market signals with predictive supply-demand modeling",
      actionItems: [
        "Track price volatility across energy futures markets",
        "Monitor geopolitical events affecting supply chains",
        "Analyze regulatory changes impacting energy trading",
        "Evaluate storage level reports and seasonal forecasts"
      ],
      metrics: [
        {
          label: "WTI Crude",
          value: "$72.18",
          trend: "up"
        },
        {
          label: "Volatility",
          value: "32%",
          trend: "up"
        },
        {
          label: "Supply Risk",
          value: "Moderate",
          trend: "neutral"
        },
        {
          label: "Sentiment",
          value: "Bullish",
          trend: "up"
        }
      ],
      recommendations: [
        "Set up real-time alerts for OPEC+ production announcements",
        "Configure price movement notifications for key energy futures",
        "Establish geopolitical risk monitoring for major producing regions"
      ]
    },
    'persona-2': {
      title: "Financial Analysis Suite",
      description: "Comprehensive financial metrics with earnings sentiment analysis",
      actionItems: [
        "Analyze quarterly earnings reports and transcripts",
        "Track analyst ratings and price targets",
        "Compare valuation metrics across peer companies",
        "Monitor institutional ownership changes"
      ],
      metrics: [
        {
          label: "Coverage",
          value: "421 Companies",
          trend: "up"
        },
        {
          label: "Accuracy",
          value: "92%",
          trend: "up"
        },
        {
          label: "Sentiment",
          value: "Neutral",
          trend: "neutral"
        },
        {
          label: "Earnings Beat",
          value: "73%",
          trend: "up"
        }
      ],
      recommendations: [
        "Create custom alerts for earnings surprises exceeding 10%",
        "Set up monitoring for insider trading patterns",
        "Configure comparative analysis for key financial ratios"
      ]
    },
    'persona-4': {
      title: "Market Research Intelligence",
      description: "Advanced trend analysis and regulatory insight platform",
      actionItems: [
        "Monitor regulatory developments across global markets",
        "Track patent filings and emerging technology trends",
        "Analyze academic and research publications",
        "Study market adoption rates and diffusion patterns"
      ],
      metrics: [
        {
          label: "Data Sources",
          value: "2,340+",
          trend: "up"
        },
        {
          label: "Coverage",
          value: "86%",
          trend: "neutral"
        },
        {
          label: "Update Freq",
          value: "4.2 hrs",
          trend: "neutral"
        },
        {
          label: "AI Analysis",
          value: "Enabled",
          trend: "up"
        }
      ],
      recommendations: [
        "Configure specialized alerts for regulatory changes in key markets",
        "Establish technology trend tracking for emerging innovations",
        "Set up competitive intelligence monitoring for patent activities"
      ]
    }
  };

  // Simplified persona data focused on our three key personas
  const mockPersonas = [
    {
      id: 'persona-1',
      title: 'Energy Trader',
      description: 'Track market movements, price trends, regulatory shifts, and supply-demand dynamics for energy investment decisions.',
      icon: <TrendingUp className="h-6 w-6 text-amber-500" />,
      personaType: 'trader',
      defaultQuery: 'Energy futures price movements, supply-demand dynamics, and regulatory impacts on energy markets',
    },
    {
      id: 'persona-2',
      title: 'Junior Analyst',
      description: 'Monitor company financials, earnings reports, analyst ratings, and market performance for comprehensive portfolio analysis.',
      icon: <BarChart2 className="h-6 w-6 text-blue-500" />,
      personaType: 'analyst',
      defaultQuery: 'Financial statements, earnings transcripts, analyst ratings, and valuation metrics',
    },
    {
      id: 'persona-4',
      title: 'Researcher',
      description: 'Access comprehensive data on market trends, emerging technologies, competitive intelligence, and regulatory developments.',
      icon: <Globe className="h-6 w-6 text-purple-500" />,
      personaType: 'researcher',
      defaultQuery: 'Regulatory changes, emerging technologies, academic publications, and market trends',
    }
  ];

  const handlePersonaSelect = (personaId: string) => {
    const persona = mockPersonas.find(p => p.id === personaId);
    if (persona) {
      // Map our new personas to the existing persona types in the system
      const personaTypeMap: {[key: string]: string} = {
        'persona-1': 'investor',
        'persona-2': 'product',
        'persona-4': 'researcher'
      };
      
      updateSetupState({
        selectedPersona: personaId,
        setupQuery: persona.defaultQuery,
        personaType: personaTypeMap[personaId] as 'investor' | 'product' | 'researcher'
      });
      navigate('/setup/step1');
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      updateSetupState({
        setupQuery: searchQuery
      });
      navigate('/setup/step1');
    }
  };

  // Animation variants
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: {
      y: 20,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Custom icons with animation/glitter effect for each persona
  const PersonaIcon: React.FC<{
    iconType: string;
    personaType: string;
  }> = ({
    iconType,
    personaType
  }) => {
    let iconContent;
    let bgColor;
    
    switch (personaType) {
      case 'trader':
        // Energy Trader
        iconContent = <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17L9 11L13 15L21 7" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-shimmer" />
                <circle cx="20" cy="8" r="2" fill="#B45309" className="animate-pulse-glow" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50"></div>
          </div>;
        bgColor = "bg-amber-50";
        break;
      case 'analyst':
        // Financial Analyst
        iconContent = <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="12" width="4" height="8" rx="1" fill="#2563EB" fillOpacity="0.3" />
                <rect x="10" y="8" width="4" height="12" rx="1" fill="#2563EB" fillOpacity="0.5" className="animate-pulse-glow" />
                <rect x="17" y="4" width="4" height="16" rx="1" fill="#2563EB" fillOpacity="0.7" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50"></div>
          </div>;
        bgColor = "bg-blue-50";
        break;
      case 'researcher':
        // Market Researcher
        iconContent = <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" className="animate-spin-slow" />
                <path d="M12 3V5M12 19V21M3 12H5M19 12H21M18.364 5.636L16.95 7.05M7.05 16.95L5.636 18.364M18.364 18.364L16.95 16.95M7.05 7.05L5.636 5.636" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill="#7C3AED" fillOpacity="0.3" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-50"></div>
          </div>;
        bgColor = "bg-purple-50";
        break;
      default:
        iconContent = <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">{mockPersonas.find(p => p.id === iconType)?.icon}</div>;
        bgColor = "bg-gray-50";
    }
    
    return <div className={`p-3 rounded-full ${bgColor} flex items-center justify-center shiny-border overflow-hidden`}>
        {iconContent}
      </div>;
  };
  
  return <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 relative">
        <AnimatedBackground variant="subtle" />
        
        <div className="container mx-auto py-16 px-4 relative z-10">
          <motion.h1 
            className="text-3xl font-bold text-center mb-3" 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Intelligence for Every Role
          </motion.h1>
          
          <motion.p
            className="text-center text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Select your role to get intelligence specifically tailored to your needs, or describe your custom intelligence requirements below.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="text" 
                placeholder="Describe what you want to track (e.g., energy markets, financial metrics, regulatory changes...)" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="pr-10 py-6 text-lg rounded-lg border-needl-lighter focus:border-needl-primary focus:ring focus:ring-needl-lighter transition-all duration-300" 
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-needl-primary hover:text-needl-dark transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-needl-primary/30 via-needl-primary to-needl-primary/30 animate-shimmer bg-[length:200%_100%]"></div>
              </div>
            </form>
          </motion.div>
          
          <motion.div 
            variants={container} 
            initial="hidden" 
            animate="show" 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {mockPersonas.map((persona, index) => {
              const insight = personaInsights[persona.id];
              const personaType = persona.personaType;
              
              return (
                <motion.div 
                  key={persona.id} 
                  variants={item} 
                  whileHover={{
                    y: -5,
                    transition: {
                      duration: 0.2
                    }
                  }} 
                  className="h-full"
                >
                  <Card 
                    className="cursor-pointer h-full transition-all duration-300 hover:shadow-lg border-needl-lighter hover:border-needl-primary glaze" 
                    onClick={() => handlePersonaSelect(persona.id)}
                  >
                    <CardHeader className="flex flex-col items-center pb-4">
                      <PersonaIcon iconType={persona.id} personaType={personaType} />
                      <div className="mt-4 flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-needl-dark">{persona.title}</h3>
                        {insight && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            AI Enhanced
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 text-center mb-4">{persona.description}</p>
                      
                      {insight && (
                        <div className="mt-2 pt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-xs uppercase text-gray-500 font-medium flex items-center gap-1">
                              {personaType === 'trader' && <Calendar className="h-3 w-3" />}
                              {personaType === 'analyst' && <BarChart2 className="h-3 w-3" />}
                              {personaType === 'researcher' && <BookOpen className="h-3 w-3" />}
                              Key Focus Areas
                            </h4>
                          </div>
                          
                          <ul className="text-xs text-gray-600 space-y-1 mb-3">
                            {insight.actionItems.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-needl-primary flex-shrink-0"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {insight.metrics.slice(0, 4).map((metric, idx) => (
                              <div key={idx} className="bg-gray-50 rounded p-2">
                                <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                                <div className="flex items-center justify-between">
                                  <div className="font-semibold text-sm">{metric.value}</div>
                                  {metric.trend && (
                                    <div>
                                      {metric.trend === 'up' ? (
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                      ) : metric.trend === 'down' ? (
                                        <BarChart2 className="h-3 w-3 text-red-500" />
                                      ) : (
                                        <FileSearch className="h-3 w-3 text-blue-500" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
    </div>;
};

export default UseCases;
