
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MainHeader from '../components/MainHeader';
import AnimatedBackground from '../components/AnimatedBackground';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { isLoggedIn } = state;

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/landing');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <AnimatedBackground variant="flow" density="low" className="opacity-50" />
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-needl-primary animate-spin" />
        <div className="text-center mt-4">
          <h1 className="text-xl mb-2">Redirecting...</h1>
          <p className="text-sm text-gray-500">
            Your centralized intelligence command center: Translate raw data into strategic clarity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
