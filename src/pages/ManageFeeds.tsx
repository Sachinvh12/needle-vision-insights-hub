
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Plus, 
  TrendingUp, 
  BarChart, 
  Globe, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import MainHeader from '../components/MainHeader';
import PageTransition from '../components/PageTransition';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useApp } from '../context/AppContext';
import { toast } from '@/hooks/use-toast';
import { Feed } from '@/types/appTypes';

const ManageFeeds: React.FC = () => {
  const navigate = useNavigate();
  const { state, removeFeed, updateFeed } = useApp();
  const { userFeeds } = state;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteFeedId, setDeleteFeedId] = useState<string | null>(null);
  const [selectedPersonaFilter, setSelectedPersonaFilter] = useState<string | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  const filteredFeeds = userFeeds.filter(feed => {
    // Search filter
    const matchesSearch = searchTerm
      ? feed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feed.query.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
      
    // Persona filter
    const matchesPersona = selectedPersonaFilter
      ? feed.personaType === selectedPersonaFilter
      : true;
      
    // Status filter
    const matchesStatus = selectedStatusFilter
      ? feed.status === selectedStatusFilter
      : true;
      
    // Type filter
    const matchesType = selectedTypeFilter
      ? feed.type === selectedTypeFilter
      : true;
      
    return matchesSearch && matchesPersona && matchesStatus && matchesType;
  });
  
  const handleToggleStatus = (feed: Feed) => {
    const newStatus = feed.status === 'active' ? 'paused' : 'active';
    updateFeed({
      ...feed,
      status: newStatus,
    });
    
    toast.success(`Feed ${newStatus === 'active' ? 'activated' : 'paused'}`, {
      description: `Feed "${feed.name}" has been ${newStatus === 'active' ? 'activated' : 'paused'}.`
    });
  };
  
  const handleEditFeed = (feedId: string) => {
    // In a real app, we would update the setup state and navigate to edit
    navigate(`/setup/step1`);
  };
  
  const handleDeleteFeed = () => {
    if (deleteFeedId) {
      removeFeed(deleteFeedId);
      toast.success("Feed deleted", {
        description: "The intelligence feed has been removed."
      });
      setDeleteFeedId(null);
    }
  };
  
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedPersonaFilter(null);
    setSelectedStatusFilter(null);
    setSelectedTypeFilter(null);
    toast.success("Filters cleared", {
      description: "All filters have been reset."
    });
  };
  
  // Group feeds by persona type for the tabs view
  const feedsByPersona = {
    investor: userFeeds.filter(feed => feed.personaType === 'investor'),
    product: userFeeds.filter(feed => feed.personaType === 'product'),
    researcher: userFeeds.filter(feed => feed.personaType === 'researcher'),
    other: userFeeds.filter(feed => !feed.personaType)
  };
  
  const getPersonaIcon = (personaType: string | undefined) => {
    switch (personaType) {
      case 'investor':
        return <TrendingUp className="h-4 w-4 text-amber-500" />;
      case 'product':
        return <BarChart className="h-4 w-4 text-blue-500" />;
      case 'researcher':
        return <Globe className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };
  
  const getPersonaBadgeColor = (personaType: string | undefined) => {
    switch (personaType) {
      case 'investor':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'product':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'researcher':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getPersonaLabel = (personaType: string | undefined) => {
    switch (personaType) {
      case 'investor':
        return 'Energy Trader';
      case 'product':
        return 'Junior Analyst';
      case 'researcher':
        return 'Researcher';
      default:
        return 'General';
    }
  };

  // Feed card component for grid view
  const FeedGridCard = ({ feed }: { feed: Feed }) => {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="h-full overflow-hidden border-gray-200 hover:border-needl-primary hover:shadow-md transition-all">
          <div className={`h-1 w-full 
            ${feed.type === 'competitor' ? 'bg-red-500' : 
             feed.type === 'market' ? 'bg-blue-500' : 
             feed.type === 'trend' ? 'bg-amber-500' : 'bg-purple-500'}`} 
          />
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium">{feed.name}</h3>
              <Badge 
                variant={feed.status === 'active' ? 'default' : feed.status === 'paused' ? 'outline' : 'destructive'}
                className={feed.status === 'active' ? 'bg-green-500' : ''}
              >
                <span className="text-xs flex items-center">
                  <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1 ${
                    feed.status === 'active' ? 'bg-white' : 
                    feed.status === 'paused' ? 'bg-orange-500' : 'bg-red-500'
                  }`}></span>
                  {feed.status === 'active' ? 'Active' : 
                    feed.status === 'paused' ? 'Paused' : 'Error'}
                </span>
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              <Badge variant="outline" className="capitalize text-xs">
                {feed.type}
              </Badge>
              
              {feed.personaType && (
                <Badge variant="outline" className={`text-xs ${getPersonaBadgeColor(feed.personaType)}`}>
                  <span className="flex items-center gap-1">
                    {getPersonaIcon(feed.personaType)}
                    {getPersonaLabel(feed.personaType)}
                  </span>
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {feed.snippet || feed.query.substring(0, 80) + '...'}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
              <Switch
                checked={feed.status === 'active'}
                onCheckedChange={() => handleToggleStatus(feed)}
                className="data-[state=checked]:bg-green-500"
              />
              
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditFeed(feed.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteFeedId(feed.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader showAlertIcon />
      
      <PageTransition>
        <main className="flex-1 container py-8 px-4">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/intelligence-hub')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Intelligence Hub
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid-2x2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
              </Button>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl font-bold flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2 text-needl-primary" />
                Manage Intelligence Feeds
              </h1>
              
              <Button 
                onClick={() => navigate('/use-cases')} 
                className="bg-needl-primary hover:bg-needl-dark"
              >
                <Plus className="h-4 w-4 mr-1" /> 
                New Feed
              </Button>
            </div>
            
            <div className="bg-white rounded-xl border shadow-sm p-4 md:p-5 mb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
                <div className="w-full md:w-1/3">
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search feeds by name or query..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-2/3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Persona</label>
                    <Select value={selectedPersonaFilter || ""} onValueChange={(val) => setSelectedPersonaFilter(val || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Personas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Personas</SelectItem>
                        <SelectItem value="investor">Energy Trader</SelectItem>
                        <SelectItem value="product">Junior Analyst</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Status</label>
                    <Select value={selectedStatusFilter || ""} onValueChange={(val) => setSelectedStatusFilter(val || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Type</label>
                    <Select value={selectedTypeFilter || ""} onValueChange={(val) => setSelectedTypeFilter(val || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
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
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-sm"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear Filters
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="bg-white shadow-sm border mb-6 p-1 rounded-lg">
                <TabsTrigger 
                  value="all"
                  className="rounded-md"
                >
                  All Feeds
                </TabsTrigger>
                <TabsTrigger 
                  value="investor"
                  className="rounded-md"
                >
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
                    <span>Energy Trader</span>
                    <Badge variant="secondary" className="ml-1 bg-amber-100 text-amber-800">
                      {feedsByPersona.investor.length}
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="product" 
                  className="rounded-md"
                >
                  <div className="flex items-center gap-1">
                    <BarChart className="h-3.5 w-3.5 text-blue-500" />
                    <span>Junior Analyst</span>
                    <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-800">
                      {feedsByPersona.product.length}
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="researcher"
                  className="rounded-md"
                >
                  <div className="flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5 text-purple-500" />
                    <span>Researcher</span>
                    <Badge variant="secondary" className="ml-1 bg-purple-100 text-purple-800">
                      {feedsByPersona.researcher.length}
                    </Badge>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {viewMode === 'list' ? (
                  <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Name</TableHead>
                          <TableHead>Persona</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="hidden lg:table-cell">Criteria</TableHead>
                          <TableHead>Channels</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFeeds.map((feed) => (
                          <TableRow key={feed.id}>
                            <TableCell className="font-medium">{feed.name}</TableCell>
                            <TableCell>
                              {feed.personaType ? (
                                <Badge variant="outline" className={getPersonaBadgeColor(feed.personaType)}>
                                  <span className="flex items-center gap-1">
                                    {getPersonaIcon(feed.personaType)}
                                    {getPersonaLabel(feed.personaType)}
                                  </span>
                                </Badge>
                              ) : (
                                <span className="text-gray-500 text-sm">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {feed.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <span className="truncate block max-w-[300px]">
                                {feed.query.length > 60 ? `${feed.query.substring(0, 60)}...` : feed.query}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                {feed.outputConfig?.channel === 'email' && (
                                  <Badge variant="secondary" className="text-xs py-0">
                                    Email
                                  </Badge>
                                )}
                                {feed.outputConfig?.channel === 'app' && (
                                  <Badge variant="secondary" className="text-xs py-0">
                                    App
                                  </Badge>
                                )}
                                {feed.outputConfig?.channel === 'both' && (
                                  <>
                                    <Badge variant="secondary" className="text-xs py-0">
                                      Email
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs py-0">
                                      App
                                    </Badge>
                                  </>
                                )}
                                {!feed.outputConfig?.channel && (
                                  <Badge variant="secondary" className="text-xs py-0">
                                    App
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={feed.status === 'active'}
                                  onCheckedChange={() => handleToggleStatus(feed)}
                                  className="data-[state=checked]:bg-green-500"
                                />
                                <span className={feed.status === 'active' ? 'text-green-600' : 'text-gray-500'}>
                                  {feed.status === 'active' ? 'Active' : feed.status === 'paused' ? 'Paused' : 'Error'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditFeed(feed.id)}
                                  title="Edit Feed"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setDeleteFeedId(feed.id)}
                                  title="Delete Feed"
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFeeds.map(feed => (
                      <FeedGridCard key={feed.id} feed={feed} />
                    ))}
                  </div>
                )}
                
                {filteredFeeds.length === 0 && (
                  <div className="text-center py-12 border rounded-lg bg-gray-50">
                    <h3 className="text-xl font-medium mb-4">No Intelligence Feeds Found</h3>
                    <p className="text-gray-600 mb-6">No feeds match your current filters</p>
                    <Button onClick={clearAllFilters} variant="outline" className="mr-2">
                      Clear Filters
                    </Button>
                    <Button onClick={() => navigate('/use-cases')} className="bg-needl-primary hover:bg-needl-dark">
                      Create New Feed
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {['investor', 'product', 'researcher'].map(personaType => (
                <TabsContent key={personaType} value={personaType} className="mt-0">
                  {feedsByPersona[personaType].length > 0 ? (
                    viewMode === 'list' ? (
                      <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[250px]">Name</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="hidden lg:table-cell">Criteria</TableHead>
                              <TableHead>Channels</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {feedsByPersona[personaType].map((feed) => (
                              <TableRow key={feed.id}>
                                <TableCell className="font-medium">{feed.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="capitalize">
                                    {feed.type}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                  <span className="truncate block max-w-[300px]">
                                    {feed.query.length > 60 ? `${feed.query.substring(0, 60)}...` : feed.query}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-1">
                                    {feed.outputConfig?.channel === 'email' && (
                                      <Badge variant="secondary" className="text-xs py-0">
                                        Email
                                      </Badge>
                                    )}
                                    {feed.outputConfig?.channel === 'app' && (
                                      <Badge variant="secondary" className="text-xs py-0">
                                        App
                                      </Badge>
                                    )}
                                    {feed.outputConfig?.channel === 'both' && (
                                      <>
                                        <Badge variant="secondary" className="text-xs py-0">
                                          Email
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs py-0">
                                          App
                                        </Badge>
                                      </>
                                    )}
                                    {!feed.outputConfig?.channel && (
                                      <Badge variant="secondary" className="text-xs py-0">
                                        App
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={feed.status === 'active'}
                                      onCheckedChange={() => handleToggleStatus(feed)}
                                      className="data-[state=checked]:bg-green-500"
                                    />
                                    <span className={feed.status === 'active' ? 'text-green-600' : 'text-gray-500'}>
                                      {feed.status === 'active' ? 'Active' : feed.status === 'paused' ? 'Paused' : 'Error'}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleEditFeed(feed.id)}
                                      title="Edit Feed"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => setDeleteFeedId(feed.id)}
                                      title="Delete Feed"
                                      className="text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {feedsByPersona[personaType].map(feed => (
                          <FeedGridCard key={feed.id} feed={feed} />
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="text-center py-12 border rounded-lg bg-gray-50">
                      <h3 className="text-xl font-medium mb-4">No Intelligence Feeds for this Persona</h3>
                      <p className="text-gray-600 mb-6">Create your first intelligence feed for this persona</p>
                      <Button onClick={() => navigate('/use-cases')} className="bg-needl-primary hover:bg-needl-dark">
                        Create New Feed
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </main>
      </PageTransition>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteFeedId} onOpenChange={() => setDeleteFeedId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete this intelligence feed? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteFeedId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteFeed}
            >
              Delete Feed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageFeeds;
