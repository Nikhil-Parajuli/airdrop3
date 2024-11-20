import React, { createContext, useContext, useState } from 'react';
import { WalletData } from '../types';
import { fetchWalletData } from '../services/walletService';

interface WalletContextType {
  wallet: string | null;
  walletData: WalletData | null;
  loading: boolean;
  error: string | null;
  connectWallet: (address: string) => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async (address: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWalletData(address);
      setWallet(address);
      setWalletData(data);
    } catch (err) {
      setError('Failed to fetch wallet data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setWalletData(null);
    setError(null);
  };

  return (
    <WalletContext.Provider 
      value={{ 
        wallet, 
        walletData, 
        loading, 
        error, 
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}