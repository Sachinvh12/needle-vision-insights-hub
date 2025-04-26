
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import AlertsList from '../components/alerts/AlertsList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Filter, BellRing, Check, AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const AlertsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { state, markAllAlertsRead } = useApp();
  const { alerts } = state;
  
  const [filter, setFilter] = useState('all');
  const [importance, setImportance] = useState('all');

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const highImportanceCount = alerts.filter(alert => alert.importance === 'high').length;
  
  let filteredAlerts = [...alerts];
  
  if (filter === 'unread') {
    filteredAlerts = filteredAlerts.filter(alert => !alert.read);
  } else if (filter === 'read') {
    filteredAlerts = filteredAlerts.filter(alert => alert.read);
  }
  
  if (importance !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.importance === importance);
  }

  const handleMarkAllRead = () => {
    markAllAlertsRead();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAlertIcon />
      
      <main className="flex-1 container py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="mr-4"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold flex items-center">
              <BellRing className="h-6 w-6 mr-2 text-needl-primary" />
              Intelligence Alerts
            </h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center"
          >
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-sm">
              <Badge className="h-6 w-6 flex items-center justify-center rounded-full text-white bg-blue-500">
                {alerts.length}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-blue-700">Total Alerts</p>
              <p className="text-xl font-semibold text-blue-900">{alerts.length}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-center"
          >
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-sm">
              <Info className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-amber-700">Unread Alerts</p>
              <p className="text-xl font-semibold text-amber-900">{unreadCount}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-red-50 p-4 rounded-lg border border-red-100 flex items-center"
          >
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-sm">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-red-700">High Importance</p>
              <p className="text-xl font-semibold text-red-900">{highImportanceCount}</p>
            </div>
          </motion.div>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-lg font-semibold">All Alerts</h2>
            
            <div className="flex gap-2">
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
            <AlertsList showAll={true} />
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
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AlertsDashboard;
