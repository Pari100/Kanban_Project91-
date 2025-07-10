import React from 'react';
import { MoreHorizontal, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const completionPercentage = Math.round((project.completedTasks / project.tasksCount) * 100);

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${project.color} flex items-center justify-center`}>
          <span className="text-white font-bold text-lg">{project.name[0]}</span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={14} />
          <span>{project.members} ongoing Task</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{project.completedTasks} completed</span>
            <span>{project.tasksCount} total tasks</span>
          </div>
        </div>
      </div>
    </Card>
  );
};