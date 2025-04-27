
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';
import CloudProviderIcon from '../components/CloudProviderIcon';
import PersonaSection from '../components/personas/PersonaSection';
import HeroSection from '../components/HeroSection';

type ProviderType = 'google-drive' | 'dropbox' | 'onedrive';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;

  return (
    <div className="min-h-screen flex flex-col">
      <Header showLoginButton={!isLoggedIn} />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        
        <HeroSection />
      </main>
    </div>
  );
};

export default Landing;
