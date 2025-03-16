import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Network } from "@/types/network/Network";
import { useWalletStore } from "../store/walletStore";

export const useBalanceFetcher = (
  selectedNetwork: Network | null,
  walletAddress: string
) => {
  const [nativeBalance, setNativeBalance] = useState("0");
  const [loadingTokens, setLoadingTokens] = useState<Set<string>>(new Set());
  const { updateBalance } = useWalletStore();

  useEffect(() => {
    if (!selectedNetwork || !walletAddress) return;

    const provider = new ethers.providers.JsonRpcProvider(
      selectedNetwork.rpcUrl
    );

    const fetchNativeBalance = async () => {
      try {
        const balance = await provider.getBalance(walletAddress);

        setNativeBalance(balance.toString());
      } catch (error) {
        console.error("Error fetching native balance:", error);

        setNativeBalance("0");
      }
    };

    const fetchTokenBalances = async () => {
      const newLoadingTokens = new Set<string>();

      setLoadingTokens(newLoadingTokens);

      const fetchPromises = selectedNetwork.tokens.map(async (token) => {
        newLoadingTokens.add(token.address);

        setLoadingTokens(new Set(newLoadingTokens));

        try {
          const contract = new ethers.Contract(
            token.address,
            ["function balanceOf(address) view returns (uint256)"],
            provider
          );

          const balance = await contract.balanceOf(walletAddress);

          await updateBalance(
            selectedNetwork.id,
            token.address,
            balance.toString()
          );
        } catch (error) {
          console.error(`Error fetching balance for ${token.symbol}:`, error);

          await updateBalance(selectedNetwork.id, token.address, "0");
        } finally {
          newLoadingTokens.delete(token.address);

          setLoadingTokens(new Set(newLoadingTokens));
        }
      });

      await Promise.all(fetchPromises);
    };

    fetchNativeBalance();
    fetchTokenBalances();
  }, [selectedNetwork, walletAddress, updateBalance]);

  return {
    nativeBalance,
    loadingTokens,
  };
};

export default useBalanceFetcher;
