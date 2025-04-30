
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../../context/AppContext';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from 'framer-motion';

export const AlertBadge: React.FC = () => {
  const navigate = useNavigate();
  const { state, markAlertRead } = useApp();
  const { alerts } = state;
  const [open, setOpen] = useState(false);
  
  const unreadCount = alerts.filter(alert => !alert.read).length;
  const recentAlerts = [...alerts]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);
  
  const handleAlertClick = (alertId: string, feedId: string) => {
    markAlertRead(alertId);
    setOpen(false);
    
    // Only use one toast notification
    toast({
      title: "Alert marked as read",
      description: "You'll now be redirected to the corresponding intelligence feed",
      closeButton: true
    });
    
    navigate(`/battlecard/${feedId}`);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 rounded-full" 
        >
          <Bell className="h-4.5 w-4.5 text-gray-700" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1.5 -right-1.5" // Adjusted positioning for better circle placement
            >
              <Badge 
                className="flex items-center justify-center bg-red-500 text-white text-xs min-w-[18px] h-[18px] px-1 rounded-full"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            </motion.div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-needl-lighter to-blue-50 p-3 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Recent Notifications</h3>
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => navigate('/intelligence-hub?tab=alerts')} 
                className="text-xs text-needl-primary px-0 h-auto"
              >
                View all
              </Button>
            </div>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            <AnimatePresence>
              {recentAlerts.length > 0 ? (
                <div className="divide-y">
                  {recentAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${!alert.read ? 'bg-blue-50/30' : ''}`}
                      onClick={() => handleAlertClick(alert.id, alert.feedId)}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 mt-1.5 rounded-full ${!alert.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{alert.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{alert.summary}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-400">{alert.feedName}</span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span className="text-xs text-gray-400">
                              {new Date(alert.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-sm text-gray-500">No recent notifications</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
