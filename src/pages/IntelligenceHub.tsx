
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Filter,
  Grid2x2,
  Search,
  Plus,
  Save,
  Bell,
  FileText,
  BarChart2,
  ChevronRight,
  X,
  Info,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import MainHeader from '../components/MainHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Feed, Alert as AlertType } from '../types/appTypes';
import { BarChart, LineChart, Pie, PieChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Line, Cell, ResponsiveContainer, Legend } from 'recharts';
import { toast } from 'sonner';
import AlertsList from '../components/alerts/AlertsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import components
import MetricCards from '../components/intelligence/MetricCards';
import FeedCard from '../components/intelligence/FeedCard';
import AnalyticsCharts from '../components/intelligence/AnalyticsCharts';

const IntelligenceHub: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { state, setFilters, addSavedView, selectFeed, removeSavedView, markAlertRead, loadInitialData } = useApp();
  const { userFeeds, savedViews, currentFilters, alerts, isAlertsModalOpen } = state;
  
  const [filteredFeeds, setFilteredFeeds] = useState(userFeeds);
  const [searchTerm, setSearchTerm] = useState('');
  const [company, setCompany] = useState(currentFilters.company || '');
  const [market, setMarket] = useState(currentFilters.market || '');
  const [importance, setImportance] = useState(currentFilters.importance || '');
  const [isSaveViewOpen, setIsSaveViewOpen] = useState(false);
  const [newViewName, setNewViewName] = useState('');
  const [isBoardDrawerOpen, setIsBoardDrawerOpen] = useState(!isMobile);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Get counts for metrics
  const unreadCount = alerts.filter(alert => !alert.read).length;
  const highImportanceCount = alerts.filter(alert => alert.importance === 'high').length;
  
  useEffect(() => {
    if (userFeeds.length === 0) {
      loadInitialData();
    }
  }, [userFeeds.length, loadInitialData]);
  
  useEffect(() => {
    let result = [...userFeeds];
    
    if (searchTerm) {
      result = result.filter(feed => 
        feed.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        feed.query.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (company) {
      result = result.filter(feed => 
        feed.query.toLowerCase().includes(company.toLowerCase())
      );
    }
    
    if (market) {
      result = result.filter(feed => 
        feed.type === market || 
        feed.query.toLowerCase().includes(market.toLowerCase())
      );
    }
    
    if (importance) {
      if (importance === 'high') {
        result = result.filter((_, index) => index % 3 === 0);
      } else if (importance === 'medium') {
        result = result.filter((_, index) => index % 3 === 1);
      } else if (importance === 'low') {
        result = result.filter((_, index) => index % 3 === 2);
      }
    }
    
    setFilteredFeeds(result);
  }, [userFeeds, searchTerm, company, market, importance]);
  
  useEffect(() => {
    setCompany(currentFilters.company || '');
    setMarket(currentFilters.market || '');
    setImportance(currentFilters.importance || '');
  }, [currentFilters]);
  
  const handleApplyFilters = () => {
    setFilters({
      company,
      market,
      importance,
    });
    toast.success("Filters Applied", {
      description: "Your feed view has been updated with the selected filters."
    });
  };
  
  const handleClearFilters = () => {
    setCompany('');
    setMarket('');
    setImportance('');
    setSearchTerm('');
    setFilters({});
    toast.success("Filters Cleared", {
      description: "All filters have been reset."
    });
  };
  
  const handleSaveView = () => {
    if (newViewName.trim()) {
      addSavedView(newViewName.trim());
      setIsSaveViewOpen(false);
      setNewViewName('');
      toast.success("Board Saved", {
        description: `Your "${newViewName.trim()}" board has been saved.`
      });
    }
  };
  
  const handleSelectView = (viewId: string) => {
    const view = savedViews.find(v => v.id === viewId);
    if (view) {
      setFilters(view.filters);
      toast.success(`Board "${view.name}" Applied`, {
        description: "Filters have been updated based on the selected board."
      });
    }
  };
  
  const handleFeedClick = (feedId: string) => {
    selectFeed(feedId);
    navigate(`/battlecard/${feedId}`);
  };
  
  const handleMarkAllRead = () => {
    markAlertRead();
    toast.success("All alerts marked as read");
  };
  
  const feedsToDisplay = filteredFeeds.length > 0 ? filteredFeeds : userFeeds;
  
  // Recent feeds section
  const recentFeeds = [...userFeeds]
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
    .slice(0, 3);
  
  // Alert filtering for alerts tab
  const [alertFilter, setAlertFilter] = useState('all');
  const [alertImportance, setAlertImportance] = useState('all');
  const [alertSearchTerm, setAlertSearchTerm] = useState('');

  // Filter alerts based on selected filters
  let filteredAlerts = [...alerts];
  
  if (alertFilter === 'unread') {
    filteredAlerts = filteredAlerts.filter(alert => !alert.read);
  } else if (alertFilter === 'read') {
    filteredAlerts = filteredAlerts.filter(alert => alert.read);
  }
  
  if (alertImportance !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.importance === alertImportance);
  }

  if (alertSearchTerm) {
    filteredAlerts = filteredAlerts.filter(alert => 
      alert.title.toLowerCase().includes(alertSearchTerm.toLowerCase()) || 
      alert.summary.toLowerCase().includes(alertSearchTerm.toLowerCase()) ||
      alert.feedName.toLowerCase().includes(alertSearchTerm.toLowerCase())
    );
  }
  
  const EmptyDashboard = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 max-w-lg mx-auto bg-white rounded-lg shadow-sm p-8 border border-gray-100"
    >
      <div className="bg-needl-lighter rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <BarChart2 className="h-8 w-8 text-needl-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3">Your Intelligence Hub</h3>
      <p className="text-gray-600 mb-6">Create your first intelligence feed to start gathering insights about competitors, markets, and trends</p>
      <div className="space-y-4">
        <Button 
          onClick={() => navigate('/use-cases')} 
          className="w-full gap-2 bg-needl-primary hover:bg-needl-dark text-white"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Feed</span>
        </Button>
        <div className="flex items-center text-xs text-gray-500 justify-center">
          <FileText className="h-3 w-3 mr-1" />
          <span>Choose from our pre-built use cases</span>
        </div>
      </div>
    </motion.div>
  );
  
  const BoardDrawer = () => {
    return (
      <Drawer open={isBoardDrawerOpen} onOpenChange={setIsBoardDrawerOpen}>
        <DrawerContent className="fixed left-0 right-auto top-16 bottom-0 w-[280px] rounded-none border-r border-t-0 border-b-0 border-l-0 bg-zinc-50">
          <DrawerHeader className="px-4 py-3 border-b flex justify-between items-center">
            <DrawerTitle className="text-base flex items-center">
              <Grid2x2 className="h-4 w-4 mr-2" /> Intelligence Boards
            </DrawerTitle>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsBoardDrawerOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </DrawerHeader>
          <div className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
            {savedViews.length > 0 ? (
              savedViews.map((view) => (
                <div
                  key={view.id}
                  onClick={() => handleSelectView(view.id)}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer group"
                >
                  <div className="flex items-center">
                    <div className="w-1.5 h-6 rounded-sm bg-needl-primary mr-2"></div>
                    <span className="text-sm truncate">{view.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSavedView(view.id);
                      toast.success("Board Removed", {
                        description: `The "${view.name}" board has been removed.`
                      });
                    }}
                  >
                    <X className="h-4 w-4" aria-label="Remove board" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500 py-8">
                <div className="bg-gray-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Grid2x2 className="h-5 w-5 text-gray-400" />
                </div>
                <p className="font-medium mb-1">No saved boards yet</p>
                <p className="text-xs text-gray-400">Create a board by applying filters and saving the view</p>
              </div>
            )}
          </div>
          <DrawerFooter className="p-4 pt-0 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-sm"
              onClick={() => navigate('/use-cases')}
            >
              <Plus className="h-4 w-4" />
              New Feed
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-sm"
              onClick={() => navigate('/manage-feeds')}
            >
              <BarChart2 className="h-4 w-4" />
              Manage Feeds
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MainHeader showAlertIcon />
      
      <main className="flex-1 relative">
        <div className={`flex ${isBoardDrawerOpen && !isMobile ? 'ml-[280px]' : 'ml-0'} transition-all duration-300`}>
          <div className="flex-1 container py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <BarChart2 className="h-6 w-6 mr-2 text-needl-primary" /> 
                  Intelligence Hub
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Monitor competitor moves, market trends, and key industry insights
                </p>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => setIsBoardDrawerOpen(!isBoardDrawerOpen)}
                >
                  <Grid2x2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{isBoardDrawerOpen ? 'Hide' : 'Show'} Boards</span>
                </Button>
                
                <Button
                  onClick={() => navigate('/use-cases')}
                  variant="default"
                  size="sm"
                  className="gap-1 bg-needl-primary hover:bg-needl-dark"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Feed</span>
                </Button>
              </div>
            </div>

            <Tabs 
              defaultValue="dashboard" 
              className="mb-6" 
              value={activeTab} 
              onValueChange={setActiveTab}
            >
              <TabsList className="bg-white shadow-sm border mb-4">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-needl-primary data-[state=active]:text-white">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="alerts" className="data-[state=active]:bg-needl-primary data-[state=active]:text-white">
                  Alerts Management
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-needl-primary data-[state=active]:text-white">
                  Notification Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                {userFeeds.length > 0 ? (
                  <>
                    <MetricCards 
                      totalAlerts={alerts.length} 
                      unreadAlerts={unreadCount} 
                      highImportanceAlerts={highImportanceCount} 
                    />
                    
                    <motion.section 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-8"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Intelligence Metrics</h2>
                        <Select defaultValue="7days">
                          <SelectTrigger className="w-[140px] h-8 text-xs">
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
                    
                    <motion.section 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mb-8"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActiveTab('alerts')}
                          className="gap-2 text-xs"
                        >
                          <Bell className="h-3 w-3" />
                          View All Alerts
                        </Button>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <AlertsList maxItems={3} />
                      </div>
                    </motion.section>

                    <section className="mb-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Intelligence Feeds</h2>
                        <div className="mt-2 md:mt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => navigate('/use-cases')}
                          >
                            <Plus className="h-4 w-4" />
                            <span>New Feed</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div>
                          <Input
                            placeholder="Search feeds..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <Select value={company} onValueChange={setCompany}>
                            <SelectTrigger className="w-full">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">🏢</span>
                                <SelectValue placeholder="Company" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All Companies</SelectItem>
                              <SelectItem value="techcorp">TechCorp</SelectItem>
                              <SelectItem value="healthcare">Healthcare Companies</SelectItem>
                              <SelectItem value="financial">Financial Institutions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Select value={market} onValueChange={setMarket}>
                            <SelectTrigger className="w-full">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">📊</span>
                                <SelectValue placeholder="Market/Type" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All Types</SelectItem>
                              <SelectItem value="competitor">Competitor</SelectItem>
                              <SelectItem value="market">Market</SelectItem>
                              <SelectItem value="trend">Trend</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Select value={importance} onValueChange={setImportance}>
                            <SelectTrigger className="w-full">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">🔍</span>
                                <SelectValue placeholder="Importance" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All Importance</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mb-6">
                        <Button variant="outline" size="sm" onClick={handleClearFilters}>
                          Clear Filters
                        </Button>
                        
                        <div className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => setIsSaveViewOpen(true)}
                          >
                            <Save className="h-4 w-4" />
                            <span>Save View as Board</span>
                          </Button>
                          
                          <Button size="sm" onClick={handleApplyFilters} className="gap-1 bg-needl-primary hover:bg-needl-dark">
                            <Filter className="h-4 w-4" />
                            <span>Apply Filters</span>
                          </Button>
                        </div>
                      </div>

                      <AnimatePresence>
                        <motion.div 
                          layout 
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {feedsToDisplay.map((feed) => (
                            <motion.div
                              key={feed.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FeedCard feed={feed} onClick={() => handleFeedClick(feed.id)} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                      
                      {userFeeds.length > 0 && feedsToDisplay.length === 0 && (
                        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                          <div className="bg-gray-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <Search className="h-5 w-5 text-gray-400" />
                          </div>
                          <p className="text-gray-500 font-medium mb-2">No feeds match your filters</p>
                          <Button variant="link" onClick={handleClearFilters} className="text-needl-primary">
                            Clear Filters
                          </Button>
                        </div>
                      )}
                    </section>
                  </>
                ) : (
                  <EmptyDashboard />
                )}
              </TabsContent>
              
              <TabsContent value="alerts">
                <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h2 className="text-lg font-semibold">All Alerts</h2>
                    
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <div className="w-full sm:w-auto">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Search alerts..."
                            value={alertSearchTerm}
                            onChange={(e) => setAlertSearchTerm(e.target.value)}
                            className="w-full pl-9"
                          />
                        </div>
                      </div>
                      
                      <Select value={alertFilter} onValueChange={setAlertFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Alerts</SelectItem>
                          <SelectItem value="unread">Unread Only</SelectItem>
                          <SelectItem value="read">Read Only</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={alertImportance} onValueChange={setAlertImportance}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Filter by importance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Importance</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleMarkAllRead}
                        disabled={unreadCount === 0}
                        className="gap-1 whitespace-nowrap"
                      >
                        <Check className="h-4 w-4" />
                        <span className="hidden sm:inline">Mark All Read</span>
                      </Button>
                    </div>
                  </div>
                  
                  {filteredAlerts.length > 0 ? (
                    <AlertsList alerts={filteredAlerts} showAll={true} />
                  ) : (
                    <div className="text-center p-6 bg-gray-50 rounded-md">
                      <Info className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No alerts match your current filters</p>
                      <Button 
                        variant="link" 
                        className="mt-2"
                        onClick={() => {
                          setAlertFilter('all');
                          setAlertImportance('all');
                          setAlertSearchTerm('');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                  <p className="text-gray-500 text-sm mb-6">Configure how you receive notifications for your intelligence feeds</p>
                  
                  <div className="space-y-6">
                    {userFeeds.map((feed) => (
                      <Card key={feed.id} className="overflow-hidden">
                        <CardHeader className="bg-gray-50 pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{feed.name}</CardTitle>
                              <p className="text-xs text-gray-500 mt-1 capitalize">{feed.type} Intelligence</p>
                            </div>
                            <Badge 
                              variant={feed.status === 'active' ? 'default' : 'outline'} 
                              className={feed.status === 'active' ? 'bg-green-500' : ''}
                            >
                              {feed.status === 'active' ? 'Active' : 'Paused'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="py-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium mb-1 block">Alert Channels</Label>
                              <div className="flex gap-2 mt-2">
                                <Button variant={feed.outputConfig?.channel === 'app' || feed.outputConfig?.channel === 'both' ? "default" : "outline"} size="sm" className="h-8">
                                  <Bell className="h-3 w-3 mr-1" />
                                  App
                                </Button>
                                <Button variant={feed.outputConfig?.channel === 'email' || feed.outputConfig?.channel === 'both' ? "default" : "outline"} size="sm" className="h-8">
                                  <Mail className="h-3 w-3 mr-1" />
                                  Email
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-sm font-medium mb-1 block">Alert Frequency</Label>
                              <Select defaultValue={feed.outputConfig?.frequency || 'daily'}>
                                <SelectTrigger className="w-full mt-2">
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="realtime">Real-time</SelectItem>
                                  <SelectItem value="daily">Daily Digest</SelectItem>
                                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                                  <SelectItem value="monthly">Monthly Report</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium mb-1 block">Notification Importance</Label>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm" className="h-8 bg-red-50 text-red-600 border-red-200">
                                High Only
                              </Button>
                              <Button variant="default" size="sm" className="h-8">
                                Medium & High
                              </Button>
                              <Button variant="outline" size="sm" className="h-8">
                                All Alerts
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t p-3 flex justify-end">
                          <Button variant="outline" size="sm" className="gap-1" onClick={() => handleFeedClick(feed.id)}>
                            <ArrowRight className="h-3 w-3" />
                            View Battlecard
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    {userFeeds.length === 0 && (
                      <div className="text-center py-8">
                        <div className="bg-gray-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="font-medium mb-1">No feeds to configure</p>
                        <p className="text-xs text-gray-400 max-w-xs mx-auto mb-4">
                          Create intelligence feeds to configure notification preferences
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => navigate('/use-cases')}
                        >
                          <Plus className="h-4 w-4" />
                          Create New Feed
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Dialog open={isSaveViewOpen} onOpenChange={setIsSaveViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Current View as Board</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="view-name">Board Name</Label>
              <Input
                id="view-name"
                placeholder="E.g., High Priority Competitor Feeds"
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveViewOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveView} disabled={!newViewName.trim()} className="bg-needl-primary hover:bg-needl-dark">
              Save Board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BoardDrawer />
      
      <Dialog open={isAlertsModalOpen} onOpenChange={() => selectFeed(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Recent Alerts</DialogTitle>
          </DialogHeader>
          <Separator className="my-2" />
          <div className="space-y-4 py-2">
            <AlertsList showAll={true} />
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => selectFeed(null)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                selectFeed(null);
                navigate('/intelligence-hub');
                setActiveTab('alerts');
              }}
              className="bg-needl-primary hover:bg-needl-dark"
            >
              View All Alerts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntelligenceHub;
