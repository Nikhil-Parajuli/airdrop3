import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { WalletAddress } from '../types';
import { useAuth } from '../context/AuthContext';

export function useWalletAddresses() {
  const [addresses, setAddresses] = useState<WalletAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function fetchAddresses() {
      try {
        const { data, error } = await supabase
          .from('wallet_addresses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAddresses(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch addresses');
      } finally {
        setLoading(false);
      }
    }

    fetchAddresses();

    // Subscribe to changes
    const subscription = supabase
      .channel('wallet_addresses_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'wallet_addresses',
          filter: `user_id=eq.${user.id}`
        }, 
        payload => {
          if (payload.eventType === 'INSERT') {
            setAddresses(prev => [payload.new as WalletAddress, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setAddresses(prev => prev.filter(addr => addr.id !== payload.old.id));
          }
        })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { addresses, loading, error };
}