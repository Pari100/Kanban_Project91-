import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  Users,
  Plus,
  Filter
} from 'lucide-react';
import { Board } from '../types';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';

interface CalendarPageProps {
  boards: Board[];
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ boards }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get all tasks with due dates
  const allTasks = boards.flatMap(board => 
    board.columns.flatMap(column => 
      column.tasks.filter(task => task.dueDate).map(task => ({
        ...task,
        boardTitle: board.title
      }))
    )
  );

  // Get tasks for selected date
  const tasksForSelectedDate = allTasks.filter(task => 
    task.dueDate && isSameDay(new Date(task.dueDate), selectedDate)
  );

  // Generate calendar days
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get tasks count for each day
  const getTasksForDay = (day: Date) => {
    return allTasks.filter(task => 
      task.dueDate && isSameDay(new Date(task.dueDate), day)
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Calendar
            </h1>
            <p className="text-gray-600">
              Track deadlines and schedule tasks
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" icon={Filter}>
              Filter
            </Button>
            <Button icon={Plus}>
              Add Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card className="p-4 lg:p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const dayTasks = getTasksForDay(day);
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrentDay = isToday(day);
                  
                  return (
                    <motion.button
                      key={day.toISOString()}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01 }}
                      onClick={() => setSelectedDate(day)}
                      className={`relative p-2 h-16 text-left rounded-lg transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-600 text-white' 
                          : isCurrentDay
                          ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                          : isSameMonth(day, currentDate)
                          ? 'hover:bg-gray-50 text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {format(day, 'd')}
                      </span>
                      {dayTasks.length > 0 && (
                        <div className="absolute bottom-1 left-1 right-1">
                          <div className={`h-1 rounded-full ${
                            isSelected ? 'bg-white/50' : 'bg-blue-500'
                          }`} />
                          {dayTasks.length > 1 && (
                            <div className={`text-xs mt-1 ${
                              isSelected ? 'text-white/80' : 'text-gray-600'
                            }`}>
                              {dayTasks.length} tasks
                            </div>
                          )}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Tasks */}
            <Card className="p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">
                  {format(selectedDate, 'MMM d, yyyy')}
                </h3>
              </div>
              
              {tasksForSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  {tasksForSelectedDate.map((task) => (
                    <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {task.boardTitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Due today
                          </span>
                        </div>
                        {task.assignees.length > 0 && (
                          <Avatar
                            src={task.assignees[0].avatar}
                            alt={task.assignees[0].name}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <CalendarIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No tasks for this date</p>
                </div>
              )}
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="p-4 lg:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {allTasks
                  .filter(task => task.dueDate && new Date(task.dueDate) > new Date())
                  .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
                  .slice(0, 5)
                  .map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'urgent' ? 'bg-red-500' :
                        task.priority === 'high' ? 'bg-orange-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(task.dueDate!), 'MMM d')}
                        </p>
                      </div>
                      {task.assignees.length > 0 && (
                        <Avatar
                          src={task.assignees[0].avatar}
                          alt={task.assignees[0].name}
                          size="sm"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 lg:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Tasks</span>
                  <span className="font-semibold text-gray-900">
                    {allTasks.filter(task => 
                      task.dueDate && isSameMonth(new Date(task.dueDate), currentDate)
                    ).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">
                    {allTasks.filter(task => 
                      task.dueDate && 
                      isSameMonth(new Date(task.dueDate), currentDate) &&
                      task.status === 'done'
                    ).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overdue</span>
                  <span className="font-semibold text-red-600">
                    {allTasks.filter(task => 
                      task.dueDate && 
                      new Date(task.dueDate) < new Date() &&
                      task.status !== 'done'
                    ).length}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};