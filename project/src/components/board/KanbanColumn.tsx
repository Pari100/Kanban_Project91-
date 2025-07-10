import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal, AlertCircle } from 'lucide-react';
import { Column } from '../../types';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  column: Column;
  onTaskClick: (taskId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, onTaskClick }) => {
  const isOverLimit = column.limit && column.tasks.length >= column.limit;

  return (
    <div className="w-80 flex flex-col">
      {/* Column Header */}
      <div className={`p-4 rounded-t-2xl border-2 ${column.color} bg-white/80 backdrop-blur-sm`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                isOverLimit ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
              }`}>
                {column.tasks.length}
                {column.limit && ` / ${column.limit}`}
              </span>
              {isOverLimit && (
                <AlertCircle className="w-4 h-4 text-red-500" title="Column limit exceeded" />
              )}
            </div>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        {column.limit && (
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isOverLimit ? 'bg-red-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min((column.tasks.length / column.limit) * 100, 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Tasks Container */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 rounded-b-2xl border-2 border-t-0 ${column.color} bg-white/40 backdrop-blur-sm transition-all duration-200 ${
              snapshot.isDraggingOver ? 'bg-blue-50/60 border-blue-300' : ''
            }`}
            style={{ minHeight: '500px' }}
          >
            <div className="space-y-3">
              {column.tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onClick={() => onTaskClick(task.id)}
                />
              ))}
              {provided.placeholder}
            </div>

            {/* Add Task Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600">
                Add Task
              </span>
            </motion.button>
          </div>
        )}
      </Droppable>
    </div>
  );
};