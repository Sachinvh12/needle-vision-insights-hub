
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import MainHeader from '../components/MainHeader';
import AnimatedBackground from '../components/AnimatedBackground';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useApp } from '../context/AppContext';
import { mockPersonas } from '../utils/mockData';

const UseCases: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const {
    updateSetupState
  } = useApp();
  
  const handlePersonaSelect = (personaId: string) => {
    const persona = mockPersonas.find(p => p.id === personaId);
    if (persona) {
      updateSetupState({
        selectedPersona: personaId,
        setupQuery: persona.defaultQuery
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

  // Enhanced animation variants
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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

  // Custom icons with enhanced animation/glitter effect for each persona
  const PersonaIcon: React.FC<{
    iconType: string;
  }> = ({
    iconType
  }) => {
    let iconContent;
    let bgColor;
    let iconColor = "#367d8d";
    
    switch (iconType) {
      case 'persona-1':
        // Investment Analyst
        bgColor = "bg-gradient-to-br from-blue-50 to-green-50";
        iconContent = <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17L9 11L13 15L21 7" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-shimmer" />
                <circle cx="20" cy="8" r="2" fill={iconColor} className="animate-pulse-glow" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-needl-lighter bg-opacity-50"></div>
          </div>;
        break;
        
      case 'persona-2':
        // Product Manager
        bgColor = "bg-gradient-to-br from-blue-50 to-indigo-50";
        iconContent = <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L4 8L12 4L20 8L12 16Z" fill={iconColor} fillOpacity="0.3" />
                <path d="M4 8L12 4L20 8L12 12L4 8Z" fill={iconColor} fillOpacity="0.5" className="animate-pulse-glow" />
                <path d="M12 12L12 20" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50"></div>
          </div>;
        break;
        
      case 'persona-3':
        // Sales Development
        bgColor = "bg-gradient-to-br from-purple-50 to-pink-50";
        iconContent = <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="4" fill={iconColor} fillOpacity="0.3" />
                <circle cx="16" cy="16" r="4" fill={iconColor} fillOpacity="0.3" />
                <path d="M5 11L19 11" stroke={iconColor} strokeWidth="2" strokeLinecap="round" className="animate-shimmer" />
                <path d="M11 5L11 19" stroke={iconColor} strokeWidth="2" strokeLinecap="round" className="animate-shimmer" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-50"></div>
          </div>;
        break;
        
      case 'persona-4':
        // Market Researcher
        bgColor = "bg-gradient-to-br from-amber-50 to-orange-50";
        iconContent = <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="6" height="7" rx="1" fill={iconColor} fillOpacity="0.3" />
                <rect x="14" y="4" width="6" height="7" rx="1" fill={iconColor} fillOpacity="0.5" className="animate-pulse-glow" />
                <rect x="4" y="13" width="6" height="7" rx="1" fill={iconColor} fillOpacity="0.7" />
                <rect x="14" y="13" width="6" height="7" rx="1" fill={iconColor} fillOpacity="0.3" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50"></div>
          </div>;
        break;
        
      default:
        iconContent = <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">{mockPersonas.find(p => p.id === iconType)?.icon}</div>;
        bgColor = "bg-gray-50";
    }
    
    return <div className={`p-3 rounded-full ${bgColor} flex items-center justify-center overflow-hidden relative group`}>
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-needl-primary/30 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Icon content */}
        {iconContent}
        
        {/* Animated shine effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
            repeatDelay: 0.5
          }}
        />
      </div>;
  };
  
  return <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1 relative">
        <AnimatedBackground variant="subtle" />
        
        <div className="container mx-auto py-16 px-4 relative z-10">
          <motion.h1 
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-needl-dark via-needl-primary to-blue-600 bg-clip-text text-transparent" 
            initial={{
              opacity: 0,
              y: -20
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            Select a Profile or Type Your Intelligence Needs Below
          </motion.h1>
          
          <motion.div 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut"
            }} 
            className="max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="text" 
                placeholder="Describe what you want to track (e.g., competitor product launches, market trends...)" 
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
              
              {/* Animated highlight for focus state */}
              <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-needl-primary/30 via-needl-primary to-needl-primary/30"
                  animate={{
                    backgroundPosition: ['0% center', '100% center'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 100%'
                  }}
                />
              </div>
            </form>
          </motion.div>
          
          <motion.div 
            variants={container} 
            initial="hidden" 
            animate="show" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {mockPersonas.map(persona => (
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
                  className="cursor-pointer h-full transition-all duration-300 hover:shadow-lg border-needl-lighter hover:border-needl-primary overflow-hidden"
                  onClick={() => handlePersonaSelect(persona.id)}
                >
                  {/* Top accent bar */}
                  <div className="h-1 bg-gradient-to-r from-needl-primary to-blue-500" />
                  
                  <CardHeader className="flex flex-col items-center pb-4">
                    <PersonaIcon iconType={persona.id} />
                    <h3 className="text-xl font-semibold mt-4 text-needl-dark">{persona.title}</h3>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 text-center">{persona.description}</p>
                  </CardContent>
                  
                  {/* Hover effect highlight */}
                  <motion.div 
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-needl-primary/0 via-needl-primary to-needl-primary/0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>;
};

export default UseCases;
