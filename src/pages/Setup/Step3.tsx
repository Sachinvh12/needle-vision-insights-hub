
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, MessageCircle, BellRing, Clock, Calendar, ChevronDown } from 'lucide-react';
import Header from '../../components/Header';
import AnimatedBackground from '../../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import { Chip } from '@/components/ui/chip';

const Step3: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateSetupState, addFeed, resetSetupState } = useApp();
  const { setupState } = state;
  
  const [feedName, setFeedName] = useState(setupState.feedName || '');
  const [alerts, setAlerts] = useState(setupState.outputConfig?.alerts || false);
  const [summaries, setSummaries] = useState(setupState.outputConfig?.summaries || false);
  const [channels, setChannels] = useState<string[]>(setupState.outputConfig?.channels || []);
  const [frequency, setFrequency] = useState(setupState.outputConfig?.frequency || 'realtime');
  const [lookbackRange, setLookbackRange] = useState(setupState.outputConfig?.lookbackRange || 7);
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  
  useEffect(() => {
    updateSetupState({
      feedName,
      outputConfig: {
        alerts,
        summaries,
        channels,
        frequency,
        lookbackRange,
      },
    });
  }, [feedName, alerts, summaries, channels, frequency, lookbackRange, updateSetupState]);
  
  const handleToggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter(c => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };
  
  const handleCreateFeed = () => {
    if (!feedName.trim()) {
      toast.error('Please enter a feed name');
      return;
    }
    
    setIsCreating(true);
    
    setTimeout(() => {
      // Create the feed with the gathered information
      addFeed({
        name: feedName,
        query: setupState.setupQuery || '',
        type: 'market', // This could be more dynamic based on earlier selections
        connectedApps: setupState.connectedApps || [],
        outputConfig: {
          channels: channels,
        },
        // Sample data for display
        snippet: `Auto-generated summary for ${setupState.setupQuery || ''}`,
        sourceMix: {
          web: 65,
          docs: 25,
          other: 10,
        },
      });
      
      setIsCreating(false);
      setShowSuccessScreen(true);
    }, 1500);
  };
  
  if (showSuccessScreen) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 relative">
          <AnimatedBackground variant="glitter" />
          
          <div className="container mx-auto py-12 px-4 relative z-10">
            <div className="max-w-lg mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  >
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">Intelligence Feed Created!</h2>
                <p className="text-gray-600 mb-6">
                  Your intelligence feed "{feedName}" has been created successfully. Needl.ai is now gathering intelligence based on your preferences.
                </p>
                
                <div className="flex flex-col space-y-4">
                  <Button 
                    onClick={() => {
                      navigate('/dashboard');
                      resetSetupState();
                    }}
                    className="bg-needl-primary hover:bg-needl-dark"
                  >
                    Go to Dashboard
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      navigate('/alerts');
                      resetSetupState();
                    }}
                    variant="outline"
                    className="flex items-center justify-center gap-2"
                  >
                    <BellRing className="h-4 w-4" />
                    View Alerts Dashboard
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      navigate('/landing');
                      resetSetupState();
                    }}
                    variant="link"
                  >
                    Create Another Feed
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        <AnimatedBackground variant="glitter" />
        
        <div className="container mx-auto py-12 px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.h2
              className="text-2xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Configure Your Intelligence Output
            </motion.h2>

            <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-5">
                <Label htmlFor="feed-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Feed Name
                </Label>
                <Input
                  id="feed-name"
                  value={feedName}
                  onChange={(e) => setFeedName(e.target.value)}
                  placeholder="E.g., Tech Competitors Intelligence"
                  className="focus:border-needl-primary focus:ring focus:ring-needl-lighter"
                />
              </div>

              <div className="mb-5">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking Query Summary
                </p>
                <Card className="bg-gray-50 p-4 text-sm text-gray-600">
                  {setupState.setupQuery || "No query defined"}
                </Card>
              </div>

              <div className="mb-5">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Connected Sources
                </p>
                <div className="flex flex-wrap gap-2">
                  {setupState.connectedApps && setupState.connectedApps.length > 0 ? (
                    setupState.connectedApps.map((app) => (
                      <Chip key={app} variant="secondary">
                        {app}
                      </Chip>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No connected sources</span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-5 mt-5">
                <p className="text-lg font-medium mb-4">Output Options</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="alerts-switch" className="font-medium mb-1 block">
                      Real-time Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Get notified about important updates
                    </p>
                  </div>
                  <Switch
                    id="alerts-switch"
                    checked={alerts}
                    onCheckedChange={setAlerts}
                  />
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Label htmlFor="summaries-switch" className="font-medium mb-1 block">
                      Periodic Summaries
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive condensed insights on schedule
                    </p>
                  </div>
                  <Switch
                    id="summaries-switch"
                    checked={summaries}
                    onCheckedChange={setSummaries}
                  />
                </div>

                {(alerts || summaries) && (
                  <>
                    <p className="text-lg font-medium mb-4">Delivery Options</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="channel-email"
                            type="checkbox"
                            checked={channels.includes('email')}
                            onChange={() => handleToggleChannel('email')}
                            className="rounded border-gray-300 text-needl-primary focus:ring-needl-lighter"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <Label htmlFor="channel-email" className="font-medium flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            Email
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="channel-slack"
                            type="checkbox"
                            checked={channels.includes('slack')}
                            onChange={() => handleToggleChannel('slack')}
                            className="rounded border-gray-300 text-needl-primary focus:ring-needl-lighter"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <Label htmlFor="channel-slack" className="font-medium flex items-center">
                            <MessageCircle className="h-4 w-4 mr-2 text-gray-500" />
                            Messaging App
                          </Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {summaries && (
                  <div className="space-y-4 mb-4">
                    <div>
                      <Label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                        Summary Frequency
                      </Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger id="frequency" className="w-full">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="lookback" className="block text-sm font-medium text-gray-700 mb-1">
                      Initial Lookback Period
                    </Label>
                    <Select value={lookbackRange.toString()} onValueChange={(v) => setLookbackRange(parseInt(v))}>
                      <SelectTrigger id="lookback" className="w-full">
                        <SelectValue placeholder="Select lookback period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Last 24 hours</SelectItem>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 3 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="outline"
                onClick={() => navigate('/setup/step2')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <Button
                onClick={handleCreateFeed}
                disabled={isCreating || !feedName.trim()}
                className="gap-2 bg-needl-primary hover:bg-needl-dark"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    Create Feed
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Step3;
