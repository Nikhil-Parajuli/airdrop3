import React, { useState } from 'react';
import { Settings, Bell, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SettingsPanel } from './SettingsPanel';
import { NotificationsPanel } from './NotificationsPanel';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <header className="px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Airdrop Finder
            </h1>
          </div>
          {user && (
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSettings(false);
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button 
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowNotifications(false);
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
    </div>
  );
}