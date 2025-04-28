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
  Settings,
  Bell,
  FileText,
  BarChart2,
  Folder,
  FolderOpen,
  ChevronRight,
  X
} from 'lucide-react';
import Header from '../components/Header';
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

const FeedStatus: React.FC<{ status: string }> = ({ status }) => {
  if (status === 'active') {
    return <span className="text-green-500 flex items-center"><span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>Active</span>;
  } else if (status === 'paused') {
    return <span className="text-orange-500 flex items-center"><span className="h-2 w-2 rounded-full bg-orange-500 mr-1"></span>Paused</span>;
  } else if (status === 'error') {
    return <span className="text-red-500 flex items-center"><span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>Error</span>;
  }
  return <span>Unknown</span>;
};

const getFeedStatusText = (status: string): string => {
  if (status === 'active') return 'Active';
  if (status === 'paused') return 'Paused';
  if (status === 'error') return 'Error';
  return 'Unknown';
};

const FeedCard: React.FC<{ feed: Feed; onClick: () => void }> = ({ feed, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer h-full transition-all duration-300 hover:shadow-lg border-gray-200 hover:border-needl-primary overflow-hidden"
        onClick={onClick}
      >
        <div className={`h-2 w-full ${feed.type === 'competitor' ? 'bg-red-500' : feed.type === 'market' ? 'bg-blue-500' : feed.type === 'trend' ? 'bg-amber-500' : 'bg-purple-500'}`} />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-medium">{feed.name}</CardTitle>
            <Badge 
              variant={feed.status === 'active' ? 'default' : feed.status === 'paused' ? 'outline' : 'destructive'}
              className={feed.status === 'active' ? 'bg-green-500' : ''}
            >
              <div className="text-xs flex items-center">
                <span className={`inline-block h-2 w-2 rounded-full mr-1 ${
                  feed.status === 'active' ? 'bg-green-500' : 
                  feed.status === 'paused' ? 'bg-orange-500' : 'bg-red-500'
                }`}></span>
                {feed.status === 'active' ? 'Active' : 
                  feed.status === 'paused' ? 'Paused' : 'Error'}
              </div>
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
          
          <p className="text-sm text-gray-600 line-clamp-2">{feed.snippet}</p>
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

const FeatureCard = ({ icon, title, description, actionLabel, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
      <div className="flex items-center mb-3">
        <div className="p-2 bg-needl-lighter rounded-md text-needl-primary mr-3">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <Button variant="outline" onClick={onClick} className="w-full justify-center">
        {actionLabel}
      </Button>
    </div>
  );
};

const Dashboard: React.FC = () => {
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
  
  const feedsToDisplay = filteredFeeds.length > 0 ? filteredFeeds : userFeeds;
  
  const sourceDistributionData = [
    { name: 'Web', value: 65 },
    { name: 'Documents', value: 25 },
    { name: 'Other', value: 10 },
  ];
  
  const alertTrendData = [
    { name: 'Mon', alerts: 4 },
    { name: 'Tue', alerts: 7 },
    { name: 'Wed', alerts: 5 },
    { name: 'Thu', alerts: 8 },
    { name: 'Fri', alerts: 12 },
    { name: 'Sat', alerts: 6 },
    { name: 'Sun', alerts: 3 },
  ];
  
  const importanceDistributionData = [
    { name: 'High', value: 35 },
    { name: 'Medium', value: 45 },
    { name: 'Low', value: 20 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const IMPORTANCE_COLORS = ['#EF4444', '#F59E0B', '#10B981'];
  
  const handleAlertClick = (alertId: string) => {
    markAlertRead(alertId);
    toast.success("Alert Marked as Read", {
      description: "The alert has been marked as read."
    });
  };
  
  const AlertsModal = () => {
    return (
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
                navigate('/alerts');
              }}
              className="bg-needl-primary hover:bg-needl-dark"
            >
              View All Alerts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
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
              onClick={() => navigate('/landing')}
            >
              <Plus className="h-4 w-4" />
              New Feed
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-sm"
              onClick={() => navigate('/manage-feeds')}
            >
              <Settings className="h-4 w-4" />
              Manage Feeds
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

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
          <FolderOpen className="h-3 w-3 mr-1" />
          <span>Choose from our pre-built use cases</span>
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAlertIcon />
      
      <main className="flex-1 relative bg-gray-50">
        <div className={`flex ${isBoardDrawerOpen && !isMobile ? 'ml-[280px]' : 'ml-0'} transition-all duration-300`}>
          <div className="flex-1 container py-8 px-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <BarChart2 className="h-6 w-6 mr-2 text-needl-primary" /> 
                Intelligence Dashboard
              </h1>
              
              <div className="flex gap-2">
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

            {userFeeds.length > 0 ? (
              <>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="overflow-hidden border-none shadow-sm">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <span className="bg-blue-500 text-white p-1 rounded-md mr-2">
                            <BarChart2 className="h-3 w-3" />
                          </span>
                          Source Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={sourceDistributionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                              >
                                {sourceDistributionData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <RechartsTooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="overflow-hidden border-none shadow-sm">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <span className="bg-green-500 text-white p-1 rounded-md mr-2">
                            <BarChart2 className="h-3 w-3" />
                          </span>
                          Alert Trend
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={alertTrendData}>
                              <XAxis dataKey="name" />
                              <YAxis />
                              <RechartsTooltip />
                              <Line type="monotone" dataKey="alerts" stroke="#367d8d" strokeWidth={2} dot={{ stroke: '#367d8d', strokeWidth: 2, r: 4 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="overflow-hidden border-none shadow-sm">
                      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <span className="bg-amber-500 text-white p-1 rounded-md mr-2">
                            <BarChart2 className="h-3 w-3" />
                          </span>
                          Importance Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={importanceDistributionData} layout="vertical">
                              <XAxis type="number" />
                              <YAxis dataKey="name" type="category" width={80} />
                              <RechartsTooltip />
                              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {importanceDistributionData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={IMPORTANCE_COLORS[index % IMPORTANCE_COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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
                      onClick={() => navigate('/alerts')}
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
                        prefix={<Search className="h-4 w-4 text-gray-400" />}
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
      
      <AlertsModal />
    </div>
  );
};

export default Dashboard;
