import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, Clock, MessageSquare, Paperclip } from 'lucide-react';
import { Board } from '../../types';

interface TaskModalProps {
  taskId: string;
  board: Board;
  onClose: () => void;
  onUpdate: (board: Board) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ taskId, board, onClose, onUpdate }) => {
  const task = board.columns
    .flatMap(col => col.tasks)
    .find(t => t.id === taskId);

  if (!task) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex h-[600px]">
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Description */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {task.description || 'No description provided.'}
                </p>
              </div>

              {/* Checklist */}
              {task.checklist.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Checklist</h3>
                  <div className="space-y-2">
                    {task.checklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          readOnly
                        />
                        <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Comments</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 bg-gray-50 p-6 border-l border-gray-100">
              <div className="space-y-6">
                {/* Assignees */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">Assignees</span>
                  </div>
                  <div className="space-y-2">
                    {task.assignees.map((assignee) => (
                      <div key={assignee.id} className="flex items-center gap-3">
                        <img
                          src={assignee.avatar}
                          alt={assignee.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{assignee.name}</p>
                          <p className="text-xs text-gray-500">{assignee.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Labels */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">Labels</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {task.labels.map((label) => (
                      <span
                        key={label.id}
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${label.color}`}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Due Date */}
                {task.dueDate && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">Due Date</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {task.dueDate.toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Time Tracking */}
                {(task.estimatedHours || task.actualHours) && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">Time Tracking</span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {task.estimatedHours && (
                        <p>Estimated: {task.estimatedHours}h</p>
                      )}
                      {task.actualHours && (
                        <p>Logged: {task.actualHours}h</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span className="text-lg font-semibold text-gray-900">
                          {task.comments.length}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Comments</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        <span className="text-lg font-semibold text-gray-900">
                          {task.attachments.length}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Attachments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};