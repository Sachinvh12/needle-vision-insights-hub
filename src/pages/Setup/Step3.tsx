
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, Bell, Clock, Calendar, FileText, BarChart3, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useApp } from '../../context/AppContext';
import SetupPageWrapper from '../../components/setup/SetupPageWrapper';
import SetupStepIndicator from '../../components/setup/SetupStepIndicator';
import SetupTransition from '../../components/setup/SetupTransition';
import EnhancedCard from '../../components/setup/EnhancedCard';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a short delay for better UX
    setTimeout(() => {
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
      });
      
      // Show success notification
      toast.success("Intelligence Feed Created", {
        description: `Your feed "${feedName}" has been created successfully.`
      });
      
      // Reset setup state
      resetSetupState();
      
      // Navigate to dashboard
      navigate('/dashboard');
    }, 1500);
  };
  
  const handleBack = () => {
    navigate('/setup/step2');
  };
  
  const outputFormatOptions = [
    { 
      value: 'dashboard', 
      label: 'Dashboard', 
      description: 'View insights in app',
      icon: <BarChart3 className="w-5 h-5 text-needl-primary" />
    },
    { 
      value: 'report', 
      label: 'Summary Report', 
      description: 'Daily/Weekly digest',
      icon: <FileText className="w-5 h-5 text-blue-600" />
    },
    { 
      value: 'alert', 
      label: 'Real-time Alerts', 
      description: 'Get notified immediately',
      icon: <Zap className="w-5 h-5 text-amber-500" /> 
    }
  ];
  
  return (
    <SetupPageWrapper
      title="Configure Your Intelligence Feed"
      subtitle="Set up how you want to receive insights and alerts from your feed"
      backgroundVariant="pulse"
    >
      <SetupStepIndicator currentStep={3} />
      
      <SetupTransition>
        <form onSubmit={handleSubmit}>
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100/80 p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Feed Name Field */}
              <div className="space-y-2">
                <Label htmlFor="feedName" className="text-base font-medium">Feed Name</Label>
                <Input
                  id="feedName"
                  value={feedName}
                  onChange={(e) => updateSetupState({ feedName: e.target.value })}
                  placeholder="My Intelligence Feed"
                  className="text-base"
                  required
                />
              </div>
              
              {/* Output Format Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Output Format</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {outputFormatOptions.map((option) => (
                    <EnhancedCard
                      key={option.value}
                      isSelected={outputFormat === option.value}
                      onClick={() => updateSetupState({ outputFormat: option.value })}
                      className="p-0 overflow-hidden"
                    >
                      <div className="p-4 flex items-center">
                        <div className="mr-3">
                          <RadioGroupItem 
                            value={option.value} 
                            id={option.value} 
                            className="sr-only"
                            checked={outputFormat === option.value}
                          />
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            outputFormat === option.value 
                              ? 'bg-needl-lighter' 
                              : 'bg-gray-100'
                          }`}>
                            {option.icon}
                          </div>
                        </div>
                        
                        <div>
                          <Label 
                            htmlFor={option.value} 
                            className="font-medium cursor-pointer block"
                          >
                            {option.label}
                          </Label>
                          <span className="text-xs text-gray-500">{option.description}</span>
                        </div>
                      </div>
                    </EnhancedCard>
                  ))}
                </div>
              </div>
              
              {/* Alert Settings */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-5">
                  <Bell className="w-5 h-5 text-needl-primary mr-2" />
                  <h3 className="font-medium text-lg">Notification Settings</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="alerts" className="font-medium">Enable Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified about important events</p>
                    </div>
                    <Switch 
                      id="alerts"
                      checked={enableAlerts}
                      onCheckedChange={setEnableAlerts}
                      className="data-[state=checked]:bg-needl-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="summaries" className="font-medium">Enable Summaries</Label>
                      <p className="text-sm text-gray-500">Receive periodic intelligence summaries</p>
                    </div>
                    <Switch 
                      id="summaries"
                      checked={enableSummaries}
                      onCheckedChange={setEnableSummaries}
                      className="data-[state=checked]:bg-needl-primary"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-needl-primary mr-2" />
                      <Label htmlFor="frequency" className="font-medium">Update Frequency</Label>
                    </div>
                    
                    <RadioGroup
                      id="frequency"
                      value={frequency}
                      onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setFrequency(value)}
                      className="flex justify-between space-x-2"
                    >
                      <div className="flex-1">
                        <div className={`border ${frequency === 'daily' ? 'border-needl-primary bg-needl-lighter/30' : 'border-gray-200'} rounded-lg p-3 text-center cursor-pointer transition-all hover:bg-gray-50`}
                             onClick={() => setFrequency('daily')}>
                          <RadioGroupItem value="daily" id="daily-option" className="sr-only" />
                          <Label htmlFor="daily-option" className="cursor-pointer">
                            <Calendar className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-sm font-medium block">Daily</span>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className={`border ${frequency === 'weekly' ? 'border-needl-primary bg-needl-lighter/30' : 'border-gray-200'} rounded-lg p-3 text-center cursor-pointer transition-all hover:bg-gray-50`}
                             onClick={() => setFrequency('weekly')}>
                          <RadioGroupItem value="weekly" id="weekly" className="sr-only" />
                          <Label htmlFor="weekly" className="cursor-pointer">
                            <Calendar className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-sm font-medium block">Weekly</span>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className={`border ${frequency === 'monthly' ? 'border-needl-primary bg-needl-lighter/30' : 'border-gray-200'} rounded-lg p-3 text-center cursor-pointer transition-all hover:bg-gray-50`}
                             onClick={() => setFrequency('monthly')}>
                          <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                          <Label htmlFor="monthly" className="cursor-pointer">
                            <Calendar className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-sm font-medium block">Monthly</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lookback" className="font-medium">Lookback Range</Label>
                      <span className="text-sm font-medium px-2 py-1 bg-needl-lighter text-needl-primary rounded-full">{lookbackRange} days</span>
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
                <Label className="text-base font-medium block mb-3">Connected Data Sources</Label>
                <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-100">
                  {connectedApps.length > 0 ? (
                    <ul className="space-y-2">
                      {connectedApps.map((app) => (
                        <li key={app} className="flex items-center bg-white p-2 rounded-md border border-gray-100">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm">{app.charAt(0).toUpperCase() + app.slice(1).replace('-', ' ')}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">No data sources connected</p>
                      <button 
                        type="button" 
                        className="text-needl-primary text-sm mt-2 underline hover:text-needl-dark"
                        onClick={() => navigate('/setup/step2')}
                      >
                        Go back to connect sources
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              className="gap-2 text-gray-600 hover:text-gray-900"
              disabled={isSubmitting}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            <Button
              type="submit"
              disabled={!feedName.trim() || isSubmitting}
              className="bg-gradient-to-r from-needl-primary to-needl-dark hover:from-needl-dark hover:to-needl-primary text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Creating Feed...
                </>
              ) : (
                <>
                  Create Intelligence Feed
                  <Check className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </SetupTransition>
    </SetupPageWrapper>
  );
};

export default Step3;
