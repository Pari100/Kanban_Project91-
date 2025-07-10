import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { BoardsPage } from './pages/BoardsPage';
import { CalendarPage } from './pages/CalendarPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TeamsPage } from './pages/TeamsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SettingsPage } from './pages/SettingsPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { mockBoard } from './utils/mockData';
import { Board } from './types';

function App() {
  const [boards, setBoards] = useLocalStorage<Board[]>('flowboard-boards', [mockBoard]);

  const handleBoardUpdate = (updatedBoard: Board) => {
    setBoards(prev => prev.map(board => 
      board.id === updatedBoard.id ? updatedBoard : board
    ));
  };

  const handleBoardCreate = (newBoard: Board) => {
    setBoards(prev => [...prev, newBoard]);
  };

  const handleBoardDelete = (boardId: string) => {
    setBoards(prev => prev.filter(board => board.id !== boardId));
  };

  return (
    <Router>
      <div className="h-screen overflow-hidden">
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard boards={boards} />} />
            <Route 
              path="/boards" 
              element={
                <BoardsPage 
                  boards={boards} 
                  onBoardUpdate={handleBoardUpdate}
                  onBoardCreate={handleBoardCreate}
                  onBoardDelete={handleBoardDelete}
                />
              } 
            />
            <Route path="/calendar" element={<CalendarPage boards={boards} />} />
            <Route path="/analytics" element={<AnalyticsPage boards={boards} />} />
            <Route path="/team" element={<TeamsPage />} />
            <Route path="/projects" element={<ProjectsPage boards={boards} />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AppLayout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;