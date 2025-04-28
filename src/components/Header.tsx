import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { User, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { AlertBadge } from './alerts/AlertBadge';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface HeaderProps {
  showLoginButton?: boolean;
  showAlertIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showLoginButton = false,
  showAlertIcon = true
}) => {
  const { state, logout } = useApp();
  const { isLoggedIn, user } = state;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const mainNavItems = [
    { label: 'Home', path: '/landing' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Alerts', path: '/alerts' },
    { label: 'Manage Feeds', path: '/manage-feeds' },
  ];
  
  const userNavItems = [
    { label: 'Profile', action: () => navigate('/profile') },
    { label: 'Settings', action: () => navigate('/settings') },
    { label: 'Sign Out', action: logout },
  ];
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 py-3 px-4 md:px-6 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-semibold text-gray-900">Needl.ai</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <nav className="mr-4">
              <ul className="flex space-x-1">
                {mainNavItems.map((item) => (
                  <li key={item.path}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate(item.path)}
                      className="text-gray-700 hover:text-needl-primary"
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          
          {isLoggedIn && showAlertIcon && (
            <div className="mr-4">
              <AlertBadge />
            </div>
          )}
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <span className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </span>
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="truncate">
                    {user?.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userNavItems.map((item, index) => (
                  <DropdownMenuItem 
                    key={index} 
                    onClick={item.action}
                    className="cursor-pointer"
                  >
                    {item.label === 'Sign Out' && (
                      <LogOut className="mr-2 h-4 w-4" />
                    )}
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            showLoginButton && (
              <Button 
                onClick={handleLogin}
                variant="default"
                size="sm"
                className="bg-needl-primary hover:bg-needl-dark text-white"
              >
                Login
              </Button>
            )
          )}
        </div>
        
        <div className="md:hidden flex items-center space-x-4">
          {isLoggedIn && showAlertIcon && (
            <AlertBadge />
          )}
          
          <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[280px]">
              <SheetHeader className="pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Logo />
                  <span>Needl.ai</span>
                </SheetTitle>
              </SheetHeader>
              
              {isLoggedIn ? (
                <div className="space-y-4 py-4">
                  <div className="flex items-center space-x-2 px-1 py-2 rounded-md bg-gray-50">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium truncate max-w-[170px]">
                        {user?.name}
                      </span>
                      <span className="text-xs text-gray-500 truncate max-w-[170px]">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  
                  <nav>
                    <ul className="space-y-1">
                      {mainNavItems.map((item) => (
                        <li key={item.path}>
                          <SheetClose asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-start text-gray-700"
                              onClick={() => navigate(item.path)}
                            >
                              {item.label}
                            </Button>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  
                  <div className="pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 pt-4">
                  <SheetClose asChild>
                    <Button 
                      onClick={handleLogin}
                      className="w-full bg-needl-primary hover:bg-needl-dark"
                    >
                      Login
                    </Button>
                  </SheetClose>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
