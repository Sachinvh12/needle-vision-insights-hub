
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Bell, Layers } from 'lucide-react';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="h-full"
    >
      <Card 
        className="cursor-pointer h-full transition-all duration-300 border-gray-100 hover:border-needl-primary overflow-hidden bg-white"
        onClick={onClick}
      >
        <div className={`h-1.5 w-full ${
          feed.type === 'competitor' ? 'bg-gradient-to-r from-red-500 to-red-400' : 
          feed.type === 'market' ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 
          feed.type === 'trend' ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 
          'bg-gradient-to-r from-purple-500 to-purple-400'
        }`} />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                feed.type === 'competitor' ? 'bg-red-100 text-red-600' :
                feed.type === 'market' ? 'bg-blue-100 text-blue-600' :
                feed.type === 'trend' ? 'bg-amber-100 text-amber-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <Layers className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-medium">{feed.name}</CardTitle>
            </div>
            <Badge 
              variant={feed.status === 'active' ? 'default' : feed.status === 'paused' ? 'outline' : 'destructive'}
              className={feed.status === 'active' ? 'bg-green-500 text-xs px-1.5 py-0' : 'text-xs px-1.5 py-0'}
            >
              <span className="flex items-center">
                <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1 ${
                  feed.status === 'active' ? 'bg-green-100' : 
                  feed.status === 'paused' ? 'bg-orange-500' : 'bg-red-500'
                }`}></span>
                {feed.status === 'active' ? 'Active' : 
                  feed.status === 'paused' ? 'Paused' : 'Error'}
              </span>
            </Badge>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <span className="capitalize">{feed.type}</span>
            <Separator orientation="vertical" className="mx-2 h-3" />
            <span>
              {new Date(feed.lastActivity || feed.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          {feed.sourceMix && (
            <div className="flex items-center mb-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full" style={{ width: `${feed.sourceMix.web}%` }} />
              <div className="bg-amber-400 h-full" style={{ width: `${feed.sourceMix.docs}%` }} />
              <div className="bg-purple-400 h-full" style={{ width: `${feed.sourceMix.other}%` }} />
            </div>
          )}
          
          <p className="text-sm text-gray-600 line-clamp-2 h-10">{feed.snippet || feed.query}</p>
        </CardContent>
        <CardFooter className="pt-0 pb-3 px-4 bg-gray-50 mt-2">
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
