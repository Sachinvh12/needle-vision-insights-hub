
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, Play, Pause } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useApp } from '../context/AppContext';

const ManageFeeds: React.FC = () => {
  const navigate = useNavigate();
  const { state, removeFeed, updateFeed } = useApp();
  const { userFeeds } = state;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteFeedId, setDeleteFeedId] = useState<string | null>(null);
  
  const filteredFeeds = searchTerm
    ? userFeeds.filter(feed => 
        feed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feed.query.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : userFeeds;
  
  const handleToggleStatus = (feed: any) => {
    const newStatus = feed.status === 'active' ? 'paused' : 'active';
    updateFeed({
      ...feed,
      status: newStatus,
    });
  };
  
  const handleEditFeed = (feedId: string) => {
    // In a real app, we would update the setup state and navigate to edit
    navigate(`/setup/step1`);
  };
  
  const handleDeleteFeed = () => {
    if (deleteFeedId) {
      removeFeed(deleteFeedId);
      setDeleteFeedId(null);
    }
  };
  
  // Fixed comparisons for channel strings
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAlertIcon />
      
      <main className="flex-1 container py-8 px-4">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="sm:max-w-xs w-full">
            <Input
              placeholder="Search feeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-6">Manage Intelligence Feeds</h1>
          
          {userFeeds.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium mb-4">No Intelligence Feeds Yet</h3>
              <p className="text-gray-600 mb-6">Create your first intelligence feed to start gathering insights</p>
              <Button onClick={() => navigate('/landing')} className="bg-needl-primary hover:bg-needl-dark glaze">
                Create New Feed
              </Button>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Criteria</TableHead>
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
                        <Badge variant="outline" className="capitalize">
                          {feed.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
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
                          {/* Fixed comparison for app */}
                          {feed.outputConfig?.channel === 'app' && (
                            <Badge variant="secondary" className="text-xs py-0">
                              App
                            </Badge>
                          )}
                          {/* Fixed comparison for both */}
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
                          />
                          <span className={feed.status === 'active' ? 'text-green-600' : 'text-gray-500'}>
                            {feed.status === 'active' ? 'Active' : 'Paused'}
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
          )}
          
          {userFeeds.length > 0 && filteredFeeds.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No feeds match your search term</p>
              <Button variant="link" onClick={() => setSearchTerm('')} className="mt-2">
                Clear Search
              </Button>
            </div>
          )}
        </motion.div>
      </main>
      
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
