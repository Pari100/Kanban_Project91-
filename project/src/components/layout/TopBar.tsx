import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Plus, 
  Filter,
  Command,
  Sparkles,
  Menu
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { mockUsers, mockNotifications } from '../../utils/mockData';

interface TopBarProps {
  onNotificationsToggle: () => void;
  notificationsOpen: boolean;
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
  isMobile: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  onNotificationsToggle, 
  notificationsOpen,
  onSidebarToggle,
  sidebarCollapsed,
  isMobile
}) => {
  const currentUser = mockUsers[0];
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="bg-white/70 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={onSidebarToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          <div className="hidden sm:block">
            <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Good morning, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">
              You have 3 tasks due today and 2 in review
            </p>
          </div>
        </div>

        {/* Center Section - Search (Hidden on small mobile) */}
        <div className="flex-1 max-w-md lg:max-w-2xl mx-4 lg:mx-8 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, boards..."
              className="w-full pl-10 lg:pl-12 pr-12 lg:pr-16 py-2 lg:py-3 bg-white/80 border border-white/30 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all placeholder-gray-400 text-sm lg:text-base"
            />
            <div className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border text-gray-500">
                <Command className="w-3 h-3 inline mr-1" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Mobile Search Button */}
          <button className="p-2 lg:p-3 bg-white/80 hover:bg-white border border-white/30 rounded-lg lg:rounded-xl transition-colors sm:hidden">
            <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
          </button>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 lg:p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="font-medium text-sm lg:text-base hidden lg:inline">New Task</span>
            </motion.button>

            <button className="p-2 lg:p-3 bg-white/80 hover:bg-white border border-white/30 rounded-lg lg:rounded-xl transition-colors">
              <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            </button>
          </div>

          {/* AI Assistant */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 lg:p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-200"
            title="AI Assistant"
          >
            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
          </motion.button>

          {/* Notifications */}
          <button
            onClick={onNotificationsToggle}
            className={`relative p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all duration-200 ${
              notificationsOpen 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-white/80 hover:bg-white border border-white/30 text-gray-600'
            }`}
          >
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
              >
                {unreadCount}
              </motion.span>
            )}
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <Avatar 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              size="md"
              className="ring-2 ring-white/50 hover:ring-blue-500/30 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};