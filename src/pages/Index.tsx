
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MainHeader from '../components/MainHeader';

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
      <MainHeader showAlertIcon={true} />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl">Redirecting...</h1>
        </div>
      </div>
    </div>
  );
};

export default Index;
