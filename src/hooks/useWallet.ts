import { useState, useCallback } from 'react';
import { fetchWalletData } from '../services/walletService';
import type { WalletData } from '../types';

export function useWallet() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WalletData | null>(null);

  const fetchData = useCallback(async (address: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const walletData = await fetchWalletData(address);
      setData(walletData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wallet data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchData
  };
}