export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  balance?: string;
  price?: number;
  change?: number;
}

export interface Network {
  id: string;
  name: string;
  rpcUrl: string;
  chainId: number;
  nativeToken: {
    symbol: string;
    decimals: number;
    name: string;
    price: number;
  };
  tokens: Token[];
}

export const NETWORKS: Network[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    rpcUrl: "https://eth.llamarpc.com",
    chainId: 1,
    nativeToken: {
      symbol: "ETH",
      decimals: 18,
      name: "Ethereum",
      price: 3500,
    },
    tokens: [
      {
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        price: 1.0,
      },
      {
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        decimals: 8,
        price: 80000,
      },
      {
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        symbol: "WETH",
        name: "Wrapped Ether",
        decimals: 18,
        price: 2000,
      },
      {
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        symbol: "DAI",
        name: "Dai Stablecoin",
        decimals: 18,
        price: 1.0,
      },
    ],
  },
  {
    id: "base",
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    chainId: 8453,
    nativeToken: {
      symbol: "ETH",
      decimals: 18,
      name: "Ethereum",
      price: 3500,
    },
    tokens: [
      {
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        price: 1.0,
      },
      {
        address: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c",
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        decimals: 8,
        price: 80000,
      },
      {
        address: "0x4200000000000000000000000000000000000006",
        symbol: "WETH",
        name: "Wrapped Ether",
        decimals: 18,
        price: 2000,
      },
      {
        address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
        symbol: "USDbC",
        name: "USD Base Coin",
        decimals: 6,
        price: 1.0,
      },
      {
        address: "0xCfA3Ef56d303AE4fAabA0592388F19d7C3399FB4",
        symbol: "DAI",
        name: "Dai Stablecoin",
        decimals: 18,
        price: 1.0,
      },
    ],
  },
];
