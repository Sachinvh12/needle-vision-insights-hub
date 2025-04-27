
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, ChevronRight, FileText, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Alert } from '../../types/appTypes';
import { useApp } from '../../context/AppContext';

interface AlertsListProps {
  maxItems?: number;
  showAll?: boolean;
}

const AlertsList: React.FC<AlertsListProps> = ({ maxItems, showAll = false }) => {
  const navigate = useNavigate();
  const { state, markAlertRead, selectFeed } = useApp();
  const { alerts } = state;

  // Filter unread alerts first, then sort by timestamp, and limit the number if maxItems is specified
  const sortedAlerts = [...alerts]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxItems || alerts.length);

  const handleAlertClick = (alertId: string, feedId: string) => {
    markAlertRead(alertId);
    selectFeed(feedId);
    navigate(`/battlecard/${feedId}`);
  };

  const getImportanceColor = (importance: string) => {
    if (importance === 'high') return 'bg-red-500';
    if (importance === 'medium') return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getImportanceLabel = (importance: string) => {
    if (importance === 'high') return 'High';
    if (importance === 'medium') return 'Medium';
    return 'Low';
  };

  const formattedDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (sortedAlerts.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Circle className="h-6 w-6 text-gray-400" />
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-1">No alerts yet</h4>
        <p className="text-sm text-gray-500">Alerts will appear here as they are generated</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedAlerts.map((alert) => (
        <Card 
          key={alert.id}
          className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${!alert.read ? 'border-l-4 border-l-needl-primary' : 'border-l-4 border-l-transparent'}`}
          onClick={() => handleAlertClick(alert.id, alert.feedId)}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {alert.source.type === 'web' ? (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-blue-600" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-amber-600" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-1">{alert.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span>{alert.feedName}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{formattedDate(alert.timestamp)}</span>
                  </div>
                </div>
                
                <Badge className={`${getImportanceColor(alert.importance)} text-white text-xs`}>
                  {getImportanceLabel(alert.importance)}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{alert.summary}</p>
              
              {alert.source.url && (
                <div className="flex items-center text-xs text-needl-primary">
                  <span>Source: {alert.source.name}</span>
                </div>
              )}
            </div>
            
            <div className="flex-shrink-0 self-center">
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </Card>
      ))}
      
      {!showAll && alerts.length > (maxItems || 0) && (
        <div className="text-center pt-2">
          <Button
            variant="link"
            className="text-needl-primary"
            onClick={() => navigate('/alerts')}
          >
            View all alerts
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertsList;
