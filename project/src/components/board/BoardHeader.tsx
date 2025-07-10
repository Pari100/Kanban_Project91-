import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Share2, 
  MoreHorizontal, 
  Lock, 
  Globe,
  Calendar,
  Target
} from 'lucide-react';
import { Board } from '../../types';
import { format } from 'date-fns';

interface BoardHeaderProps {
  board: Board;
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({ board }) => {
  return (
    <div className="px-6 py-6 bg-white/70 backdrop-blur-xl border-b border-white/20">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{board.title}</h1>
              <div className="flex items-center gap-1">
                {board.isPrivate ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
                    <Lock className="w-3 h-3 text-gray-600" />
                    <span className="text-xs font-medium text-gray-600">Private</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg">
                    <Globe className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-600">Team</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-1">
              <p className="text-gray-600">{board.description}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Updated {format(board.updatedAt, 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white/80 hover:bg-white border border-white/30 rounded-xl transition-all duration-200 flex items-center gap-2"
          >
            <Star className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Favorite</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share Board</span>
          </motion.button>

          <button className="p-3 bg-white/80 hover:bg-white border border-white/30 rounded-xl transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};