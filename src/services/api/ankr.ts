import AnkrProvider from '@ankr.com/ankr.js';
import { Asset } from '../../types';

const ankrProvider = new AnkrProvider(import.meta.env.VITE_ANKR_API_KEY);

export async function getTokenHoldings(address: string) {
  try {
    const { assets } = await ankrProvider.getNFTsByOwner({
      walletAddress: address,
      blockchain: ['eth', 'polygon', 'arbitrum', 'optimism']
    });

    return assets.map(asset => ({
      id: asset.contractAddress,
      type: 'nft',
      name: asset.name || 'Unknown NFT',
      value: '0', // Would need price feed for accurate values
      chain: asset.blockchain,
      expiresIn: 'Never',
      imageUrl: asset.imageUrl || 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=128&h=128&fit=crop',
      claimUrl: `https://opensea.io/assets/${asset.contractAddress}/${asset.tokenId}`
    })) as Asset[];
  } catch (error) {
    console.error('Ankr API error:', error);
    return [];
  }
}