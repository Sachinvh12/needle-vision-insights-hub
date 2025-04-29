
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';
import { BarChart, LineChart, Pie, PieChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Line, Cell, ResponsiveContainer, Legend } from 'recharts';

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
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-2">
          <CardTitle className="text-base flex items-center">
            <span className="bg-blue-500 text-white p-1 rounded-md mr-2">
              <BarChart2 className="h-3 w-3" />
            </span>
            Source Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="h-[200px]">
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
                  labelLine={false}
                  animationBegin={300}
                  animationDuration={1500}
                >
                  {sourceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 pb-2">
          <CardTitle className="text-base flex items-center">
            <span className="bg-green-500 text-white p-1 rounded-md mr-2">
              <BarChart2 className="h-3 w-3" />
            </span>
            Alert Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertTrendData}>
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Line
                  type="monotone"
                  dataKey="alerts"
                  stroke="#367d8d"
                  strokeWidth={2}
                  dot={{ stroke: '#367d8d', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#367d8d', strokeWidth: 2 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 pb-2">
          <CardTitle className="text-base flex items-center">
            <span className="bg-amber-500 text-white p-1 rounded-md mr-2">
              <BarChart2 className="h-3 w-3" />
            </span>
            Importance Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={importanceDistributionData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <RechartsTooltip />
                <Bar
                  dataKey="value"
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                >
                  {importanceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={IMPORTANCE_COLORS[index % IMPORTANCE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
