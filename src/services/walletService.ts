import { Asset, WalletData } from '../types';
import { supabase } from '../lib/supabase';
import { getNFTs, getTokens, getAirdrops } from './api/moralis';

export async function saveWalletAddress(userId: string, address: string) {
  const { error } = await supabase
    .from('wallet_addresses')
    .upsert({ 
      user_id: userId,
      address: address,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
}

export async function fetchWalletData(address: string): Promise<WalletData> {
  try {
    if (!address || typeof address !== 'string') {
      throw new Error('Invalid wallet address');
    }

    // Fetch all data in parallel
    const [nfts, tokens, airdrops] = await Promise.all([
      getNFTs(address),
      getTokens(address),
      getAirdrops(address)
    ]);

    // Combine all assets
    const assets: Asset[] = [...nfts, ...tokens, ...airdrops];

    // Group assets by status
    const now = new Date();
    const categorizedAssets = assets.reduce((acc, asset) => {
      const expiryDate = new Date(now);
      expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now

      if (asset.type === 'airdrop') {
        if (new Date(asset.expiresIn) < now) {
          acc.expired.push(asset);
        } else {
          acc.unclaimed.push(asset);
        }
      } else {
        acc.claimed.push(asset);
      }
      return acc;
    }, {
      unclaimed: [] as Asset[],
      claimed: [] as Asset[],
      expired: [] as Asset[]
    });

    // Calculate totals
    const chains = [...new Set(assets.map(asset => asset.chain))];
    const totalValue = assets.reduce((sum, asset) => 
      sum + parseFloat(asset.value || '0'), 0
    );

    return {
      assets: categorizedAssets.unclaimed,
      claimed: categorizedAssets.claimed,
      expired: categorizedAssets.expired,
      totalValue,
      chains,
      isPremium: false
    };
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }
}