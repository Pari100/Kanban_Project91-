import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderOpen,
  Calendar,
  MessageSquare,
  Settings,
  Star,
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { ProjectCard } from '../dashboard/ProjectCard';
import { mockProjects } from '../../utils/mockData';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', name: 'All Task', icon: CheckSquare },
  { id: 'projects', name: 'Projects', icon: FolderOpen },
  { id: 'calendar', name: 'Calendar', icon: Calendar },
  { id: 'messages', name: 'Messages', icon: MessageSquare },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="w-80 bg-gray-900 text-white p-6 overflow-y-auto">
      {/* User Profile */}
      <div className="flex items-center gap-3 mb-8">
        <Avatar
          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2"
          alt="User Avatar"
          size="lg"
        />
        <div>
          <h3 className="font-semibold">Emeritus Satriawan</h3>
          <p className="text-sm text-gray-400">Product Designer</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeView === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Favorite Projects */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <Star size={16} />
          <span>FAVOURITE</span>
        </div>
        <div className="space-y-3">
          {mockProjects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${project.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{project.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{project.name}</h4>
                  <p className="text-xs text-gray-400">{project.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <Avatar
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=2"
                    alt="Team member"
                    size="sm"
                  />
                  <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&dpr=2"
                    alt="Team member"
                    size="sm"
                  />
                </div>
                <span className="text-xs text-gray-400">{project.tasksCount} ongoing Task</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Widget */}
      <div className="mt-8 bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Mon, Aug 17</h4>
          <button className="text-gray-400 hover:text-white">
            <Calendar size={16} />
          </button>
        </div>
        <div className="text-sm text-gray-400">
          <p>August 2023</p>
        </div>
        {/* Simple calendar grid */}
        <div className="grid grid-cols-7 gap-1 mt-3 text-xs">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-gray-500 p-1">{day}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <button
              key={i}
              className={`text-center p-1 rounded hover:bg-gray-700 ${
                i + 1 === 17 ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};