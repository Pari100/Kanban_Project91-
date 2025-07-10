import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  BarChart3,
  Target
} from 'lucide-react';
import { Board } from '../types';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { mockUsers } from '../utils/mockData';

interface DashboardProps {
  boards: Board[];
}

export const Dashboard: React.FC<DashboardProps> = ({ boards }) => {
  // Calculate dashboard metrics
  const totalTasks = boards.reduce((sum, board) => 
    sum + board.columns.reduce((colSum, col) => colSum + col.tasks.length, 0), 0
  );
  
  const completedTasks = boards.reduce((sum, board) => 
    sum + (board.columns.find(col => col.id === 'done')?.tasks.length || 0), 0
  );
  
  const inProgressTasks = boards.reduce((sum, board) => 
    sum + (board.columns.find(col => col.id === 'in-progress')?.tasks.length || 0), 0
  );
  
  const overdueTasks = boards.reduce((sum, board) => 
    sum + board.columns.reduce((colSum, col) => 
      colSum + col.tasks.filter(task => 
        task.dueDate && new Date(task.dueDate) < new Date()
      ).length, 0
    ), 0
  );

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: Target,
      color: 'bg-blue-500',
      change: '+12%',
      positive: true
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%',
      positive: true
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'bg-orange-500',
      change: '+5%',
      positive: true
    },
    {
      title: 'Overdue',
      value: overdueTasks,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-3%',
      positive: false
    }
  ];

  const recentActivity = [
    {
      id: '1',
      user: mockUsers[0],
      action: 'completed task',
      target: 'User authentication system',
      time: '2 minutes ago',
      type: 'completed'
    },
    {
      id: '2',
      user: mockUsers[1],
      action: 'created new task',
      target: 'Mobile app optimization',
      time: '15 minutes ago',
      type: 'created'
    },
    {
      id: '3',
      user: mockUsers[2],
      action: 'moved task to review',
      target: 'Design system update',
      time: '1 hour ago',
      type: 'moved'
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Track your productivity and team performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 lg:p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 lg:p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Avatar 
                      src={activity.user.avatar} 
                      alt={activity.user.name} 
                      size="md" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user.name}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">"{activity.target}"</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'completed' ? 'bg-green-500' :
                      activity.type === 'created' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Team Members */}
            <Card className="p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              <div className="space-y-3">
                {mockUsers.slice(0, 4).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Schedule Meeting</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">View Analytics</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Invite Team</span>
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Boards Overview */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Active Boards</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View All Boards
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.slice(0, 3).map((board, index) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{board.title}</h4>
                    <p className="text-xs text-gray-500">{board.members.length} members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {board.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {board.members.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        size="sm"
                        className="border-2 border-white"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    {board.columns.reduce((sum, col) => sum + col.tasks.length, 0)} tasks
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};