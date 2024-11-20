import axios from 'axios';
import { MORALIS_API_KEY } from '../config/constants';
import type { SupportedChain } from '../config/constants';

const api = axios.create({
  baseURL: 'https://deep-index.moralis.io/api/v2',
  headers: {
    'X-API-Key': MORALIS_API_KEY,
    'Accept': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Invalid or expired API key. Using mock data instead.');
      return Promise.resolve({ data: { result: [] } });
    }
    return Promise.reject(error);
  }
);

export interface TokenBalance {
  token_address: string;
  name: string;
  symbol: string;
  balance: string;
  decimals: string;
}

export interface NFTData {
  token_address: string;
  token_id: string;
  name: string;
  metadata?: {
    image?: string;
    name?: string;
  };
}

export async function getTokenBalances(address: string, chain: SupportedChain): Promise<TokenBalance[]> {
  try {
    const response = await api.get<{ result: TokenBalance[] }>(`/${address}/erc20`, {
      params: { 
        chain,
        limit: 100
      }
    });
    return response.data.result || [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      console.error(`Error fetching token balances for ${chain}:`, error.message);
    }
    return [];
  }
}

export async function getNFTs(address: string, chain: SupportedChain): Promise<NFTData[]> {
  try {
    const response = await api.get<{ result: NFTData[] }>(`/${address}/nft`, {
      params: { 
        chain,
        format: 'decimal',
        limit: 100,
        normalizeMetadata: true
      }
    });
    return response.data.result || [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      console.error(`Error fetching NFTs for ${chain}:`, error.message);
    }
    return [];
  }
}