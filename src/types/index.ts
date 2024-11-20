export interface Asset {
  id: string;
  type: 'airdrop' | 'nft';
  name: string;
  value: string;
  chain: string;
  expiresIn: string;
  imageUrl: string;
  claimUrl: string;
}

export interface WalletData {
  assets: Asset[];
  claimed: Asset[];
  expired: Asset[];
  totalValue: number;
  chains: string[];
  isPremium: boolean;
}

export interface WalletAddress {
  id: string;
  user_id: string;
  address: string;
  created_at: string;
  updated_at: string;
}