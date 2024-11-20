import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { Asset } from '../../types';

// Initialize Moralis
await Moralis.start({
  apiKey: import.meta.env.VITE_MORALIS_API_KEY
});

export async function getNFTs(address: string) {
  try {
    // Get NFTs across multiple chains
    const chains = [
      EvmChain.ETHEREUM,
      EvmChain.POLYGON,
      EvmChain.ARBITRUM,
      EvmChain.OPTIMISM
    ];

    const nfts = await Promise.all(
      chains.map(chain =>
        Moralis.EvmApi.nft.getWalletNFTs({
          address,
          chain
        })
      )
    );

    return nfts.flatMap(response =>
      response.result.map(nft => ({
        id: `${nft.tokenAddress}-${nft.tokenId}`,
        type: 'nft',
        name: nft.name || 'Unknown NFT',
        value: '0',
        chain: nft.chain.name,
        expiresIn: 'Never',
        imageUrl: nft.metadata?.image || 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=128&h=128&fit=crop',
        claimUrl: `https://opensea.io/assets/${nft.tokenAddress}/${nft.tokenId}`
      }))
    ) as Asset[];
  } catch (error) {
    console.error('Moralis NFT error:', error);
    return [];
  }
}

export async function getTokens(address: string) {
  try {
    const chains = [
      EvmChain.ETHEREUM,
      EvmChain.POLYGON,
      EvmChain.ARBITRUM,
      EvmChain.OPTIMISM
    ];

    const tokens = await Promise.all(
      chains.map(chain =>
        Moralis.EvmApi.token.getWalletTokenBalances({
          address,
          chain
        })
      )
    );

    return tokens.flatMap(response =>
      response.result.map(token => ({
        id: token.token?.contractAddress,
        type: 'airdrop',
        name: token.token?.name || 'Unknown Token',
        value: token.value?.toString() || '0',
        chain: token.chain.name,
        expiresIn: '30 days', // Default expiry for airdrops
        imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=128&h=128&fit=crop',
        claimUrl: `https://app.uniswap.org/#/swap?outputCurrency=${token.token?.contractAddress}`
      }))
    ) as Asset[];
  } catch (error) {
    console.error('Moralis token error:', error);
    return [];
  }
}

// Get potential airdrops based on token transfers
export async function getAirdrops(address: string) {
  try {
    const chains = [
      EvmChain.ETHEREUM,
      EvmChain.POLYGON,
      EvmChain.ARBITRUM,
      EvmChain.OPTIMISM
    ];

    const transfers = await Promise.all(
      chains.map(chain =>
        Moralis.EvmApi.token.getWalletTokenTransfers({
          address,
          chain
        })
      )
    );

    // Filter for potential airdrop transactions
    return transfers.flatMap(response =>
      response.result
        .filter(transfer => 
          // Filter for incoming transfers that might be airdrops
          transfer.fromAddress === '0x0000000000000000000000000000000000000000' ||
          transfer.value?.toString() === '0'
        )
        .map(transfer => ({
          id: transfer.transactionHash,
          type: 'airdrop',
          name: `${transfer.token?.name || 'Unknown'} Airdrop`,
          value: transfer.value?.toString() || '0',
          chain: transfer.chain.name,
          expiresIn: '30 days',
          imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=128&h=128&fit=crop',
          claimUrl: `https://etherscan.io/tx/${transfer.transactionHash}`
        }))
    ) as Asset[];
  } catch (error) {
    console.error('Moralis transfers error:', error);
    return [];
  }
}