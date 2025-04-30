
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, LogOut, Settings } from 'lucide-react';
import { AlertBadge } from './alerts/AlertBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Logo from './Logo';
import { useApp } from '../context/AppContext';

interface MainHeaderProps {
  showAlertIcon?: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({ showAlertIcon = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state, logout } = useApp();
  
  // Update scrolled state on scroll for subtle header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    if (path === '/intelligence-hub' && location.pathname === '/dashboard') return true;
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    logout();
    // Fix toast call syntax
    toast.success('Logged out successfully', {
      description: 'You have been logged out of your account'
    });
    navigate('/login');
  };
  
  const navigationItems = [
    { path: '/landing', label: 'Home' },
    { path: '/intelligence-hub', label: 'Intelligence Hub' },
    { path: '/manage-feeds', label: 'Manage Feeds' },
  ];
  
  return (
    <motion.header 
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 ${
        scrolled ? 'shadow-sm' : ''
      } transition-all duration-300`}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/landing" className="flex items-center">
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Logo />
              </motion.div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-needl-primary bg-needl-lighter'
                      : 'text-gray-700 hover:text-needl-primary hover:bg-gray-50'
                  }`}
                >
                  <motion.span
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Right side - notifications, user menu */}
          <div className="flex items-center">
            {/* Alert icon with increased spacing from profile */}
            {showAlertIcon && (
              <div className="flex items-center mr-5">
                <AlertBadge />
              </div>
            )}
            
            {/* User menu - ensure consistent rendering with improved visibility */}
            <div className="relative z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full overflow-hidden border border-gray-200 hover:border-needl-primary hover:scale-105 transition-all duration-200 bg-white shadow-sm"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-needl-primary text-white">UN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-needl-lighter to-blue-50 px-3 py-2 border-b">
                    <DropdownMenuLabel className="p-0">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">User Name</p>
                        <p className="text-xs text-gray-500">user@example.com</p>
                      </div>
                    </DropdownMenuLabel>
                  </div>
                  <div className="p-1">
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-needl-primary bg-needl-lighter'
                      : 'text-gray-700 hover:text-needl-primary hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default MainHeader;
