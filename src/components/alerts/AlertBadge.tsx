
import React, { useState } from 'react';
import { BellRing } from 'lucide-react';
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
    
    toast.info("Alert marked as read", {
      description: "You'll now be redirected to the corresponding intelligence feed"
    });
    
    navigate(`/battlecard/${feedId}`);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 rounded-full hover:bg-needl-lighter/30 transition-colors" 
        >
          <BellRing className="h-4.5 w-4.5 text-needl-primary" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1" 
            >
              <Badge 
                className="flex items-center justify-center bg-needl-primary text-white text-[5.5px] min-w-[10px] h-[10px] px-0.5 rounded-full"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            </motion.div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" sideOffset={5}>
        <div className="bg-white rounded-md shadow-md overflow-hidden border border-needl-lighter">
          <div className="bg-gradient-to-r from-needl-lighter to-blue-50 p-3 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-needl-primary">Recent Notifications</h3>
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => navigate('/intelligence-hub?tab=alerts')} 
                className="text-xs text-needl-primary px-0 h-auto font-medium"
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
                      className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${!alert.read ? 'bg-needl-lighter/20' : ''}`}
                      onClick={() => handleAlertClick(alert.id, alert.feedId)}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-2 h-2 mt-1.5 rounded-full ${!alert.read ? 'bg-needl-primary' : 'bg-gray-300'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{alert.title}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{alert.summary}</p>
                          <div className="flex items-center mt-1.5">
                            <span className="text-[10px] text-needl-primary font-medium bg-needl-lighter/30 px-1.5 py-0.5 rounded">{alert.feedName}</span>
                            <span className="mx-1.5 text-gray-300">•</span>
                            <span className="text-[10px] text-gray-400">
                              {new Date(alert.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="bg-gray-50 rounded-full mx-auto h-10 w-10 flex items-center justify-center mb-2">
                    <BellRing className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">No recent notifications</p>
                  <p className="text-xs text-gray-400 mt-1">New alerts will appear here</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
