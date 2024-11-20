import { Client } from '@covalenthq/client-sdk';
import { Asset } from '../../types';

const client = new Client(import.meta.env.VITE_COVALENT_API_KEY);

export async function getTokenBalances(address: string, chain: string) {
  try {
    const response = await client.BalanceService.getTokenBalancesForWalletAddress(chain, address);
    
    return response.data.items.map(item => ({
      id: item.contract_address,
      type: 'airdrop',
      name: item.contract_name || 'Unknown Token',
      value: item.quote?.toString() || '0',
      chain,
      expiresIn: 'N/A',
      imageUrl: item.logo_url || 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=128&h=128&fit=crop',
      claimUrl: `https://app.uniswap.org/#/swap?outputCurrency=${item.contract_address}`
    })) as Asset[];
  } catch (error) {
    console.error('Covalent API error:', error);
    return [];
  }
}