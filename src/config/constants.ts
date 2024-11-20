export const MORALIS_API_KEY = import.meta.env.VITE_MORALIS_API_KEY;

export const SUPPORTED_CHAINS = [
  'eth',
  'polygon',
  'arbitrum',
  'optimism'
] as const;

export type SupportedChain = typeof SUPPORTED_CHAINS[number];

export const CHAIN_NAMES: Record<SupportedChain, string> = {
  eth: 'Ethereum',
  polygon: 'Polygon',
  arbitrum: 'Arbitrum',
  optimism: 'Optimism'
};