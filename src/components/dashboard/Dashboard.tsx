import React from 'react';
import { DollarSign, ShoppingCart, CreditCard, Users, TrendingUp, Eye } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ProjectCard } from './ProjectCard';
import { mockStats, mockProjects } from '../../utils/mockData';
import { Card } from '../ui/Card';

export const Dashboard: React.FC = () => {
  const statsData = [
    {
      title: 'Total Revenue',
      value: `$${mockStats.totalRevenue.toLocaleString()}`,
      subtitle: 'Compared last ago',
      icon: DollarSign,
      color: 'bg-emerald-500',
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Total Sales',
      value: mockStats.totalSales,
      subtitle: 'Updated few ago',
      icon: ShoppingCart,
      color: 'bg-amber-500',
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Total Expenses',
      value: `$${mockStats.totalExpenses}`,
      subtitle: 'Compared last ago',
      icon: CreditCard,
      color: 'bg-green-500',
      trend: { value: 3, isPositive: false },
    },
    {
      title: 'Total Visitors',
      value: mockStats.totalVisitors,
      subtitle: 'Compared few ago',
      icon: Users,
      color: 'bg-purple-500',
      trend: { value: 15, isPositive: true },
    },
  ];

  const observations = [
    { name: 'Foster Swift', rating: 5, reviews: '4 Reviews' },
    { name: 'Joe Smith', rating: 5, reviews: '4 Reviews' },
    { name: 'Michael', rating: 5, reviews: '4 Reviews' },
  ];

  const outcomes = [
    { name: 'CB', percentage: 52, color: 'bg-yellow-400' },
    { name: 'CB', percentage: 21, color: 'bg-green-400' },
    { name: 'ST', percentage: 74, color: 'bg-gray-800' },
    { name: 'CB', percentage: 74, color: 'bg-yellow-400' },
    { name: 'ST', percentage: 74, color: 'bg-gray-800' },
  ];

  const integrations = [
    { name: 'Google', color: 'bg-red-500' },
    { name: 'Featureform', color: 'bg-pink-500' },
    { name: 'Kickstarter', color: 'bg-green-500' },
    { name: 'Yolk', color: 'bg-yellow-500' },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back to your dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Observations */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Observations</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {observations.map((obs, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{obs.name}</p>
                    <p className="text-xs text-gray-500">{obs.reviews}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {Array.from({ length: obs.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Outcome Statistics</span>
            </div>
            <p className="text-xs text-yellow-700">Of interactive</p>
          </div>
        </Card>

        {/* Outcomes */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Outcomes</h3>
          <div className="space-y-4">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded ${outcome.color} flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{outcome.name}</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${outcome.color}`}
                        style={{ width: `${outcome.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{outcome.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Integrations */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Integrations</h3>
          <div className="space-y-3">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-8 h-8 rounded ${integration.color}`}></div>
                <span className="font-medium text-gray-900">{integration.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Projects and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Favorite Projects</h3>
          <div className="grid gap-4">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Chart Placeholder */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Stocks Growth</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp size={48} className="mx-auto mb-2" />
              <p>Chart visualization would go here</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};