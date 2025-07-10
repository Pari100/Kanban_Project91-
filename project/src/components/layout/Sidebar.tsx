import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Kanban, 
  Users, 
  Settings, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Zap,
  Calendar,
  BarChart3,
  Folder
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { mockUsers, mockWorkspace } from '../../utils/mockData';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-600', path: '/dashboard' },
  { id: 'boards', name: 'Boards', icon: Kanban, color: 'text-purple-600', path: '/boards' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'text-green-600', path: '/calendar' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'text-orange-600', path: '/analytics' },
  { id: 'team', name: 'Team', icon: Users, color: 'text-pink-600', path: '/team' },
  { id: 'projects', name: 'Projects', icon: Folder, color: 'text-indigo-600', path: '/projects' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const currentUser = mockUsers[0];
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-base lg:text-lg text-gray-900">FlowBoard</h1>
                <p className="text-xs text-gray-500">Pro Workspace</p>
              </div>
            </motion.div>
          )}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 lg:p-6 border-b border-white/10"
        >
          <div className="flex items-center gap-3">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="lg" />
            <div className="flex-1 min-w-0 hidden sm:block">
              <h3 className="font-semibold text-gray-900 truncate text-sm lg:text-base">{currentUser.name}</h3>
              <p className="text-xs lg:text-sm text-gray-500 truncate">{currentUser.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500 capitalize">{currentUser.status}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-2 lg:px-3 py-2 lg:py-3 rounded-xl transition-all duration-200 group ${
                active 
                  ? 'bg-white shadow-md border border-gray-100' 
                  : 'hover:bg-white/60'
              }`}
            >
              <div className={`p-1.5 lg:p-2 rounded-lg ${
                active 
                  ? `${item.color} bg-opacity-10` 
                  : 'bg-white/50 text-gray-600 group-hover:scale-110'
              } transition-transform`}>
                <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              {!collapsed && (
                <span className={`font-medium text-sm lg:text-base ${
                  active ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {item.name}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Workspace Info - Hidden on mobile when collapsed */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 lg:p-6 border-t border-white/10 hidden sm:block"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 lg:p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 text-sm lg:text-base">Workspace</h4>
              <button className="p-1 hover:bg-white/50 rounded-lg transition-colors">
                <Plus className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
              </button>
            </div>
            <p className="text-xs lg:text-sm text-gray-600 mb-3">{mockWorkspace.name}</p>
            <div className="flex -space-x-1 lg:-space-x-2">
              {mockWorkspace.members.slice(0, 4).map((member) => (
                <Avatar
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  size="sm"
                  className="border-2 border-white"
                />
              ))}
              {mockWorkspace.members.length > 4 && (
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    +{mockWorkspace.members.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Settings */}
      <div className="p-2 lg:p-4 border-t border-white/10">
        <button 
          onClick={() => navigate('/settings')}
          className={`w-full flex items-center gap-3 px-2 lg:px-3 py-2 lg:py-3 rounded-xl transition-colors group ${
            isActive('/settings') 
              ? 'bg-white shadow-md border border-gray-100' 
              : 'hover:bg-white/60'
          }`}
        >
          <div className={`p-1.5 lg:p-2 rounded-lg transition-transform ${
            isActive('/settings')
              ? 'text-gray-600 bg-gray-100'
              : 'bg-white/50 text-gray-600 group-hover:scale-110'
          }`}>
            <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
          </div>
          {!collapsed && (
            <span className={`font-medium text-sm lg:text-base ${
              isActive('/settings') ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
            }`}>
              Settings
            </span>
          )}
        </button>
      </div>
    </div>
  );
};