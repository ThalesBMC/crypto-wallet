export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  balance?: string;
  price?: number;
  change?: number;
}

export interface NativeToken {
  symbol: string;
  decimals: number;
  name: string;
  price: number;
}
