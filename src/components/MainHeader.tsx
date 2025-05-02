
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LogOut, Settings } from 'lucide-react';
import { AlertBadge } from './alerts/AlertBadge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  const {
    state,
    logout
  } = useApp();

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
    toast.success('Logged out successfully', {
      description: 'You have been logged out of your account'
    });
    navigate('/login');
  };

  const navigationItems = [{
    path: '/landing',
    label: 'Home'
  }, {
    path: '/intelligence-hub',
    label: 'Intelligence Hub'
  }, {
    path: '/manage-feeds',
    label: 'Manage Feeds'
  }];

  return (
    <motion.header 
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 ${scrolled ? 'shadow-sm' : ''} transition-all duration-300`} 
      initial={{ y: -10, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 px-[10px] my-[10px]">
          {/* Logo and navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/landing" className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                transition={{ duration: 0.2 }}
              >
                <Logo />
              </motion.div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map(item => (
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
          <div className="flex items-center gap-8 px-[5px]">
            {/* Alert icon - conditionally rendered based on showAlertIcon prop */}
            {showAlertIcon && (
              <div className="flex items-center">
                <AlertBadge />
              </div>
            )}
            
            {/* Email display instead of profile icon */}
            <div className="relative z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="px-3 py-1 h-9 text-sm font-medium bg-white border border-gray-200 hover:border-needl-primary hover:bg-gray-50 transition-all duration-200"
                  >
                    user@example.com
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
              {navigationItems.map(item => (
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
