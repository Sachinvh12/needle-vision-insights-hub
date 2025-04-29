
import React, { useEffect, useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AlertsList from './AlertsList';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const AlertBadge: React.FC = () => {
  const { state, markAllAlertsRead } = useApp();
  const { alerts } = state;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewAlerts, setHasNewAlerts] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Count unread alerts
  const unreadCount = alerts.filter(alert => !alert.read).length;

  // Check for new alerts
  useEffect(() => {
    if (unreadCount > 0 && !hasAnimated) {
      setHasNewAlerts(true);
      setHasAnimated(true);
      
      // Show toast for new alerts
      toast.info(`${unreadCount} New Alert${unreadCount > 1 ? 's' : ''}`, {
        description: "You have new intelligence alerts that need your attention",
        action: {
          label: "View",
          onClick: () => setIsOpen(true)
        }
      });
      
      // Reset animation flag after delay
      const timer = setTimeout(() => {
        setHasNewAlerts(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [unreadCount, hasAnimated]);

  const handleMarkAllRead = () => {
    markAllAlertsRead();
    toast.success("All alerts marked as read");
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative h-9 w-9 rounded-full border-none shadow-none hover:bg-gray-100"
        >
          <AnimatePresence>
            {hasNewAlerts ? (
              <motion.div
                key="ringing-bell"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ repeat: 3, duration: 0.4 }}
                className="text-needl-primary"
              >
                <BellRing className="h-5 w-5" />
              </motion.div>
            ) : (
              <Bell className="h-5 w-5 text-gray-700" />
            )}
          </AnimatePresence>
          
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute -top-1 -right-1"
            >
              <Badge 
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 ${
                  hasNewAlerts ? 'bg-red-500' : 'bg-needl-primary'
                }`}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            </motion.div>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent align="end" className="w-80 p-0 md:w-96">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-medium">Recent Alerts</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs h-8"
              onClick={handleMarkAllRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-80 overflow-y-auto p-2">
          {alerts.length > 0 ? (
            <AlertsList maxItems={5} compact={true} />
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No alerts yet</p>
              <p className="text-xs text-gray-400 max-w-[200px] mt-1">
                Intelligence alerts will appear here as your feeds gather relevant information
              </p>
            </div>
          )}
        </div>
        
        <div className="border-t px-4 py-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-needl-primary"
            onClick={() => {
              navigate('/intelligence-hub');
              setIsOpen(false);
            }}
          >
            View all alerts
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
