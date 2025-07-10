import React from 'react';
import { MessageSquare, Paperclip, Calendar, MoreHorizontal } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`transform transition-all duration-200 ${
            snapshot.isDragging ? 'rotate-2 scale-105' : ''
          }`}
        >
          <Card className="p-4 mb-3 cursor-pointer hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-900 text-sm leading-relaxed">{task.title}</h4>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all">
                <MoreHorizontal size={14} className="text-gray-400" />
              </button>
            </div>
            
            {task.description && (
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
            )}
            
            {/* Labels */}
            <div className="flex flex-wrap gap-1 mb-3">
              {task.labels.map((label) => (
                <span
                  key={label.id}
                  className={`px-2 py-1 text-xs font-medium rounded-full ${label.color}`}
                >
                  {label.name}
                </span>
              ))}
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}
              >
                {task.priority}
              </span>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {task.comments > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    <span>{task.comments}</span>
                  </div>
                )}
                {task.attachments > 0 && (
                  <div className="flex items-center gap-1">
                    <Paperclip size={12} />
                    <span>{task.attachments}</span>
                  </div>
                )}
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>Tomorrow</span>
                  </div>
                )}
              </div>
              
              {task.assignee && (
                <Avatar
                  src={task.assignee.avatar}
                  alt={task.assignee.name}
                  size="sm"
                />
              )}
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};