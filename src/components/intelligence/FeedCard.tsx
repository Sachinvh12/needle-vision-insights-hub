
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Feed } from '@/types/appTypes';

interface FeedCardProps {
  feed: Feed;
  onClick: () => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ feed, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer h-full transition-all duration-300 hover:shadow-lg border-gray-200 hover:border-needl-primary overflow-hidden"
        onClick={onClick}
      >
        <div className={`h-2 w-full ${
          feed.type === 'competitor' ? 'bg-red-500' : 
          feed.type === 'market' ? 'bg-blue-500' : 
          feed.type === 'trend' ? 'bg-amber-500' : 'bg-purple-500'
        }`} />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-medium">{feed.name}</CardTitle>
            <Badge 
              variant={feed.status === 'active' ? 'default' : feed.status === 'paused' ? 'outline' : 'destructive'}
              className={feed.status === 'active' ? 'bg-green-500' : ''}
            >
              <span className="text-xs flex items-center">
                <span className={`inline-block h-2 w-2 rounded-full mr-1 ${
                  feed.status === 'active' ? 'bg-green-500' : 
                  feed.status === 'paused' ? 'bg-orange-500' : 'bg-red-500'
                }`}></span>
                {feed.status === 'active' ? 'Active' : 
                  feed.status === 'paused' ? 'Paused' : 'Error'}
              </span>
            </Badge>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="flex items-center">
              {feed.type === 'competitor' ? '🏢' : feed.type === 'market' ? '📊' : feed.type === 'trend' ? '📈' : '🔍'} 
              <span className="ml-1 capitalize">{feed.type}</span>
            </span>
            <Separator orientation="vertical" className="mx-2 h-3" />
            <span>
              {new Date(feed.lastActivity || feed.createdAt).toLocaleDateString()}
            </span>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          {feed.sourceMix && (
            <div className="flex items-center mb-3 h-2">
              <div className="bg-blue-400 h-full rounded-l-full" style={{ width: `${feed.sourceMix.web}%` }} />
              <div className="bg-amber-400 h-full" style={{ width: `${feed.sourceMix.docs}%` }} />
              <div className="bg-purple-400 h-full rounded-r-full" style={{ width: `${feed.sourceMix.other}%` }} />
            </div>
          )}
          
          <p className="text-sm text-gray-600 line-clamp-2">{feed.snippet || feed.query}</p>
        </CardContent>
        <CardFooter className="pt-0 pb-3 px-4">
          <div className="w-full flex justify-between items-center text-xs text-gray-500">
            <div className="flex gap-1 items-center">
              <FileText className="h-3 w-3" />
              <span>{feed.documentsCount || Math.floor(Math.random() * 20)} docs</span>
            </div>
            <div className="flex gap-1 items-center">
              <Bell className="h-3 w-3" />
              <span>{feed.alertsCount || Math.floor(Math.random() * 10)} alerts</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FeedCard;
