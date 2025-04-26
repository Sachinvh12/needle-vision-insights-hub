
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Bell, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

interface HeaderProps {
  showLoginButton?: boolean;
  showAlertIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  showLoginButton = false,
  showAlertIcon = false
}) => {
  const navigate = useNavigate();
  const { state, logout, toggleAlertsModal } = useApp();
  const { isLoggedIn, alerts } = state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const unreadAlerts = alerts.filter(alert => !alert.read).length;
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAlertClick = () => {
    navigate('/alerts');
  };
  
  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/landing');
    } else {
      navigate('/');
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={handleLogoClick}
          >
            <Logo className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold text-gray-900">needl.ai</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <>
              {showAlertIcon && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleAlertClick} 
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadAlerts > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                      <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                        {unreadAlerts}
                      </Badge>
                    </span>
                  )}
                </Button>
              )}
              
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              
              <Button 
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
          
          {showLoginButton && !isLoggedIn && (
            <Button 
              onClick={handleLogin}
              className="bg-needl-primary hover:bg-needl-dark text-white"
            >
              Login
            </Button>
          )}
        </div>
        
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t px-4 py-2 shadow-md overflow-hidden"
          >
            <nav className="flex flex-col space-y-2 pb-2">
              {isLoggedIn && (
                <>
                  {showAlertIcon && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        handleAlertClick();
                        setIsMenuOpen(false);
                      }} 
                      className="justify-start"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Alerts
                      {unreadAlerts > 0 && (
                        <Badge variant="destructive" className="ml-2">{unreadAlerts}</Badge>
                      )}
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
              
              {showLoginButton && !isLoggedIn && (
                <Button 
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-needl-primary hover:bg-needl-dark text-white"
                >
                  Login
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
