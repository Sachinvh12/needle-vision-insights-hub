
import React from 'react';
import { TrendingUp, LineChart, Users, Search } from 'lucide-react';
import PersonaCard, { PersonaCardProps } from './PersonaCard';

const personaData: Omit<PersonaCardProps, 'delay'>[] = [
  {
    icon: <TrendingUp className="h-6 w-6 text-amber-600" />,
    title: "Energy Trader",
    alert: "Crude Oil Faces Supply Surge",
    description: "OPEC+ weighs June output increase amid market volatility",
    color: "border-amber-500",
    onClick: () => {/* Navigate or show more details */}
  },
  {
    icon: <LineChart className="h-6 w-6 text-blue-600" />,
    title: "Junior Analyst",
    alert: "Private Equity Deals Spike",
    description: "Harvard, Prestige Hospitality, Max Estates drive liquidity shifts",
    color: "border-blue-500",
    onClick: () => {/* Navigate or show more details */}
  },
  {
    icon: <Users className="h-6 w-6 text-green-600" />,
    title: "SDR",
    alert: "Hospitality Sector Heats Up",
    description: "New IPOs and acquisitions open fresh sales opportunities",
    color: "border-green-500",
    onClick: () => {/* Navigate or show more details */}
  },
  {
    icon: <Search className="h-6 w-6 text-purple-600" />,
    title: "Researcher",
    alert: "Global Oil Markets Under Pressure",
    description: "Geopolitical shifts and oversupply concerns impact forecasts",
    color: "border-purple-500",
    onClick: () => {/* Navigate or show more details */}
  },
];

const PersonaSection: React.FC = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-needl-primary to-blue-600 bg-clip-text text-transparent">
          Intelligence Tailored for Your Role
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personaData.map((persona, index) => (
          <PersonaCard 
            key={persona.title} 
            {...persona}
            delay={0.1 * index} 
          />
        ))}
      </div>
    </div>
  );
};

export default PersonaSection;
