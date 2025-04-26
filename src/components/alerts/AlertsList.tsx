
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Alert } from '@/context/AppContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Bell, ChevronRight, ExternalLink, File, Globe, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AlertsListProps {
  maxItems?: number;
  showAll?: boolean;
}

const AlertsList: React.FC<AlertsListProps> = ({ maxItems = 5, showAll = false }) => {
  const { state, markAlertRead, markAllAlertsRead } = useApp();
  const { alerts } = state;
  const navigate = useNavigate();

  const displayAlerts = showAll ? alerts : alerts.slice(0, maxItems);
  const unreadCount = alerts.filter(alert => !alert.read).length;

  const handleAlertClick = (alert: Alert) => {
    if (!alert.read) {
      markAlertRead(alert.id);
      toast.success("Alert marked as read");
    }
    
    toast("Viewing details", {
      description: `Viewing details for ${alert.title}`
    });
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          <Bell className="h-5 w-5 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No alerts yet</h3>
        <p className="text-sm text-gray-500 mt-1">When new intelligence is discovered, alerts will appear here</p>
      </div>
    );
  }

  const getImportanceBadgeVariant = (importance: string) => {
    switch(importance) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch(importance) {
      case 'high':
        return <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>;
      case 'medium':
        return <span className="h-2 w-2 rounded-full bg-amber-500 mr-1"></span>;
      default:
        return <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>;
    }
  };

  return (
    <div className="space-y-3 p-1">
      {unreadCount > 0 && showAll && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium">
            {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => markAllAlertsRead()}
            className="text-xs gap-1"
          >
            <Check className="h-3 w-3" /> Mark all as read
          </Button>
        </div>
      )}
      <AnimatePresence>
        {displayAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card 
              className={`p-3 cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
                alert.read 
                  ? 'border-l-gray-300' 
                  : alert.importance === 'high' 
                    ? 'border-l-red-500' 
                    : alert.importance === 'medium' 
                      ? 'border-l-amber-500' 
                      : 'border-l-green-500'
              } ${alert.read ? 'bg-white' : 'bg-blue-50'}`}
              onClick={() => handleAlertClick(alert)}
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium text-sm text-gray-600">{alert.feedName}</span>
                <Badge variant={getImportanceBadgeVariant(alert.importance)} className="flex items-center">
                  {getImportanceIcon(alert.importance)}
                  {alert.importance}
                </Badge>
              </div>
              <h3 className="font-semibold mb-1 text-gray-900">{alert.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{alert.summary}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center">
                  {alert.source.type === 'web' ? (
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-blue-500" /> {alert.source.name}
                      {alert.source.url && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 rounded-full ml-1"
                          asChild
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <a href={alert.source.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 text-needl-primary" />
                          </a>
                        </Button>
                      )}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <File className="h-3 w-3 text-amber-500" /> {alert.source.name}
                    </span>
                  )}
                </div>
                <span>
                  {new Date(alert.timestamp).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {!showAll && alerts.length > maxItems && (
        <div className="text-center pt-4 pb-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/alerts')}
            className="text-needl-primary hover:text-needl-dark gap-1 hover:bg-blue-50"
          >
            View all {alerts.length} alerts <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {!showAll && (
        <div className="text-center pt-2">
          <Button
            onClick={() => navigate('/alerts')}
            className="bg-needl-primary hover:bg-needl-dark text-white gap-1 w-full"
          >
            <Bell className="h-4 w-4" /> Go to Alerts Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertsList;
