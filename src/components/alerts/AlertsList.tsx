
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Alert } from '@/context/AppContext';
import { toast } from 'sonner';

interface AlertsListProps {
  maxItems?: number;
  showAll?: boolean;
}

const AlertsList: React.FC<AlertsListProps> = ({ maxItems = 5, showAll = false }) => {
  const { state, markAlertRead } = useApp();
  const { alerts } = state;

  const displayAlerts = showAll ? alerts : alerts.slice(0, maxItems);

  const handleAlertClick = (alert: Alert) => {
    if (!alert.read) {
      markAlertRead(alert.id);
      toast.success("Alert marked as read");
    }
    
    // In a real app, you might navigate to the related feed or show more details
    toast.info(`Viewing details for ${alert.title}`);
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center p-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No alerts yet</h3>
        <p className="text-sm text-gray-500 mt-1">When new intelligence is discovered, alerts will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-1">
      {displayAlerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
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
              <Badge variant={alert.importance === 'high' ? 'destructive' : alert.importance === 'medium' ? 'default' : 'outline'}>
                {alert.importance}
              </Badge>
            </div>
            <h3 className="font-semibold mb-1 text-gray-900">{alert.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{alert.summary}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center">
                {alert.source.type === 'web' ? (
                  <span className="flex items-center gap-1">
                    🌐 {alert.source.name}
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    📄 {alert.source.name}
                  </span>
                )}
              </div>
              <span>
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </div>
          </Card>
        </motion.div>
      ))}
      
      {!showAll && alerts.length > maxItems && (
        <div className="text-center pt-2">
          <button 
            className="text-needl-primary text-sm hover:underline"
            onClick={() => toast.info("View all alerts clicked")}
          >
            View all {alerts.length} alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertsList;
