import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { Asset } from '../types';

interface AssetCardProps {
  asset: Asset;
  onClaim: () => void;
}

export function AssetCard({ asset, onClaim }: AssetCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <img
          src={asset.imageUrl}
          alt={asset.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">{asset.name}</h3>
            <span className="text-sm font-medium text-green-600">
              ${asset.value}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-500 capitalize">{asset.chain}</span>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {asset.expiresIn}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={onClaim}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
        >
          <span>Claim Now</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}