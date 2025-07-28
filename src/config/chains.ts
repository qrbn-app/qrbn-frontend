import { Chain } from 'viem/chains';

export const LISK_SEPOLIA_CHAIN: Chain = {
  id: 4202, // Lisk Sepolia chain ID
  name: 'Lisk Sepolia',
  // network: 'lisk-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia-api.lisk.com'],
    },
    public: {
      http: ['https://rpc.sepolia-api.lisk.com'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'LiskScan',
      url: 'https://sepolia-blockscout.lisk.com' 
    },
  },
  testnet: true,
};

export const SUPPORTED_CHAINS = [LISK_SEPOLIA_CHAIN];
