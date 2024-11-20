import React, { useState } from 'react';
import { Search, Gift, Coins } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { WalletConnect } from './WalletConnect';
import { AssetCard } from './AssetCard';
import { SubscriptionModal } from './SubscriptionModal';
import { NotificationsPanel } from './NotificationsPanel';
import { SettingsPanel } from './SettingsPanel';

type FilterStatus = 'unclaimed' | 'claimed' | 'expired';

export function Dashboard() {
  const { wallet, walletData, loading } = useWallet();
  const [showSubscription, setShowSubscription] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('unclaimed');

  if (!wallet || !walletData) {
    return <WalletConnect />;
  }

  const handleClaim = (claimUrl: string) => {
    window.open(claimUrl, '_blank', 'noopener,noreferrer');
  };

  const filteredAssets = walletData.assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.chain.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'unclaimed';  // For demo, all assets are unclaimed
    
    return matchesSearch && matchesStatus;
  });

  const displayedAssets = walletData.isPremium 
    ? filteredAssets 
    : filteredAssets.slice(0, 3);

  return (
    <div className="h-full">
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl text-white">
            <div className="flex items-center justify-between mb-2">
              <Gift className="w-6 h-6" />
              <span className="text-xs opacity-75">Total Value</span>
            </div>
            <p className="text-2xl font-bold">${walletData.totalValue.toFixed(2)}</p>
            <p className="text-sm opacity-75">{walletData.assets.length} Assets Found</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white">
            <div className="flex items-center justify-between mb-2">
              <Coins className="w-6 h-6" />
              <span className="text-xs opacity-75">Chains</span>
            </div>
            <p className="text-2xl font-bold">{walletData.chains.length}</p>
            <p className="text-sm opacity-75">Networks</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {(['unclaimed', 'claimed', 'expired'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status === filterStatus && (
                    <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                      {status === 'unclaimed' ? displayedAssets.length : '0'}
                    </span>
                  )}
                </button>
              ))}
            </div>
            {!walletData.isPremium && (
              <button 
                onClick={() => setShowSubscription(true)}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium"
              >
                View All ({walletData.assets.length})
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {filterStatus === 'unclaimed' ? (
              displayedAssets.map((asset) => (
                <AssetCard 
                  key={asset.id} 
                  asset={asset}
                  onClaim={() => handleClaim(asset.claimUrl)}
                />
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No {filterStatus} assets found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSubscription && (
        <SubscriptionModal onClose={() => setShowSubscription(false)} />
      )}
      
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
      
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}