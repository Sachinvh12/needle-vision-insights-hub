
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart2,
  BellRing,
  Check,
  ChevronRight,
  Filter,
  Grid2x2,
  Info,
  Mail,
  Plus,
  Search,
  X
} from 'lucide-react';
import MainHeader from '../components/MainHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '../context/AppContext';
import { toast } from '@/hooks/use-toast';
import AlertsList from '../components/alerts/AlertsList';
import MetricCards from '../components/intelligence/MetricCards';
import AnalyticsCharts from '../components/intelligence/AnalyticsCharts';
import FeedCard from '../components/intelligence/FeedCard';
import PageTransition from '../components/PageTransition';

const IntelligenceHub: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  
  const { state, markAllAlertsRead, selectFeed } = useApp();
  const { alerts, userFeeds } = state;
  
  const [filter, setFilter] = useState('all');
  const [importance, setImportance] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Determine which tab to show based on URL parameter
  const defaultTab = tabFromUrl === 'alerts' ? 'alerts' : 'analytics';

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const highImportanceCount = alerts.filter(alert => alert.importance === 'high').length;
  
  // Filter alerts based on selected filters
  let filteredAlerts = [...alerts];
  
  if (filter === 'unread') {
    filteredAlerts = filteredAlerts.filter(alert => !alert.read);
  } else if (filter === 'read') {
    filteredAlerts = filteredAlerts.filter(alert => alert.read);
  }
  
  if (importance !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.importance === importance);
  }

  if (searchTerm) {
    filteredAlerts = filteredAlerts.filter(alert => 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      alert.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.feedName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleMarkAllRead = () => {
    markAllAlertsRead();
    toast.success("All alerts marked as read", {
      closeButton: true
    });
  };

  const handleFeedClick = (feedId: string) => {
    selectFeed(feedId);
    navigate(`/battlecard/${feedId}`);
  };

  // Recent feeds section
  const recentFeeds = [...userFeeds]
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
    .slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
      <MainHeader />
      
      <PageTransition>
        <main className="flex-1 container py-6 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="bg-needl-primary/10 p-2 rounded-full mr-3">
                <BellRing className="h-6 w-6 text-needl-primary" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-needl-dark to-needl-primary bg-clip-text text-transparent">
                Intelligence Hub
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
                className="gap-1 border-needl-primary/20 hover:border-needl-primary hover:bg-needl-lighter"
              >
                <Check className="h-4 w-4" />
                <span className="hidden sm:inline">Mark All Read</span>
              </Button>
              
              <Button 
                onClick={() => navigate('/use-cases')}
                variant="default"
                size="sm"
                className="gap-1 bg-needl-primary hover:bg-needl-dark transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Feed</span>
              </Button>
            </motion.div>
          </div>

          <MetricCards 
            totalAlerts={alerts.length} 
            unreadAlerts={unreadCount} 
            highImportanceAlerts={highImportanceCount} 
          />
          
          <Tabs defaultValue={defaultTab} className="mb-6">
            <TabsList className="bg-white shadow-sm border mb-4 p-1 rounded-xl">
              <TabsTrigger 
                value="analytics" 
                className="rounded-lg data-[state=active]:bg-needl-primary data-[state=active]:text-white transition-all duration-300"
              >
                Analytics Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="alerts" 
                className="rounded-lg data-[state=active]:bg-needl-primary data-[state=active]:text-white transition-all duration-300"
              >
                Alerts Management
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="space-y-8">
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="bg-needl-primary/10 p-1 rounded-md mr-2 text-needl-primary">
                      <BarChart2 className="h-4 w-4" />
                    </span>
                    Intelligence Metrics
                  </h2>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[140px] h-8 text-xs border-needl-primary/20">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <AnalyticsCharts />
              </motion.section>
              
              <section className="pt-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="bg-needl-primary/10 p-1 rounded-md mr-2 text-needl-primary">
                      <Grid2x2 className="h-4 w-4" />
                    </span>
                    Recent Intelligence Feeds
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentFeeds.map(feed => (
                    <FeedCard 
                      key={feed.id} 
                      feed={feed} 
                      onClick={() => handleFeedClick(feed.id)} 
                    />
                  ))}
                  
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <div 
                      className="cursor-pointer h-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl hover:border-needl-primary transition-colors bg-white/50 backdrop-blur-sm"
                      onClick={() => navigate('/use-cases')}
                    >
                      <div className="rounded-full bg-needl-primary/10 p-4 mb-3">
                        <Plus className="h-6 w-6 text-needl-primary" />
                      </div>
                      <p className="font-medium text-needl-primary">Create New Feed</p>
                      <p className="text-xs text-gray-500 mt-1">Add more intelligence sources</p>
                    </div>
                  </motion.div>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="alerts" className="space-y-4">
              <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                  <h2 className="text-lg font-semibold flex items-center">
                    <span className="bg-needl-primary/10 p-1 rounded-md mr-2 text-needl-primary">
                      <BellRing className="h-4 w-4" />
                    </span>
                    All Alerts
                  </h2>
                  
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <div className="w-full sm:w-auto">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search alerts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-9 border-needl-primary/20 focus-visible:ring-needl-primary/30"
                        />
                      </div>
                    </div>
                    
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-[140px] border-needl-primary/20">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Alerts</SelectItem>
                        <SelectItem value="unread">Unread Only</SelectItem>
                        <SelectItem value="read">Read Only</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={importance} onValueChange={setImportance}>
                      <SelectTrigger className="w-[140px] border-needl-primary/20">
                        <SelectValue placeholder="Filter by importance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Importance</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredAlerts.length > 0 ? (
                  <AlertsList alerts={filteredAlerts} showAll={true} />
                ) : (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <div className="bg-gray-100 w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center">
                      <Info className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-1">No alerts match your filters</h4>
                    <p className="text-sm text-gray-500 mb-3">Try adjusting your search or filters</p>
                    <Button 
                      variant="outline" 
                      className="border-needl-primary/20 hover:bg-needl-lighter hover:border-needl-primary"
                      onClick={() => {
                        setFilter('all');
                        setImportance('all');
                        setSearchTerm('');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </PageTransition>
    </div>
  );
};

export default IntelligenceHub;
