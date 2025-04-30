
import React, { useState, useEffect } from 'react';
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
  X,
  AlertTriangle
} from 'lucide-react';
import MainHeader from '../components/MainHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from '@/components/ui/card';
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
import { 
  BarChart, LineChart, Pie, PieChart, Bar, XAxis, YAxis, 
  Tooltip as RechartsTooltip, Line, Cell, ResponsiveContainer, Legend 
} from 'recharts';
import MetricCards from '../components/intelligence/MetricCards';

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

  // Analytics data
  const alertTrendData = [
    { name: 'Mon', alerts: 4 },
    { name: 'Tue', alerts: 7 },
    { name: 'Wed', alerts: 5 },
    { name: 'Thu', alerts: 8 },
    { name: 'Fri', alerts: 12 },
    { name: 'Sat', alerts: 6 },
    { name: 'Sun', alerts: 3 },
  ];
  
  const sourceDistributionData = [
    { name: 'Web', value: 65 },
    { name: 'Documents', value: 25 },
    { name: 'Other', value: 10 },
  ];
  
  const importanceDistributionData = [
    { name: 'High', value: 35 },
    { name: 'Medium', value: 45 },
    { name: 'Low', value: 20 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const IMPORTANCE_COLORS = ['#EF4444', '#F59E0B', '#10B981'];

  // Recent feeds section
  const recentFeeds = [...userFeeds]
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
    .slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MainHeader />
      
      <main className="flex-1 container py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <BellRing className="h-6 w-6 mr-2 text-needl-primary" />
              Intelligence Hub
            </h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="gap-1"
            >
              <Check className="h-4 w-4" />
              <span className="hidden sm:inline">Mark All Read</span>
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

        <MetricCards 
          totalAlerts={alerts.length} 
          unreadAlerts={unreadCount} 
          highImportanceAlerts={highImportanceCount} 
        />
        
        <Tabs defaultValue={defaultTab} className="mb-6">
          <TabsList className="bg-white shadow-sm border mb-4">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-needl-primary data-[state=active]:text-white">
              Analytics Dashboard
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-needl-primary data-[state=active]:text-white">
              Alerts Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-6">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
            
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Intelligence Feeds</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentFeeds.map(feed => (
                  <motion.div 
                    key={feed.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      className="cursor-pointer h-full transition-all duration-300 hover:shadow-lg border-gray-200 hover:border-needl-primary overflow-hidden"
                      onClick={() => handleFeedClick(feed.id)}
                    >
                      <div className={`h-2 w-full ${feed.type === 'competitor' ? 'bg-red-500' : feed.type === 'market' ? 'bg-blue-500' : feed.type === 'trend' ? 'bg-amber-500' : 'bg-purple-500'}`} />
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
                          <span className="inline-block mx-2">•</span>
                          <span>
                            {new Date(feed.lastActivity || feed.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm text-gray-600 line-clamp-2">{feed.query}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="cursor-pointer h-full flex flex-col items-center justify-center p-8 border-dashed border-2 hover:border-needl-primary transition-colors"
                    onClick={() => navigate('/use-cases')}
                  >
                    <div className="rounded-full bg-needl-primary/10 p-3 mb-3">
                      <Plus className="h-6 w-6 text-needl-primary" />
                    </div>
                    <p className="font-medium text-needl-primary">Create New Feed</p>
                    <p className="text-xs text-gray-500 mt-1">Add more intelligence sources</p>
                  </Card>
                </motion.div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-4">
            <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <h2 className="text-lg font-semibold">All Alerts</h2>
                
                <div className="flex gap-2">
                  <div className="w-full sm:w-auto">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search alerts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9"
                      />
                    </div>
                  </div>
                  
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Alerts</SelectItem>
                      <SelectItem value="unread">Unread Only</SelectItem>
                      <SelectItem value="read">Read Only</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={importance} onValueChange={setImportance}>
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
    </div>
  );
};

export default IntelligenceHub;
