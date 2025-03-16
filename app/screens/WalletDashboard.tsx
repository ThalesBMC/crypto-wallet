import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWalletStore } from "../store/walletStore";
import { NETWORKS } from "../config/networks";
import { WALLETS, WalletKey } from "../config/wallets";
import { WalletSelector } from "../components/WalletSelector";
import { NetworkSelector } from "../components/NetworkSelector";
import { BalanceCard } from "../components/BalanceCard";
import { TokenList } from "../components/TokenList";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useBalanceFetcher } from "../hooks/useBalanceFetcher";
import { calculateTotalBalance } from "../utils/balanceCalculations";
import { palette } from "../constants/Colors";

export default function WalletDashboard() {
  const insets = useSafeAreaInsets();
  const [selectedWallet, setSelectedWallet] = useState<WalletKey>("my-wallet");

  const { selectedNetwork, setSelectedNetwork, balances, address, disconnect } =
    useWalletStore();

  const topPadding = Platform.select({
    ios: insets.top,
    android: 24,
  });

  // Update my-wallet address when connected
  const wallets = useMemo(
    () => ({
      ...WALLETS,
      "my-wallet": address || "",
    }),
    [address]
  );

  useEffect(() => {
    if (!selectedNetwork) {
      setSelectedNetwork(NETWORKS[0]);
    }
  }, [selectedNetwork, setSelectedNetwork]);

  const { nativeBalance, loadingTokens } = useBalanceFetcher(
    selectedNetwork,
    wallets[selectedWallet]
  );

  const totalBalance = useMemo(() => {
    if (!selectedNetwork) return 0;
    return calculateTotalBalance(
      selectedNetwork,
      nativeBalance,
      balances[selectedNetwork.id] || {}
    );
  }, [selectedNetwork, nativeBalance, balances]);

  const change = useMemo(() => {
    return totalBalance ? parseFloat((Math.random() * 4 + 1).toFixed(1)) : 0;
  }, [selectedWallet, selectedNetwork]);

  const handleDeleteWallet = useCallback(async () => {
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
  }, [selectedWallet, selectedNetwork]);

  if (!selectedNetwork) return null;
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.content, { paddingTop: topPadding }]}>
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
              wallets={wallets}
            />
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BalanceCard
            balance={`$${totalBalance.toLocaleString() || "0.00"}`}
            address={wallets[selectedWallet]}
            change={change}
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
    backgroundColor: palette.gray[900],
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
