import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Zap, Calendar, Users, MessageSquare, Settings } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: 'task', icon: Plus, label: 'New Task', color: 'bg-blue-600' },
    { id: 'meeting', icon: Calendar, label: 'Schedule Meeting', color: 'bg-green-600' },
    { id: 'team', icon: Users, label: 'Invite Team', color: 'bg-purple-600' },
    { id: 'message', icon: MessageSquare, label: 'Send Message', color: 'bg-orange-600' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 px-4 py-3 ${action.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{action.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <Plus className="w-6 h-6 text-white" />
          ) : (
            <Zap className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};