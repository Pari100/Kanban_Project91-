import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreHorizontal, Users, Clock, TrendingUp } from 'lucide-react';
import { Board } from '../../types';
import { KanbanColumn } from './KanbanColumn';
import { BoardHeader } from './BoardHeader';
import { TaskModal } from './TaskModal';

interface KanbanBoardProps {
  board: Board;
  onBoardUpdate: (board: Board) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ board, onBoardUpdate }) => {
  const [currentBoard, setCurrentBoard] = useState(board);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = currentBoard.columns.find(col => col.id === source.droppableId);
    const destColumn = currentBoard.columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Remove task from source column
    const draggedTask = sourceColumn.tasks[source.index];
    const newSourceTasks = Array.from(sourceColumn.tasks);
    newSourceTasks.splice(source.index, 1);

    // Add task to destination column
    const newDestTasks = Array.from(destColumn.tasks);
    newDestTasks.splice(destination.index, 0, {
      ...draggedTask,
      status: destColumn.id as any,
      updatedAt: new Date(),
    });

    // Update board state
    const newColumns = currentBoard.columns.map(column => {
      if (column.id === source.droppableId) {
        return { ...column, tasks: newSourceTasks };
      }
      if (column.id === destination.droppableId) {
        return { ...column, tasks: newDestTasks };
      }
      return column;
    });

    const updatedBoard = { ...currentBoard, columns: newColumns, updatedAt: new Date() };
    setCurrentBoard(updatedBoard);
    onBoardUpdate(updatedBoard);
  };

  const totalTasks = currentBoard.columns.reduce((sum, col) => sum + col.tasks.length, 0);
  const completedTasks = currentBoard.columns.find(col => col.id === 'done')?.tasks.length || 0;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="h-full flex flex-col">
      {/* Board Header */}
      <BoardHeader board={currentBoard} />

      {/* Board Stats */}
      <div className="px-6 py-4 bg-white/50 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{progressPercentage}% Complete</p>
              <p className="text-xs text-gray-500">{completedTasks} of {totalTasks} tasks</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{currentBoard.members.length} Members</p>
              <p className="text-xs text-gray-500">Active collaboration</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">2 Due Today</p>
              <p className="text-xs text-gray-500">Needs attention</p>
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="flex -space-x-2">
            {currentBoard.members.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="relative"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  member.status === 'online' ? 'bg-green-500' : 
                  member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}></div>
              </div>
            ))}
            {currentBoard.members.length > 5 && (
              <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{currentBoard.members.length - 5}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 overflow-hidden">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="h-full overflow-x-auto">
            <div className="flex gap-6 p-6 h-full min-w-max">
              <AnimatePresence>
                {currentBoard.columns.map((column, index) => (
                  <motion.div
                    key={column.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <KanbanColumn 
                      column={column} 
                      onTaskClick={setSelectedTaskId}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Column Button */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: currentBoard.columns.length * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <button className="w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 flex flex-col items-center justify-center gap-2 group">
                  <div className="p-3 bg-gray-100 group-hover:bg-blue-100 rounded-xl transition-colors">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-500 group-hover:text-blue-600">
                    Add Column
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </DragDropContext>
      </div>

      {/* Task Modal */}
      {selectedTaskId && (
        <TaskModal
          taskId={selectedTaskId}
          board={currentBoard}
          onClose={() => setSelectedTaskId(null)}
          onUpdate={(updatedBoard) => {
            setCurrentBoard(updatedBoard);
            onBoardUpdate(updatedBoard);
          }}
        />
      )}
    </div>
  );
};