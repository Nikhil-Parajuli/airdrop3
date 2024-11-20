import React from 'react';
import { Wallet, Trash2 } from 'lucide-react';
import { useWalletAddresses } from '../hooks/useWalletAddresses';
import { supabase } from '../lib/supabase';

interface WalletListProps {
  onSelect: (address: string) => void;
}

export function WalletList({ onSelect }: WalletListProps) {
  const { addresses, loading, error } = useWalletAddresses();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('wallet_addresses')
        .delete()
        .match({ id });
      
      if (error) throw error;
    } catch (err) {
      console.error('Error deleting wallet:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  if (!addresses.length) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No wallets added yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {addresses.map((addr) => (
        <div 
          key={addr.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => onSelect(addr.address)}
            className="flex items-center space-x-3 flex-1"
          >
            <Wallet className="w-5 h-5 text-indigo-500" />
            <span className="text-sm text-gray-600">
              {addr.address.slice(0, 6)}...{addr.address.slice(-4)}
            </span>
          </button>
          <button
            onClick={() => handleDelete(addr.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}