import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Droppable } from '@hello-pangea/dnd';
import { Column } from '../../types';
import { TaskCard } from './TaskCard';
import { Button } from '../ui/Button';

interface KanbanColumnProps {
  column: Column;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 min-w-80 max-w-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
            {column.tasks.length}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-32 transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            <div className="space-y-3 group">
              {column.tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      
      <Button
        variant="ghost"
        className="w-full mt-3 text-gray-600 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-100"
        icon={Plus}
      >
        New Task
      </Button>
    </div>
  );
};