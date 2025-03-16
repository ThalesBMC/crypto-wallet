import { NativeToken, Token } from "../token/Token";

export interface Network {
  id: string;
  name: string;
  rpcUrl: string;
  chainId: number;
  nativeToken: NativeToken;
  tokens: Token[];
}
