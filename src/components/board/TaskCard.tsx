import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  Paperclip, 
  CheckSquare,
  Clock,
  AlertTriangle,
  User
} from 'lucide-react';
import { Task } from '../../types';
import { Avatar } from '../ui/Avatar';
import { format, isToday, isTomorrow, isPast } from 'date-fns';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onClick }) => {
  const priorityColors = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  };

  const completedChecklist = task.checklist.filter(item => item.completed).length;
  const totalChecklist = task.checklist.length;

  const getDueDateColor = () => {
    if (!task.dueDate) return 'text-gray-500';
    if (isPast(task.dueDate) && !isToday(task.dueDate)) return 'text-red-600';
    if (isToday(task.dueDate)) return 'text-orange-600';
    if (isTomorrow(task.dueDate)) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const getDueDateText = () => {
    if (!task.dueDate) return null;
    if (isToday(task.dueDate)) return 'Due today';
    if (isTomorrow(task.dueDate)) return 'Due tomorrow';
    if (isPast(task.dueDate)) return 'Overdue';
    return format(task.dueDate, 'MMM d');
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          onClick={onClick}
          className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
            snapshot.isDragging ? 'rotate-3 shadow-lg scale-105' : ''
          }`}
        >
          {/* Task Header */}
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-gray-900 text-sm leading-relaxed flex-1 pr-2">
              {task.title}
            </h4>
            {task.priority !== 'low' && (
              <div className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`}>
                {task.priority}
              </div>
            )}
          </div>

          {/* Task Description */}
          {task.description && (
            <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Labels */}
          {task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {task.labels.slice(0, 3).map((label) => (
                <span
                  key={label.id}
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${label.color}`}
                >
                  {label.name}
                </span>
              ))}
              {task.labels.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                  +{task.labels.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Progress Bar for Checklist */}
          {totalChecklist > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <CheckSquare className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">
                    {completedChecklist}/{totalChecklist}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {Math.round((completedChecklist / totalChecklist) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(completedChecklist / totalChecklist) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Time Tracking */}
          {(task.estimatedHours || task.actualHours) && (
            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {task.actualHours && (
                <span>{task.actualHours}h logged</span>
              )}
              {task.estimatedHours && (
                <span>/ {task.estimatedHours}h estimated</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Due Date */}
              {task.dueDate && (
                <div className={`flex items-center gap-1 text-xs ${getDueDateColor()}`}>
                  <Calendar className="w-3 h-3" />
                  <span>{getDueDateText()}</span>
                  {isPast(task.dueDate) && !isToday(task.dueDate) && (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                </div>
              )}

              {/* Comments */}
              {task.comments.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MessageSquare className="w-3 h-3" />
                  <span>{task.comments.length}</span>
                </div>
              )}

              {/* Attachments */}
              {task.attachments.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Paperclip className="w-3 h-3" />
                  <span>{task.attachments.length}</span>
                </div>
              )}
            </div>

            {/* Assignees */}
            <div className="flex items-center">
              {task.assignees.length > 0 ? (
                <div className="flex -space-x-1">
                  {task.assignees.slice(0, 2).map((assignee) => (
                    <Avatar
                      key={assignee.id}
                      src={assignee.avatar}
                      alt={assignee.name}
                      size="sm"
                      className="border-2 border-white"
                    />
                  ))}
                  {task.assignees.length > 2 && (
                    <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        +{task.assignees.length - 2}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};