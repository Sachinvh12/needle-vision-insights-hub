
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';
import { BarChart, LineChart, Pie, PieChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Line, Cell, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const AnalyticsCharts: React.FC = () => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-blue-100/30 border-b border-blue-100/50">
            <CardTitle className="text-base flex items-center">
              <span className="bg-blue-500 text-white p-1 rounded-md mr-2">
                <BarChart2 className="h-3 w-3" />
              </span>
              Source Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 px-2">
            <div className="h-[220px]">
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
                    labelLine={{ stroke: '#333', strokeWidth: 0.5, strokeDasharray: '2 2' }}
                    animationBegin={300}
                    animationDuration={1500}
                  >
                    {sourceDistributionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="#fff" 
                        strokeWidth={1} 
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value, name) => [`${value}%`, name]} 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50">
          <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-green-100/30 border-b border-green-100/50">
            <CardTitle className="text-base flex items-center">
              <span className="bg-green-500 text-white p-1 rounded-md mr-2">
                <BarChart2 className="h-3 w-3" />
              </span>
              Alert Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 px-2">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={alertTrendData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={{ stroke: '#eee' }} 
                    tickLine={false} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#888' }} 
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="alerts"
                    stroke="#367d8d"
                    strokeWidth={2}
                    dot={{ stroke: '#367d8d', strokeWidth: 2, r: 4, fill: 'white' }}
                    activeDot={{ r: 6, stroke: '#367d8d', strokeWidth: 2, fill: '#367d8d' }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50">
          <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-amber-100/30 border-b border-amber-100/50">
            <CardTitle className="text-base flex items-center">
              <span className="bg-amber-500 text-white p-1 rounded-md mr-2">
                <BarChart2 className="h-3 w-3" />
              </span>
              Importance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 px-2">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={importanceDistributionData} layout="vertical">
                  <XAxis 
                    type="number" 
                    axisLine={{ stroke: '#eee' }} 
                    tickLine={false} 
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#888' }} 
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[0, 4, 4, 0]}
                    animationDuration={1500}
                  >
                    {importanceDistributionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={IMPORTANCE_COLORS[index % IMPORTANCE_COLORS.length]} 
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsCharts;
