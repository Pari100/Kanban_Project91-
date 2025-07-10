import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Settings, Share2, Star, MoreHorizontal } from 'lucide-react';
import { Board } from '../../types';
import { KanbanColumn } from './KanbanColumn';
import { Button } from '../ui/Button';

interface KanbanBoardProps {
  board: Board;
  onBoardUpdate: (board: Board) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ board, onBoardUpdate }) => {
  const [currentBoard, setCurrentBoard] = useState(board);

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
    newDestTasks.splice(destination.index, 0, draggedTask);

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

    const updatedBoard = { ...currentBoard, columns: newColumns };
    setCurrentBoard(updatedBoard);
    onBoardUpdate(updatedBoard);
  };

  return (
    <div className="flex-1 p-6">
      {/* Board Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{currentBoard.title}</h1>
          <p className="text-gray-600">Welcome back</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" icon={Settings} className="text-gray-600">
            Settings
          </Button>
          <Button variant="ghost" icon={Star} className="text-gray-600">
            Favorite
          </Button>
          <Button variant="primary" icon={Share2}>
            Share
          </Button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Board Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
          <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
          </div>
          Board
        </button>
        <button className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-4 h-4 flex flex-col gap-0.5">
            <div className="h-0.5 bg-gray-400 rounded"></div>
            <div className="h-0.5 bg-gray-400 rounded"></div>
            <div className="h-0.5 bg-gray-400 rounded"></div>
          </div>
          To Do List
        </button>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {currentBoard.columns.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};