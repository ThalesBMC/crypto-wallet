import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ethers } from "ethers";
import { useWalletStore } from "../store/walletStore";
import { NETWORKS } from "../config/networks";
import { WalletSelector } from "../components/WalletSelector";
import { NetworkSelector } from "../components/NetworkSelector";
import { BalanceCard } from "../components/BalanceCard";
import { TokenList } from "../components/TokenList";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RainbowLogo } from "../components/RainbowLogo";
import { router } from "expo-router";

type WalletAddresses = {
  [key: string]: string;
};

export default function WalletDashboard() {
  const insets = useSafeAreaInsets();
  const [selectedWallet, setSelectedWallet] = useState("my-wallet");
  const [loadingTokens, setLoadingTokens] = useState<Set<string>>(new Set());
  const [nativeBalance, setNativeBalance] = useState("0");
  const {
    selectedNetwork,
    setSelectedNetwork,
    balances,
    updateBalance,
    address,
    disconnect,
  } = useWalletStore();

  const WALLETS: WalletAddresses = {
    "my-wallet": address || "",
    vitalik: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "cz-binance": "0xF977814e90dA44bFA03b6295A0616a897441aceC",
  };

  useEffect(() => {
    if (!selectedNetwork) {
      setSelectedNetwork(NETWORKS[0]);
    }
  }, [selectedNetwork, setSelectedNetwork]);

  useEffect(() => {
    const fetchNativeBalance = async () => {
      if (!selectedNetwork || !WALLETS[selectedWallet]) return;

      try {
        const provider = new ethers.providers.JsonRpcProvider(
          selectedNetwork.rpcUrl
        );
        const balance = await provider.getBalance(WALLETS[selectedWallet]);
        setNativeBalance(balance.toString());
      } catch (error) {
        console.error("Error fetching native balance:", error);
        setNativeBalance("0");
      }
    };

    const fetchTokenBalances = async () => {
      if (!selectedNetwork || !WALLETS[selectedWallet]) return;

      const provider = new ethers.providers.JsonRpcProvider(
        selectedNetwork.rpcUrl
      );
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

          const balance = await contract.balanceOf(WALLETS[selectedWallet]);
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
  }, [selectedNetwork, selectedWallet, address]);

  // Calculate total balance including native token
  const totalBalance = selectedNetwork
    ? selectedNetwork.tokens.reduce((total, token) => {
        const balance = balances[selectedNetwork.id]?.[token.address] || "0";
        const formattedBalance = parseFloat(
          ethers.utils.formatUnits(balance, token.decimals)
        );
        return total + formattedBalance * (token.price || 0);
      }, parseFloat(ethers.utils.formatUnits(nativeBalance, selectedNetwork.nativeToken.decimals)) * selectedNetwork.nativeToken.price)
    : 0;

  const handleDeleteWallet = async () => {
    try {
      await disconnect();
      router.replace("/");
    } catch (error) {
      console.error("Failed to delete wallet:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete wallet. Please try again.",
      });
    }
  };

  if (!selectedNetwork) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View>
            <NetworkSelector
              selectedNetwork={selectedNetwork}
              onSelectNetwork={setSelectedNetwork}
              networks={NETWORKS}
            />
            <WalletSelector
              selectedWallet={selectedWallet}
              onSelectWallet={setSelectedWallet}
              wallets={WALLETS}
            />
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BalanceCard
            balance={`$${totalBalance?.toLocaleString() || "0.00"}`}
            address={WALLETS[selectedWallet]}
            change={2.4}
            onDeleteWallet={handleDeleteWallet}
          />

          <TokenList
            tokens={[
              {
                address: "native",
                symbol: selectedNetwork.nativeToken.symbol,
                name: selectedNetwork.nativeToken.name,
                decimals: selectedNetwork.nativeToken.decimals,
                price: selectedNetwork.nativeToken.price,
                balance: nativeBalance,
              },
              ...selectedNetwork.tokens,
            ]}
            balances={{
              native: nativeBalance,
              ...balances[selectedNetwork.id],
            }}
            isLoading={loadingTokens.size > 0}
          />
        </ScrollView>

        <Toast topOffset={60} visibilityTime={3000} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
