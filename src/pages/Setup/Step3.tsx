
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import AnimatedBackground from '../../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, MessageSquare, Cloud, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Step3: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateSetupState, addFeed, resetSetupState } = useApp();
  const { setupState, connectedApps } = state;

  const [feedName, setFeedName] = useState(setupState.feedName || '');
  const [alerts, setAlerts] = useState(setupState.outputConfig.alerts);
  const [summaries, setSummaries] = useState(setupState.outputConfig.summaries);
  const [channels, setChannels] = useState<string[]>(setupState.outputConfig.channels || ['email']);
  const [frequency, setFrequency] = useState(setupState.outputConfig.frequency || 'daily');
  const [lookbackRange, setLookbackRange] = useState(setupState.outputConfig.lookbackRange || 7);

  // Channel options
  const channelOptions = [
    { id: 'email', name: 'Email', icon: <Mail className="h-4 w-4" /> },
    { id: 'slack', name: 'Slack', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'storage', name: 'Cloud Storage', icon: <Cloud className="h-4 w-4" /> },
  ];

  const toggleChannel = (channelId: string) => {
    if (channels.includes(channelId)) {
      setChannels(channels.filter(id => id !== channelId));
    } else {
      setChannels([...channels, channelId]);
    }
  };

  const handleActivate = () => {
    // Update setup state one last time
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

    // Create a new feed
    addFeed({
      name: feedName,
      query: setupState.setupQuery,
      type: 'custom',
      connectedApps,
      outputConfig: {
        alerts,
        summaries,
        channels,
        frequency,
        lookbackRange,
      },
      sourceMix: {
        web: 60,
        docs: 35,
        other: 5,
      },
      snippet: `Tracking ${setupState.setupQuery.substring(0, 50)}...`,
    });

    // Reset setup state
    resetSetupState();

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        <AnimatedBackground />
        
        <div className="container mx-auto py-12 px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.h2
              className="text-2xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Configure Your Intelligence Outputs
            </motion.h2>
            
            {connectedApps.length > 0 && (
              <motion.div
                className="flex flex-wrap justify-center gap-2 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {connectedApps.map(app => (
                  <Badge key={app} variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    {app === 'google-drive' ? '📁 Google Drive' : 
                     app === 'dropbox' ? '📦 Dropbox' : 
                     app === 'onedrive' ? '☁️ OneDrive' : 
                     app === 'upload' ? '📤 Uploaded Files' : app}
                  </Badge>
                ))}
              </motion.div>
            )}
            
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 text-xs">!</span>
                    </div>
                    Real-time Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">
                        Get notified immediately when important intelligence is found
                      </p>
                      <div className="flex items-center">
                        <Checkbox
                          id="alerts"
                          checked={alerts}
                          onCheckedChange={(checked) => setAlerts(checked as boolean)}
                          className="data-[state=checked]:bg-needl-primary data-[state=checked]:border-needl-primary"
                        />
                        <label htmlFor="alerts" className="ml-2 text-sm font-medium">
                          Enable alerts
                        </label>
                      </div>
                    </div>
                    
                    {/* Alert animation */}
                    <div className="w-16 h-16 relative">
                      <motion.div
                        className="absolute inset-0 bg-red-50 rounded-full"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl">🔔</span>
                      </div>
                    </div>
                  </div>
                  
                  {alerts && (
                    <div className="pl-6 space-y-3">
                      <p className="text-sm text-gray-500">Send alerts to:</p>
                      <div className="flex flex-wrap gap-3">
                        {channelOptions.map(channel => (
                          <div
                            key={channel.id}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer border transition-colors ${
                              channels.includes(channel.id)
                                ? 'border-needl-primary bg-needl-lighter/30 text-needl-dark'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleChannel(channel.id)}
                          >
                            {channel.icon}
                            <span className="text-sm">{channel.name}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Alerts will be sent instantly when detected
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-xs">📊</span>
                    </div>
                    Intelligence Summaries
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">
                        Receive regular summaries of gathered intelligence
                      </p>
                      <div className="flex items-center">
                        <Checkbox
                          id="summaries"
                          checked={summaries}
                          onCheckedChange={(checked) => setSummaries(checked as boolean)}
                          className="data-[state=checked]:bg-needl-primary data-[state=checked]:border-needl-primary"
                        />
                        <label htmlFor="summaries" className="ml-2 text-sm font-medium">
                          Enable summaries
                        </label>
                      </div>
                    </div>
                    
                    {/* Summary animation */}
                    <div className="w-16 h-16 relative">
                      <motion.div
                        className="absolute inset-0 bg-blue-50 rounded-md"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                      <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <div className="w-8 h-1 bg-blue-200 rounded-full mb-1" />
                        <div className="w-10 h-1 bg-blue-300 rounded-full mb-1" />
                        <div className="w-6 h-1 bg-blue-200 rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {summaries && (
                    <div className="pl-6 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="frequency">Frequency</Label>
                          <Select
                            value={frequency}
                            onValueChange={setFrequency}
                          >
                            <SelectTrigger id="frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Look-back Range ({lookbackRange} days)</Label>
                          <Slider
                            value={[lookbackRange]}
                            min={1}
                            max={30}
                            step={1}
                            onValueChange={(value) => setLookbackRange(value[0])}
                            className="py-2"
                          />
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-2">Send summaries to:</p>
                      <div className="flex flex-wrap gap-3">
                        {channelOptions.map(channel => (
                          <div
                            key={channel.id}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer border transition-colors ${
                              channels.includes(channel.id)
                                ? 'border-needl-primary bg-needl-lighter/30 text-needl-dark'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleChannel(channel.id)}
                          >
                            {channel.icon}
                            <span className="text-sm">{channel.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="space-y-3">
                <Label htmlFor="feed-name">Name Your Intelligence Feed</Label>
                <Input
                  id="feed-name"
                  placeholder="E.g., TechCorp Competitive Analysis"
                  value={feedName}
                  onChange={(e) => setFeedName(e.target.value)}
                  className="focus:border-needl-primary focus:ring focus:ring-needl-lighter"
                />
              </div>
              
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
                  onClick={handleActivate}
                  disabled={!feedName.trim() || (!alerts && !summaries) || channels.length === 0}
                  className="gap-2 bg-needl-primary hover:bg-needl-dark glaze"
                >
                  Activate Solution
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Step3;
