
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../../context/AppContext';
import { toast } from '@/hooks/use-toast';

export const AlertBadge: React.FC = () => {
  const navigate = useNavigate();
  const { state, markAlertRead } = useApp();
  const { alerts } = state;
  
  const unreadCount = alerts.filter(alert => !alert.read).length;
  
  const handleAlertClick = (alertId: string, feedId: string) => {
    markAlertRead(alertId);
    navigate(`/battlecard/${feedId}`);
    
    toast.success("Alert marked as read", {
      description: "You'll now be redirected to the corresponding intelligence feed",
      closeButton: true
    });
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-8 w-8 rounded-full" // Made slightly smaller (10%)
      onClick={() => navigate('/intelligence-hub?tab=alerts')}
    >
      <Bell className="h-4.5 w-4.5 text-gray-700" /> {/* Made 10% smaller */}
      {unreadCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 w-4.5 h-4.5 p-0 flex items-center justify-center bg-red-500 text-white text-xs"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
};
