import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Users,
  Clock,
  Target,
  Filter,
  Download
} from 'lucide-react';
import { Board } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface AnalyticsPageProps {
  boards: Board[];
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ boards }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Calculate analytics data
  const totalTasks = boards.reduce((sum, board) => 
    sum + board.columns.reduce((colSum, col) => colSum + col.tasks.length, 0), 0
  );
  
  const completedTasks = boards.reduce((sum, board) => 
    sum + (board.columns.find(col => col.id === 'done')?.tasks.length || 0), 0
  );
  
  const inProgressTasks = boards.reduce((sum, board) => 
    sum + (board.columns.find(col => col.id === 'in-progress')?.tasks.length || 0), 0
  );
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const averageTasksPerBoard = totalTasks > 0 ? Math.round(totalTasks / boards.length) : 0;

  // Task distribution by priority
  const priorityDistribution = boards.reduce((acc, board) => {
    board.columns.forEach(col => {
      col.tasks.forEach(task => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
      });
    });
    return acc;
  }, {} as Record<string, number>);

  // Task distribution by status
  const statusDistribution = boards.reduce((acc, board) => {
    board.columns.forEach(col => {
      acc[col.title] = col.tasks.length;
    });
    return acc;
  }, {} as Record<string, number>);

  const metrics = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      change: '+12%',
      positive: true,
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      change: '+5%',
      positive: true,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      change: '+8%',
      positive: true,
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      title: 'Avg Tasks/Board',
      value: averageTasksPerBoard,
      change: '-2%',
      positive: false,
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  const chartData = [
    { name: 'Mon', completed: 12, created: 15 },
    { name: 'Tue', completed: 19, created: 22 },
    { name: 'Wed', completed: 8, created: 18 },
    { name: 'Thu', completed: 15, created: 20 },
    { name: 'Fri', completed: 25, created: 28 },
    { name: 'Sat', completed: 10, created: 12 },
    { name: 'Sun', completed: 5, created: 8 }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Analytics
            </h1>
            <p className="text-gray-600">
              Track your productivity and team performance
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
              {(['week', 'month', 'quarter'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    timeRange === range 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <Button variant="ghost" icon={Filter}>
              Filter
            </Button>
            <Button variant="ghost" icon={Download}>
              Export
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 lg:p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 lg:p-3 rounded-lg ${metric.color}`}>
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      metric.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.positive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Completion Chart */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Task Completion Trend</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.map((day, index) => (
                <div key={day.name} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col gap-1">
                    <div 
                      className="bg-blue-600 rounded-t"
                      style={{ height: `${(day.completed / 30) * 200}px` }}
                    />
                    <div 
                      className="bg-blue-200 rounded-b"
                      style={{ height: `${((day.created - day.completed) / 30) * 200}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{day.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 rounded"></div>
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
            </div>
          </Card>

          {/* Priority Distribution */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {Object.entries(priorityDistribution).map(([priority, count]) => {
                const percentage = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
                const colors = {
                  urgent: 'bg-red-500',
                  high: 'bg-orange-500',
                  medium: 'bg-yellow-500',
                  low: 'bg-green-500'
                };
                
                return (
                  <div key={priority} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${colors[priority as keyof typeof colors]}`} />
                        <span className="text-sm font-medium text-gray-900 capitalize">{priority}</span>
                      </div>
                      <span className="text-sm text-gray-600">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[priority as keyof typeof colors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Board Performance */}
          <Card className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Board Performance</h3>
            <div className="space-y-4">
              {boards.map((board) => {
                const boardTasks = board.columns.reduce((sum, col) => sum + col.tasks.length, 0);
                const boardCompleted = board.columns.find(col => col.id === 'done')?.tasks.length || 0;
                const boardCompletion = boardTasks > 0 ? Math.round((boardCompleted / boardTasks) * 100) : 0;
                
                return (
                  <div key={board.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {board.title}
                      </span>
                      <span className="text-sm text-gray-600">{boardCompletion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${boardCompletion}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Team Activity */}
          <Card className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Activity</h3>
            <div className="space-y-4">
              {boards[0]?.members.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 10) + 1} tasks completed
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' :
                    member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
              ))}
            </div>
          </Card>

          {/* Time Insights */}
          <Card className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg. Task Duration</span>
                <span className="text-sm font-semibold text-gray-900">2.5 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fastest Completion</span>
                <span className="text-sm font-semibold text-green-600">4 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Longest Task</span>
                <span className="text-sm font-semibold text-red-600">12 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time Saved</span>
                <span className="text-sm font-semibold text-blue-600">18 hours</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};