
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  showAlertIcon?: boolean;
  showLoginButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  showAlertIcon = false,
  showLoginButton = false,
}) => {
  const { state, logout, toggleAlertsModal } = useApp();
  const { isLoggedIn, userFeeds, alerts } = state;
  const location = useLocation();

  const unreadAlerts = alerts.filter(alert => !alert.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Logo size="small" />
            <span className="text-xl font-semibold text-needl-primary">Needl.ai</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn && location.pathname === '/landing' && userFeeds.length > 0 && (
            <Button variant="outline" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          )}

          {isLoggedIn && showAlertIcon && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleAlertsModal}
              className="relative hover:bg-needl-lighter"
            >
              <Bell className="h-5 w-5 text-needl-primary" />
              {unreadAlerts > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-needl-primary text-white"
                >
                  {unreadAlerts}
                </Badge>
              )}
            </Button>
          )}

          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="hover:bg-needl-lighter"
            >
              <LogOut className="h-5 w-5 text-needl-primary" />
            </Button>
          ) : showLoginButton ? (
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
