import { ethers } from "ethers";
import { Network } from "@/types/network/Network";
import { Token } from "@/types/token/Token";

export const calculateTotalBalance = (
  network: Network,
  nativeBalance: string,
  balances: { [key: string]: string }
): number => {
  const nativeTokenValue =
    parseFloat(
      ethers.utils.formatUnits(nativeBalance, network.nativeToken.decimals)
    ) * network.nativeToken.price;

  const tokensValue = network.tokens.reduce((total: number, token: Token) => {
    const balance = balances[token.address] || "0";
    const formattedBalance = parseFloat(
      ethers.utils.formatUnits(balance, token.decimals)
    );
    return total + formattedBalance * (token.price || 0);
  }, 0);

  return nativeTokenValue + tokensValue;
};
