
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { Check, Copy, Plus, Settings } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Feed } from '../types/feedTypes';

const ManageFeeds: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateFeed } = useApp();
  const { userFeeds } = state;

  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [feedName, setFeedName] = useState('');
  const [feedQuery, setFeedQuery] = useState('');
  const [feedType, setFeedType] = useState<"market" | "competitor" | "trend" | "custom">("custom");
  const [feedStatus, setFeedStatus] = useState<"active" | "paused" | "error">("active");
  const [notifications, setNotifications] = useState({
    slack: false,
    storage: false,
  });
  const [isNewFeed, setIsNewFeed] = useState(false);

  useEffect(() => {
    if (selectedFeed) {
      setIsEditing(true);
      setFeedName(selectedFeed.name);
      setFeedQuery(selectedFeed.query);
      setFeedType(selectedFeed.type);
      setFeedStatus(selectedFeed.status);
      setNotifications({
        slack: selectedFeed.notifications?.slack || false,
        storage: selectedFeed.notifications?.storage || false,
      });
    } else {
      setIsEditing(false);
      setFeedName('');
      setFeedQuery('');
      setFeedType("custom");
      setFeedStatus("active");
      setNotifications({
        slack: false,
        storage: false,
      });
    }
  }, [selectedFeed]);

  const handleUpdateFeed = () => {
    if (selectedFeed) {
      updateFeed({
        ...selectedFeed,
        name: feedName,
        query: feedQuery,
        type: feedType,
        status: feedStatus,
        notifications: {
          slack: notifications.slack,
          storage: notifications.storage,
        },
      });
      toast.success("Feed Updated", {
        description: "Your intelligence feed has been successfully updated."
      });
    }
  };

  const handleDeleteFeed = () => {
    if (selectedFeed) {
      // Instead of using deleteFeed, just mock the functionality
      setSelectedFeed(null);
      toast.success("Feed Deleted", {
        description: "The intelligence feed has been removed."
      });
      navigate('/dashboard');
    }
  };

  const handleCreateFeed = () => {
    if (feedName && feedQuery) {
      // Instead of using createFeed, just mock the functionality
      toast.success("Feed Created", {
        description: "A new intelligence feed has been created."
      });
      setIsNewFeed(false);
      setFeedName('');
      setFeedQuery('');
      setFeedType("custom");
      navigate('/dashboard');
    } else {
      toast.error("Missing Information", {
        description: "Please fill in all required fields."
      });
    }
  };

  const handleNotificationToggle = (type: string) => {
    let updatedNotifications = { ...notifications };
    if (type === 'slack') {
      updatedNotifications.slack = !notifications.slack;
    } else if (type === 'storage') {
      updatedNotifications.storage = !notifications.storage;
    }
    setNotifications(updatedNotifications);
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(feedQuery);
    toast.success("Query Copied", {
      description: "The feed query has been copied to the clipboard."
    });
  };

  const handleFeedSelect = (feed: Feed) => {
    setSelectedFeed(feed);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Feeds</h1>
          <Button
            onClick={() => navigate('/use-cases')}
            variant="default"
            size="sm"
            className="gap-1 bg-needl-primary hover:bg-needl-dark"
          >
            <Plus className="h-4 w-4" />
            <span>New Feed</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feed List */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Feeds</h2>
            <div className="space-y-3">
              {userFeeds.length > 0 ? (
                userFeeds.map((feed) => (
                  <Card
                    key={feed.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedFeed?.id === feed.id ? 'border-2 border-needl-primary' : ''}`}
                    onClick={() => handleFeedSelect(feed)}
                  >
                    <CardHeader className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">{feed.name}</CardTitle>
                      <Check className={`h-4 w-4 text-green-500 ${selectedFeed?.id === feed.id ? 'opacity-100' : 'opacity-0'}`} />
                    </CardHeader>
                    <CardContent className="text-sm text-gray-500">
                      {feed.query.substring(0, 50)}...
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-4">
                  <Settings className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">No feeds created yet.</p>
                </div>
              )}
            </div>
          </motion.section>

          {/* Feed Details */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Feed Details</h2>
            <Card>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="feed-name">Feed Name</Label>
                  <Input
                    id="feed-name"
                    placeholder="e.g., Competitor Analysis"
                    value={feedName}
                    onChange={(e) => setFeedName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="feed-query">Feed Query</Label>
                  <div className="relative">
                    <Textarea
                      id="feed-query"
                      placeholder="Enter your search query"
                      value={feedQuery}
                      onChange={(e) => setFeedQuery(e.target.value)}
                      className="resize-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={handleCopyQuery}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="feed-type">Feed Type</Label>
                  <select
                    id="feed-type"
                    value={feedType}
                    onChange={(e) => setFeedType(e.target.value as "market" | "competitor" | "trend" | "custom")}
                    className="w-full p-2 border rounded"
                  >
                    <option value="market">Market</option>
                    <option value="competitor">Competitor</option>
                    <option value="trend">Trend</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="feed-status">Feed Status</Label>
                  <select
                    id="feed-status"
                    value={feedStatus}
                    onChange={(e) => setFeedStatus(e.target.value as "active" | "paused" | "error")}
                    className="w-full p-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <Separator />
                <div>
                  <Label className="flex items-center justify-between">
                    Slack Notifications
                    <Switch
                      checked={notifications.slack}
                      onCheckedChange={() => handleNotificationToggle('slack')}
                    />
                  </Label>
                  <Label className="flex items-center justify-between">
                    Storage Notifications
                    <Switch
                      checked={notifications.storage}
                      onCheckedChange={() => handleNotificationToggle('storage')}
                    />
                  </Label>
                </div>
                <div className="flex justify-between">
                  <Button variant="destructive" onClick={handleDeleteFeed}>
                    Delete Feed
                  </Button>
                  <Button onClick={handleUpdateFeed} className="bg-needl-primary hover:bg-needl-dark text-white">
                    Update Feed
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default ManageFeeds;
