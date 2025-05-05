
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
import { Button } from '@/components/ui/button';
import { useApp } from '../../context/AppContext';
import SetupPageWrapper from '../../components/setup/SetupPageWrapper';
import SetupStepIndicator from '../../components/setup/SetupStepIndicator';
import SetupTransition from '../../components/setup/SetupTransition';
import EnhancedCard from '../../components/setup/EnhancedCard';
import SetupNavButtons from '../../components/setup/SetupNavButtons';

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
  
  // Modified to accept no parameters for the SetupNavButtons compatibility
  const handleSubmit = () => {
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
  
  // Prevent form default behavior separately
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
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
        <form onSubmit={onFormSubmit} className="pb-2">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100/80 p-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4">
              {/* Feed Name Field */}
              <div className="space-y-1.5">
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
              <div className="space-y-2">
                <Label className="text-base font-medium">Output Format</Label>
                
                <RadioGroup 
                  value={outputFormat} 
                  onValueChange={(value) => updateSetupState({ outputFormat: value })}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2"
                >
                  {outputFormatOptions.map((option) => (
                    <div key={option.value}>
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                      <EnhancedCard
                        isSelected={outputFormat === option.value}
                        onClick={() => updateSetupState({ outputFormat: option.value })}
                        className="p-0 overflow-hidden"
                      >
                        <div className="p-3 flex items-center">
                          <div className="mr-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
                              className="font-medium cursor-pointer block text-sm"
                            >
                              {option.label}
                            </Label>
                            <span className="text-xs text-gray-500">{option.description}</span>
                          </div>
                        </div>
                      </EnhancedCard>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Alert Settings */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center mb-3">
                  <Bell className="w-4 h-4 text-needl-primary mr-2" />
                  <h3 className="font-medium text-base">Notification Settings</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="alerts" className="font-medium text-sm">Enable Alerts</Label>
                      <p className="text-xs text-gray-500">Get notified about important events</p>
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
                      <Label htmlFor="summaries" className="font-medium text-sm">Enable Summaries</Label>
                      <p className="text-xs text-gray-500">Receive periodic intelligence summaries</p>
                    </div>
                    <Switch 
                      id="summaries"
                      checked={enableSummaries}
                      onCheckedChange={setEnableSummaries}
                      className="data-[state=checked]:bg-needl-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-needl-primary mr-2" />
                      <Label htmlFor="frequency" className="font-medium text-sm">Update Frequency</Label>
                    </div>
                    
                    <RadioGroup
                      value={frequency}
                      onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setFrequency(value)}
                      className="flex justify-between space-x-2"
                    >
                      <div className="flex-1">
                        <RadioGroupItem value="daily" id="daily-option" className="sr-only" />
                        <div 
                          className={`border ${frequency === 'daily' ? 'border-needl-primary bg-needl-lighter/30' : 'border-gray-200'} rounded-lg p-2 text-center cursor-pointer transition-all hover:bg-gray-50`}
                          onClick={() => setFrequency('daily')}
                        >
                          <Label htmlFor="daily-option" className="cursor-pointer">
                            <Calendar className="w-4 h-4 mx-auto mb-1" />
                            <span className="text-xs font-medium block">Daily</span>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <RadioGroupItem value="weekly" id="weekly-option" className="sr-only" />
                        <div 
                          className={`border ${frequency === 'weekly' ? 'border-needl-primary bg-needl-lighter/30' : 'border-gray-200'} rounded-lg p-2 text-center cursor-pointer transition-all hover:bg-gray-50`}
                          onClick={() => setFrequency('weekly')}
                        >
                          <Label htmlFor="weekly-option" className="cursor-pointer">
                            <Calendar className="w-4 h-4 mx-auto mb-1" />
                            <span className="text-xs font-medium block">Weekly</span>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <RadioGroupItem value="monthly" id="monthly-option" className="sr-only" />
                        <div 
                          className={`border ${frequency === 'monthly' ? 'border-needl-primary bg-needl-lighter/30' : 'border-gray-200'} rounded-lg p-2 text-center cursor-pointer transition-all hover:bg-gray-50`}
                          onClick={() => setFrequency('monthly')}
                        >
                          <Label htmlFor="monthly-option" className="cursor-pointer">
                            <Calendar className="w-4 h-4 mx-auto mb-1" />
                            <span className="text-xs font-medium block">Monthly</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lookback" className="font-medium text-sm">Lookback Range</Label>
                      <span className="text-xs font-medium px-2 py-0.5 bg-needl-lighter text-needl-primary rounded-full">{lookbackRange} days</span>
                    </div>
                    <Slider
                      id="lookback"
                      value={[lookbackRange]}
                      min={7}
                      max={90}
                      step={1}
                      onValueChange={(values) => setLookbackRange(values[0])}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>7d</span>
                      <span>30d</span>
                      <span>90d</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connected Data Sources */}
              <div>
                <Label className="text-sm font-medium block mb-2">Connected Data Sources</Label>
                <div className="bg-gray-50/80 p-2 rounded-lg border border-gray-100 max-h-[100px] overflow-y-auto">
                  {connectedApps.length > 0 ? (
                    <ul className="space-y-1.5">
                      {connectedApps.map((app) => (
                        <li key={app} className="flex items-center bg-white p-1.5 rounded-md border border-gray-100">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-xs">{app.charAt(0).toUpperCase() + app.slice(1).replace('-', ' ')}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-3">
                      <p className="text-xs text-gray-500">No data sources connected</p>
                      <button 
                        type="button" 
                        className="text-needl-primary text-xs mt-1 underline hover:text-needl-dark"
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
          
          <SetupNavButtons 
            onBack={handleBack}
            onNext={handleSubmit}
            isLastStep={true}
            isNextDisabled={!feedName.trim()}
            isSubmitting={isSubmitting}
          />
        </form>
      </SetupTransition>
    </SetupPageWrapper>
  );
};

export default Step3;
