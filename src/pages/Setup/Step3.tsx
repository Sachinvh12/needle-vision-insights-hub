import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';
import MainHeader from '../../components/MainHeader';

const Step3 = () => {
  const navigate = useNavigate();
  const { state, updateSetupState, addFeed, resetSetupState } = useApp();
  const { setupState } = state;
  
  // Default values for the form - ensuring we use the correct type properties
  const feedName = setupState.feedName || '';
  const outputFormat = setupState.outputFormat || 'dashboard';
  const connectedApps = setupState.connectedApps || [];
  
  // State for form controls with proper type defined
  const [enableAlerts, setEnableAlerts] = useState(true);
  const [enableSummaries, setEnableSummaries] = useState(true);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [lookbackRange, setLookbackRange] = useState(30);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the setup state with the final configuration
    updateSetupState({
      feedName,
      outputConfig: {
        alerts: enableAlerts,
        summaries: enableSummaries,
        frequency: frequency,
        lookbackRange: lookbackRange
      }
    });
    
    // Create a feed with the collected data - using the proper structure for Feed type
    addFeed({
      name: feedName,
      query: setupState.setupQuery || '',
      type: setupState.selectedPersona || 'custom',
      snippet: `Intelligence feed for ${setupState.setupQuery || 'custom search'}`,
      outputConfig: {
        format: outputFormat,
        frequency: frequency as 'daily' | 'weekly' | 'monthly',
        channel: 'app'
      }
      // Removed connectedApps as it's not part of the Feed type
    });
    
    // Show success notification
    toast.success("Intelligence Feed Created", {
      description: `Your feed "${feedName}" has been created successfully.`
    });
    
    // Reset setup state
    resetSetupState();
    
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  const handleBack = () => {
    navigate('/setup/step2');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <MainHeader />
        
        <main className="flex-1 container py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Configure Your Intelligence Feed</h1>
              <p className="text-gray-600">
                Set up how you want to receive insights and alerts from your feed.
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Feed Name Field */}
                <div>
                  <Label htmlFor="feedName" className="text-base">Feed Name</Label>
                  <Input
                    id="feedName"
                    value={feedName}
                    onChange={(e) => updateSetupState({ feedName: e.target.value })}
                    placeholder="My Intelligence Feed"
                    className="mt-2"
                    required
                  />
                </div>
                
                {/* Output Format Selection */}
                <div>
                  <Label className="text-base">Output Format</Label>
                  <RadioGroup
                    value={outputFormat}
                    onValueChange={(value) => updateSetupState({ outputFormat: value })}
                    className="mt-2 flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dashboard" id="dashboard" />
                      <Label htmlFor="dashboard" className="font-normal cursor-pointer">
                        Dashboard (View in app)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="report" id="report" />
                      <Label htmlFor="report" className="font-normal cursor-pointer">
                        Summary Report (Daily/Weekly digest)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="alert" id="alert" />
                      <Label htmlFor="alert" className="font-normal cursor-pointer">
                        Real-time Alerts (Get notified immediately)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Alert Settings */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium mb-3">Notification Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="alerts" className="font-normal">Enable Alerts</Label>
                        <p className="text-sm text-gray-500">Get notified about important events</p>
                      </div>
                      <Switch 
                        id="alerts"
                        checked={enableAlerts}
                        onCheckedChange={setEnableAlerts}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="summaries" className="font-normal">Enable Summaries</Label>
                        <p className="text-sm text-gray-500">Receive periodic intelligence summaries</p>
                      </div>
                      <Switch 
                        id="summaries"
                        checked={enableSummaries}
                        onCheckedChange={setEnableSummaries}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="frequency" className="font-normal">Update Frequency</Label>
                      <RadioGroup
                        id="frequency"
                        value={frequency}
                        onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setFrequency(value)}
                        className="mt-2 flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily" id="daily-option" />
                          <Label htmlFor="daily-option" className="font-normal text-sm cursor-pointer">
                            Daily (Once per day)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly" className="font-normal text-sm cursor-pointer">
                            Weekly (Once per week)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="font-normal text-sm cursor-pointer">
                            Monthly (Once per month)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lookback" className="font-normal">Lookback Range</Label>
                        <span className="text-sm text-gray-700 font-medium">{lookbackRange} days</span>
                      </div>
                      <Slider
                        id="lookback"
                        value={[lookbackRange]}
                        min={7}
                        max={90}
                        step={1}
                        onValueChange={(values) => setLookbackRange(values[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>7 days</span>
                        <span>30 days</span>
                        <span>90 days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Connected Data Sources */}
                <div>
                  <Label className="text-base mb-2 block">Connected Data Sources</Label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {connectedApps.length > 0 ? (
                      <ul className="space-y-2">
                        {connectedApps.map((app) => (
                          <li key={app} className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">{app.charAt(0).toUpperCase() + app.slice(1)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No data sources connected</p>
                    )}
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-needl-primary hover:bg-needl-dark gap-2"
                  >
                    Create Feed
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Step3;
