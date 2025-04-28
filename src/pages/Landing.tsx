
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import HeroSection from '../components/HeroSection';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header showLoginButton showAlertIcon />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        <HeroSection />
      </main>
    </div>
  );
};

export default Landing;
