
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart2,
  BellRing,
  Check,
  Filter,
  Grid2x2,
  Info,
  Plus,
  Search,
  X,
  TrendingUp,
  FileText,
  BarChart,
  ChevronRight,
  Globe
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useApp } from '../context/AppContext';
import { toast } from '@/hooks/use-toast';
import AlertsList from '../components/alerts/AlertsList';
import MetricCards from '../components/intelligence/MetricCards';
import AnalyticsCharts from '../components/intelligence/AnalyticsCharts';
import FeedCard from '../components/intelligence/FeedCard';
import PageTransition from '../components/PageTransition';
import PersonaCard from '../components/personas/PersonaCard';
import { Feed } from '@/types/appTypes';

const IntelligenceHub: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  
  const { state, markAllAlertsRead, selectFeed } = useApp();
  const { alerts, userFeeds } = state;
  
  const [filter, setFilter] = useState('all');
  const [importance, setImportance] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

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

  // Filter feeds by persona type if selected
  const filteredFeeds = selectedPersona 
    ? userFeeds.filter(feed => feed.personaType === selectedPersona)
    : userFeeds;

  const handleMarkAllRead = () => {
    markAllAlertsRead();
    toast.success("All alerts marked as read");
  };

  const handleFeedClick = (feedId: string) => {
    selectFeed(feedId);
    navigate(`/battlecard/${feedId}`);
  };

  const handlePersonaSelect = (persona: string | null) => {
    setSelectedPersona(persona === selectedPersona ? null : persona);
  };

  // Recent feeds section
  const recentFeeds = [...filteredFeeds]
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
    .slice(0, 3);
    
  // Group feeds by persona type
  const feedsByPersona = userFeeds.reduce((acc, feed) => {
    const personaType = feed.personaType || 'other';
    if (!acc[personaType]) {
      acc[personaType] = [];
    }
    acc[personaType].push(feed);
    return acc;
  }, {} as Record<string, Feed[]>);
  
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
          
          {/* Persona Filter Cards */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ y: -3 }}
              onClick={() => handlePersonaSelect('investor')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPersona === 'investor' ? 
                'border-amber-500 bg-amber-50 shadow-md' : 
                'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  selectedPersona === 'investor' ? 'bg-amber-500' : 'bg-amber-100'
                }`}>
                  <TrendingUp className={`h-5 w-5 ${
                    selectedPersona === 'investor' ? 'text-white' : 'text-amber-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium">Energy Trader</h3>
                  <p className="text-xs text-gray-500">Commodity prices, market volatility</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -3 }}
              onClick={() => handlePersonaSelect('product')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPersona === 'product' ? 
                'border-blue-500 bg-blue-50 shadow-md' : 
                'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  selectedPersona === 'product' ? 'bg-blue-500' : 'bg-blue-100'
                }`}>
                  <BarChart className={`h-5 w-5 ${
                    selectedPersona === 'product' ? 'text-white' : 'text-blue-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium">Junior Analyst</h3>
                  <p className="text-xs text-gray-500">Financial metrics, analyst ratings</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -3 }}
              onClick={() => handlePersonaSelect('researcher')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPersona === 'researcher' ? 
                'border-purple-500 bg-purple-50 shadow-md' : 
                'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  selectedPersona === 'researcher' ? 'bg-purple-500' : 'bg-purple-100'
                }`}>
                  <Globe className={`h-5 w-5 ${
                    selectedPersona === 'researcher' ? 'text-white' : 'text-purple-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium">Researcher</h3>
                  <p className="text-xs text-gray-500">Industry trends, regulatory changes</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {selectedPersona && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-white p-4 rounded-xl border shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  {selectedPersona === 'investor' && (
                    <>
                      <TrendingUp className="h-5 w-5 text-amber-500" />
                      <h2 className="font-semibold text-lg">Energy Trader Dashboard</h2>
                    </>
                  )}
                  {selectedPersona === 'product' && (
                    <>
                      <BarChart className="h-5 w-5 text-blue-500" />
                      <h2 className="font-semibold text-lg">Junior Analyst Dashboard</h2>
                    </>
                  )}
                  {selectedPersona === 'researcher' && (
                    <>
                      <Globe className="h-5 w-5 text-purple-500" />
                      <h2 className="font-semibold text-lg">Researcher Dashboard</h2>
                    </>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedPersona(null)}
                  className="text-gray-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Persona-specific content */}
              <div className="space-y-4">
                {selectedPersona === 'investor' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h3 className="font-medium text-amber-800 mb-2">Market Volatility</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">30-Day</span>
                          <Badge className="bg-amber-500">High</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">90-Day</span>
                          <Badge variant="outline" className="text-amber-600 border-amber-300">Moderate</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h3 className="font-medium text-amber-800 mb-2">Supply/Demand Status</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Crude Oil</span>
                          <Badge variant="destructive">Supply Deficit</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Natural Gas</span>
                          <Badge variant="outline" className="text-green-600 border-green-300">Surplus</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h3 className="font-medium text-amber-800 mb-2">Geopolitical Risk Alert</h3>
                      <div className="text-sm text-amber-800">
                        <p className="mb-2">Middle East tensions escalating - potential impact on shipping routes.</p>
                        <Button variant="link" className="text-amber-600 p-0 h-auto">View Analysis</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedPersona === 'product' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-2">Recent Ratings Changes</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Morgan Stanley</span>
                          <Badge className="bg-green-500">Upgrade to Buy</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Goldman Sachs</span>
                          <Badge variant="outline" className="text-blue-600 border-blue-300">Maintain Hold</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-2">Earnings Performance</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Q1 2024</span>
                          <Badge className="bg-green-500">Beat by 15%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Q4 2023</span>
                          <Badge variant="destructive">Missed by 3%</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-2">Key Financial Metrics</h3>
                      <div className="text-sm text-blue-800 space-y-1">
                        <div className="flex justify-between">
                          <span>P/E Ratio</span>
                          <span className="font-medium">22.5x</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue Growth</span>
                          <span className="font-medium">+18% YoY</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Debt to Equity</span>
                          <span className="font-medium">0.78</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedPersona === 'researcher' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h3 className="font-medium text-purple-800 mb-2">Regulatory Updates</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">SEC Filing Requirements</span>
                          <Badge className="bg-purple-500">New Policy</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">EU Data Privacy</span>
                          <Badge variant="outline" className="text-purple-600 border-purple-300">Pending</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h3 className="font-medium text-purple-800 mb-2">Technology Adoption</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">AI/ML Solutions</span>
                          <Badge className="bg-green-500">Rapid Growth</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Quantum Computing</span>
                          <Badge variant="outline" className="text-purple-600 border-purple-300">Early Stage</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h3 className="font-medium text-purple-800 mb-2">Recent Academic Research</h3>
                      <div className="text-sm text-purple-800">
                        <p className="mb-2">New findings on sustainability metrics impact on long-term market valuation.</p>
                        <Button variant="link" className="text-purple-600 p-0 h-auto">View Studies</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">Relevant Intelligence Feeds</h3>
                    <Button 
                      variant="link" 
                      className="text-needl-primary p-0 h-auto text-sm flex items-center gap-1"
                      onClick={() => navigate('/use-cases')}
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add Feed</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {feedsByPersona[selectedPersona]?.length > 0 ? (
                      feedsByPersona[selectedPersona].slice(0, 3).map(feed => (
                        <FeedCard 
                          key={feed.id} 
                          feed={feed} 
                          onClick={() => handleFeedClick(feed.id)} 
                        />
                      ))
                    ) : (
                      <div className="col-span-3 py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <p className="text-gray-500 mb-3">No feeds found for this persona</p>
                        <Button 
                          onClick={() => navigate('/use-cases')}
                          className="bg-needl-primary hover:bg-needl-dark"
                          size="sm"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Create First Feed
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
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
