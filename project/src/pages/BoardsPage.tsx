import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Grid, List, Star } from 'lucide-react';
import { Board } from '../types';
import { KanbanBoard } from '../components/board/KanbanBoard';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';

interface BoardsPageProps {
  boards: Board[];
  onBoardUpdate: (board: Board) => void;
  onBoardCreate: (board: Board) => void;
  onBoardDelete: (boardId: string) => void;
}

export const BoardsPage: React.FC<BoardsPageProps> = ({
  boards,
  onBoardUpdate,
  onBoardCreate,
  onBoardDelete
}) => {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBoards = boards.filter(board =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    board.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedBoard) {
    return (
      <div className="h-full">
        <div className="p-4 lg:p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <button
            onClick={() => setSelectedBoard(null)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-2"
          >
            ← Back to Boards
          </button>
        </div>
        <KanbanBoard 
          board={selectedBoard} 
          onBoardUpdate={(updatedBoard) => {
            onBoardUpdate(updatedBoard);
            setSelectedBoard(updatedBoard);
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              My Boards
            </h1>
            <p className="text-gray-600">
              Manage your projects and workflows
            </p>
          </div>
          <Button icon={Plus} className="w-full sm:w-auto">
            Create Board
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search boards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Boards Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBoards.map((board, index) => (
                <motion.div
                  key={board.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedBoard(board)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {board.title[0]}
                        </span>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Star className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{board.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {board.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {board.members.slice(0, 4).map((member) => (
                          <Avatar
                            key={member.id}
                            src={member.avatar}
                            alt={member.name}
                            size="sm"
                            className="border-2 border-white"
                          />
                        ))}
                        {board.members.length > 4 && (
                          <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              +{board.members.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {board.columns.reduce((sum, col) => sum + col.tasks.length, 0)} tasks
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredBoards.map((board, index) => (
                <motion.div
                  key={board.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedBoard(board)}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {board.title[0]}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{board.title}</h3>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                            <Star className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {board.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {board.members.slice(0, 4).map((member) => (
                              <Avatar
                                key={member.id}
                                src={member.avatar}
                                alt={member.name}
                                size="sm"
                                className="border-2 border-white"
                              />
                            ))}
                            {board.members.length > 4 && (
                              <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  +{board.members.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {board.columns.reduce((sum, col) => sum + col.tasks.length, 0)} tasks
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredBoards.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No boards found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first board to get started'}
            </p>
            <Button icon={Plus}>
              Create Board
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};