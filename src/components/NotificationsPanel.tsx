import React from 'react';
import { X, Bell } from 'lucide-react';

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const notifications = [
    {
      id: 1,
      title: 'New Airdrop Available',
      message: 'You have a new ARB token airdrop worth $150',
      timestamp: new Date(),
      read: false,
    },
    {
      id: 2,
      title: 'Claim Expiring Soon',
      message: 'Your NFT claim expires in 24 hours',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
    },
  ];

  return (
    <div className="absolute top-16 right-4 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="w-6 h-6 mx-auto mb-2" />
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                !notification.read ? 'bg-indigo-50' : ''
              }`}
            >
              <h4 className="font-medium text-gray-900 mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
              <p className="text-xs text-gray-400">
                {notification.timestamp.toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}