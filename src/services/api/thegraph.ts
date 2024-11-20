import { request, gql } from 'graphql-request';
import { Asset } from '../../types';

// Example using Uniswap V3 subgraph
const UNISWAP_V3_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const AIRDROP_QUERY = gql`
  query getAirdrops($address: String!) {
    account(id: $address) {
      id
      positions {
        id
        token0 {
          id
          symbol
          name
        }
        token1 {
          id
          symbol
          name
        }
      }
    }
  }
`;

export async function getAirdrops(address: string): Promise<Asset[]> {
  try {
    const data = await request(UNISWAP_V3_SUBGRAPH, AIRDROP_QUERY, { address });
    
    if (!data.account) return [];

    return data.account.positions.map((position: any) => ({
      id: position.id,
      type: 'airdrop',
      name: `${position.token0.symbol}/${position.token1.symbol} LP Position`,
      value: '0', // Would need price feed for accurate values
      chain: 'ethereum',
      expiresIn: 'N/A',
      imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=128&h=128&fit=crop',
      claimUrl: `https://app.uniswap.org/#/pool/${position.id}`
    }));
  } catch (error) {
    console.error('TheGraph API error:', error);
    return [];
  }
}