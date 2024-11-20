import { Asset } from '../types';

export const mockAssets: Asset[] = [
  {
    id: 'arb-1',
    type: 'airdrop',
    name: 'Arbitrum Airdrop',
    value: '150',
    chain: 'Arbitrum',
    expiresIn: '7 days',
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=128&h=128&fit=crop',
    claimUrl: 'https://arbitrum.foundation/claim'
  },
  {
    id: 'op-1',
    type: 'airdrop',
    name: 'Optimism Airdrop',
    value: '200',
    chain: 'Optimism',
    expiresIn: '5 days',
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=128&h=128&fit=crop',
    claimUrl: 'https://app.optimism.io/airdrop'
  },
  {
    id: 'nft-1',
    type: 'nft',
    name: 'Crypto Punk #1234',
    value: '1000',
    chain: 'Ethereum',
    expiresIn: '3 days',
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=128&h=128&fit=crop',
    claimUrl: 'https://opensea.io/assets/0x123'
  },
  {
    id: 'matic-1',
    type: 'airdrop',
    name: 'Polygon Airdrop',
    value: '75',
    chain: 'Polygon',
    expiresIn: '10 days',
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=128&h=128&fit=crop',
    claimUrl: 'https://polygon.technology/claim'
  }
];