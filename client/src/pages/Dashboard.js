import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Globe,
} from 'lucide-react';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data for demonstrations
  const kpis = [
    {
      label: 'Total Applications',
      value: '12,347',
      change: '+23.5%',
      trend: 'up',
      icon: Users,
      color: 'text-teal-green',
      bgColor: 'bg-teal-green/10',
    },
    {
      label: 'Approval Rate',
      value: '68.2%',
      change: '+12.3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-light-yellow',
      bgColor: 'bg-light-yellow/10',
    },
    {
      label: 'Average Score',
      value: '687',
      change: '+4.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-bright-pink',
      bgColor: 'bg-bright-pink/10',
    },
    {
      label: 'Default Rate',
      value: '2.1%',
      change: '-0.8%',
      trend: 'down',
      icon: Shield,
      color: 'text-bright-red',
      bgColor: 'bg-bright-red/10',
    },
  ];

  const monthlyApplications = [
    { month: 'Jan', applications: 800, approvals: 520, defaults: 12 },
    { month: 'Feb', applications: 950, approvals: 665, defaults: 15 },
    { month: 'Mar', applications: 1200, approvals: 840, defaults: 18 },
    { month: 'Apr', applications: 1100, approvals: 770, defaults: 14 },
    { month: 'May', applications: 1350, approvals: 945, defaults: 16 },
    { month: 'Jun', applications: 1500, approvals: 1050, defaults: 19 },
  ];

  const scoreDistribution = [
    { range: '300-499', count: 1240, color: '#E53935' },
    { range: '500-599', count: 2100, color: '#FFB400' },
    { range: '600-699', count: 3200, color: '#FFD83D' },
    { range: '700-749', count: 2800, color: '#1BA39C' },
    { range: '750-850', count: 1960, color: '#FF6EC7' },
  ];

  const dataSourcePerformance = [
    { source: 'Mobile Data', accuracy: 82, usage: 95 },
    { source: 'Utility Payments', accuracy: 78, usage: 88 },
    { source: 'E-commerce', accuracy: 75, usage: 72 },
    { source: 'Social Media', accuracy: 71, usage: 65 },
    { source: 'Geolocation', accuracy: 85, usage: 90 },
  ];

  const riskCategories = [
    { name: 'Excellent', value: 1960, color: '#FF6EC7' },
    { name: 'Good', value: 2800, color: '#1BA39C' },
    { name: 'Fair', value: 3200, color: '#FFD83D' },
    { name: 'Poor', value: 2100, color: '#FFB400' },
    { name: 'Very Poor', value: 1240, color: '#E53935' },
  ];

  const realtimeMetrics = [
    { time: '00:00', score: 682 },
    { time: '04:00', score: 685 },
    { time: '08:00', score: 691 },
    { time: '12:00', score: 687 },
    { time: '16:00', score: 689 },
    { time: '20:00', score: 694 },
    { time: '24:00', score: 692 },
  ];

  return (
    <div className="min-h-screen bg-gray-25 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* KPI Highlights - Interactive card (like landing page CTA) */}
        <div className="mb-8">
          <div className="group relative bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-bright-pink/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-sea-green/10 blur-3xl"></div>
            </div>
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
              {[{icon:'🌍',value:'47',label:'Countries Served'},{icon:'📊',value:'2.3M',label:'Data Points Analyzed'},{icon:'⏱️',value:'25ms',label:'Processing Time'},{icon:'✅',value:'91.2%',label:'Accuracy Rate'}].map((s, i)=> (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">{s.icon}</span>
                  </div>
                  <div className="heading-sm text-gray-900 mb-1">{s.value}</div>
                  <div className="ui-text text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-lg text-gray-900 mb-2"
          >
            Credit Scoring Dashboard
          </motion.h1>
          <p className="body-text text-gray-600">
            Real-time insights into alternative credit scoring performance
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {kpi.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {kpi.value}
              </div>
              <div className="text-sm text-gray-600">
                {kpi.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                Monthly Applications
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="applications" fill="#FF6EC7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approvals" fill="#1BA39C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Score Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2 text-primary-600" />
                Score Distribution
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Data Sources Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary-600" />
              Alternative Data Source Performance
            </h3>
          </div>
          <div className="space-y-4">
            {dataSourcePerformance.map((source, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{source.source}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-green-600">Accuracy: {source.accuracy}%</span>
                    <span className="text-blue-600">Usage: {source.usage}%</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gumroad-500 h-2 rounded-full"
                        style={{ width: `${source.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gumroad-600 h-2 rounded-full"
                        style={{ width: `${source.usage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary-600" />
                Risk Categories
              </h3>
            </div>
            <div className="space-y-3">
              {riskCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-gray-700">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 font-medium">
                      {category.value.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({((category.value / riskCategories.reduce((sum, c) => sum + c.value, 0)) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Real-time Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary-600" />
                Real-time Average Score
              </h3>
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={realtimeMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#FF6EC7"
                  fill="#FF6EC7"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Footer Stats removed to avoid duplicate hero stats */}
      </div>
    </div>
  );
};

export default Dashboard;
