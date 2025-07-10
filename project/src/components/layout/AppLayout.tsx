import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { NotificationPanel } from '../notifications/NotificationPanel';
import { QuickActions } from '../ui/QuickActions';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobile && !sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarCollapsed(true)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          width: sidebarCollapsed ? (isMobile ? 0 : 80) : (isMobile ? 280 : 280),
          x: sidebarCollapsed && isMobile ? -280 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl relative z-50 ${
          isMobile ? 'fixed h-full' : ''
        }`}
      >
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar 
          onNotificationsToggle={() => setNotificationsPanelOpen(!notificationsPanelOpen)}
          notificationsOpen={notificationsPanelOpen}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
          isMobile={isMobile}
        />

        {/* Content */}
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {notificationsPanelOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`bg-white/90 backdrop-blur-xl border-l border-white/20 shadow-2xl ${
              isMobile ? 'fixed right-0 top-0 h-full w-80 z-50' : 'w-80'
            }`}
          >
            <NotificationPanel onClose={() => setNotificationsPanelOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Notification Overlay */}
      {isMobile && notificationsPanelOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setNotificationsPanelOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Quick Actions Floating Button */}
      <QuickActions />
    </div>
  );
};