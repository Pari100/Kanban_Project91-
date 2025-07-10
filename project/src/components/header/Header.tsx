import React from 'react';
import { Search, Plus, Bell, Triangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

interface HeaderProps {
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ currentView }) => {
  const getTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Hello Web UI';
      case 'board':
        return 'Hello Web UI';
      default:
        return 'Hello Web UI';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Triangle size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">Handle</span>
          </div>
          <div className="hidden md:block">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{getTitle()}</h1>
              <p className="text-sm text-gray-500">Welcome back</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          {/* Add Project Button */}
          <Button icon={Plus} variant="primary">
            Add Project
          </Button>
          
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* User Avatar */}
          <Avatar
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2"
            alt="User Avatar"
            size="md"
          />
        </div>
      </div>
    </header>
  );
};