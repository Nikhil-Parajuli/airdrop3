import React from 'react';
import { X, Check } from 'lucide-react';

interface SubscriptionModalProps {
  onClose: () => void;
}

export function SubscriptionModal({ onClose }: SubscriptionModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upgrade to Premium</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
            <p className="text-gray-600">Access all unclaimed assets across chains</p>
          </div>
          <div className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
            <p className="text-gray-600">Real-time notifications for new airdrops</p>
          </div>
          <div className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
            <p className="text-gray-600">Priority access to high-value opportunities</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="text-center">
            <span className="text-3xl font-bold text-gray-900">$9.99</span>
            <span className="text-gray-500">/month</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}