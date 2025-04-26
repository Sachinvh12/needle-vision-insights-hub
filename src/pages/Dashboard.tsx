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
} from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Alert } from '../context/AppContext';
import { BarChart, LineChart, Pie, PieChart, Bar, XAxis, YAxis, Tooltip, Line, Cell, ResponsiveContainer, Legend } from 'recharts';
import { toast } from '@/hooks/use-toast';

// Helper function to render status with the appropriate JSX
const renderStatus = (status: string) => {
  if (status === 'active') {
    return <span className="text-green-500 flex items-center"><span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>Active</span>;
  } else if (status === 'paused') {
    return <span className="text-orange-500 flex items-center"><span className="h-2 w-2 rounded-full bg-orange-500 mr-1"></span>Paused</span>;
  } else if (status === 'error') {
    return <span className="text-red-500 flex items-center"><span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>Error</span>;
  }
  return null;
};

// This function returns a string for the status text
const getFeedStatusText = (status: string): string => {
  if (status === 'active') return 'Active';
  if (status === 'paused') return 'Paused';
  if (status === 'error') return 'Error';
  return 'Unknown';
};

const FeedCard: React.FC<{ feed: any; onClick: () => void }> = ({ feed, onClick }) => {
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
              {renderStatus(feed.status)}
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
        <CardContent>
          {feed.sourceMix && (
            <div className="flex items-center mb-3 h-2">
              <div className="bg-blue-400 h-full rounded-l-full" style={{ width: `${feed.sourceMix.web}%` }} />
              <div className="bg-amber-400 h-full" style={{ width: `${feed.sourceMix.docs}%` }} />
              <div className="bg-purple-400 h-full rounded-r-full" style={{ width: `${feed.sourceMix.other}%` }} />
            </div>
          )}
          
          <p className="text-sm text-gray-600 line-clamp-2">{feed.snippet}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { state, setFilters, addSavedView, selectFeed, removeSavedView, markAlertRead } = useApp();
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
    toast({
      title: "Filters Applied",
      description: "Your feed view has been updated with the selected filters."
    });
  };
  
  const handleClearFilters = () => {
    setCompany('');
    setMarket('');
    setImportance('');
    setSearchTerm('');
    setFilters({});
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset."
    });
  };
  
  const handleSaveView = () => {
    if (newViewName.trim()) {
      addSavedView(newViewName.trim());
      setIsSaveViewOpen(false);
      setNewViewName('');
    }
  };
  
  const handleSelectView = (viewId: string) => {
    const view = savedViews.find(v => v.id === viewId);
    if (view) {
      setFilters(view.filters);
      toast({
        title: `Board "${view.name}" Applied`,
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
    // In a real app, you'd likely navigate to a more detailed view
    toast({
      title: "Alert Marked as Read",
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
            {alerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} onClick={() => handleAlertClick(alert.id)} />
            ))}
            {alerts.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <div className="mb-3">
                  <span className="inline-block p-3 rounded-full bg-gray-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <p className="text-lg font-medium mb-1">No alerts yet</p>
                <p className="text-sm">They will appear here when detected</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => selectFeed(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  const BoardDrawer = () => {
    return (
      <Drawer open={isBoardDrawerOpen} onOpenChange={setIsBoardDrawerOpen}>
        <DrawerContent className="fixed left-0 right-auto top-16 bottom-0 w-[250px] rounded-none border-r border-t-0 border-b-0 border-l-0">
          <DrawerHeader className="px-4 py-3 border-b">
            <DrawerTitle className="text-base">Boards</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
            {savedViews.length > 0 ? (
              savedViews.map((view) => (
                <div
                  key={view.id}
                  onClick={() => handleSelectView(view.id)}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <span className="text-sm truncate">{view.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSavedView(view.id);
                    }}
                  >
                    <span className="text-xs">×</span>
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500 py-6">
                No saved boards yet
              </div>
            )}
          </div>
          <DrawerFooter className="p-4 pt-0">
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
  
  const AlertItem: React.FC<{ alert: Alert; onClick: () => void }> = ({ alert, onClick }) => {
    return (
      <div 
        className={`p-3 rounded-md border ${alert.read ? 'bg-white' : 'bg-blue-50'} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={onClick}
      >
        <div className="flex justify-between mb-1">
          <span className="font-medium text-sm">{alert.feedName}</span>
          <Badge variant={alert.importance === 'high' ? 'destructive' : alert.importance === 'medium' ? 'default' : 'outline'}>
            {alert.importance}
          </Badge>
        </div>
        <h3 className="font-semibold mb-1">{alert.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{alert.summary}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            {alert.source.type === 'web' ? (
              <span className="flex items-center gap-1">
                🌐 Source: {alert.source.name}
                {alert.source.url && (
                  <a 
                    href={alert.source.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-needl-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🔗 Link
                  </a>
                )}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                📄 Source: {alert.source.name}
              </span>
            )}
          </div>
          <span>
            {new Date(alert.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAlertIcon />
      
      <main className="flex-1 relative">
        <div className={`flex ${isBoardDrawerOpen && !isMobile ? 'ml-[250px]' : 'ml-0'} transition-all duration-300`}>
          <div className="flex-1 container py-8 px-4">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Intelligence Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Source Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
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
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Alert Trend (Last 7 Days)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={alertTrendData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="alerts" stroke="#367d8d" strokeWidth={2} dot={{ stroke: '#367d8d', strokeWidth: 2, r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Importance Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={importanceDistributionData} layout="vertical">
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={80} />
                          <Tooltip />
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
            </section>
            
            <section className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Intelligence Feeds</h2>
                <div className="mt-2 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => setIsBoardDrawerOpen(!isBoardDrawerOpen)}
                  >
                    <Grid2x2 className="h-4 w-4" />
                    <span>{isBoardDrawerOpen ? 'Hide' : 'Show'} Boards</span>
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
            </section>
            
            <section>
              <AnimatePresence>
                {userFeeds.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <h3 className="text-xl font-medium mb-4">No Intelligence Feeds Yet</h3>
                    <p className="text-gray-600 mb-6">Create your first intelligence feed to start gathering insights</p>
                    <Button onClick={() => navigate('/landing')} className="gap-2 bg-needl-primary hover:bg-needl-dark glaze">
                      <Plus className="h-4 w-4" />
                      Create New Feed
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                )}
              </AnimatePresence>
              
              {userFeeds.length > 0 && feedsToDisplay.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No feeds match your filters</p>
                  <Button variant="link" onClick={handleClearFilters} className="mt-2">
                    Clear Filters
                  </Button>
                </div>
              )}
            </section>
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
            <Button onClick={handleSaveView} disabled={!newViewName.trim()}>
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
