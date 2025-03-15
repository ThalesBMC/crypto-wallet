import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Token } from "../config/networks";
import { ethers } from "ethers";

type SortOption =
  | "name"
  | "value-high"
  | "value-low"
  | "change-high"
  | "change-low";

interface TokenListProps {
  tokens: Token[];
  balances: Record<string, string>;
  isLoading: boolean;
}

const TokenItem = ({
  token,
  balance,
  isLoading,
}: {
  token: Token;
  balance: string;
  isLoading: boolean;
}) => {
  const formattedBalance = ethers.utils.formatUnits(
    balance || "0",
    token.decimals
  );
  const usdValue = parseFloat(formattedBalance) * (token.price || 0);

  return (
    <View style={styles.tokenItem}>
      <View style={styles.tokenIcon}>
        <Text style={styles.tokenIconText}>{token.symbol[0]}</Text>
      </View>
      <View style={styles.tokenInfo}>
        <Text style={styles.tokenSymbol}>{token.symbol}</Text>
        <Text style={styles.tokenName}>{token.name}</Text>
      </View>
      <View style={styles.tokenValues}>
        <Text style={[styles.tokenBalance, isLoading && styles.loadingText]}>
          {parseFloat(formattedBalance).toFixed(4)}
        </Text>
        {usdValue > 0 && (
          <Text style={styles.tokenUsdValue}>${usdValue.toLocaleString()}</Text>
        )}
      </View>
    </View>
  );
};

export const TokenList = ({ tokens, balances, isLoading }: TokenListProps) => {
  const [sortOption, setSortOption] = useState<SortOption>("value-high");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortedTokens = [...tokens].sort((a, b) => {
    const balanceA = parseFloat(
      ethers.utils.formatUnits(balances[a.address] || "0", a.decimals)
    );
    const balanceB = parseFloat(
      ethers.utils.formatUnits(balances[b.address] || "0", b.decimals)
    );
    const valueA = balanceA * (a.price || 0);
    const valueB = balanceB * (b.price || 0);

    switch (sortOption) {
      case "name":
        return a.symbol.localeCompare(b.symbol);
      case "value-high":
        return valueB - valueA;
      case "value-low":
        return valueA - valueB;
      case "change-high":
        return (b.change || 0) - (a.change || 0);
      case "change-low":
        return (a.change || 0) - (b.change || 0);
      default:
        return 0;
    }
  });

  const renderItem = ({ item }: { item: Token }) => (
    <TokenItem
      token={item}
      balance={balances[item.address] || "0"}
      isLoading={isLoading}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Tokens</Text>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortMenu(!showSortMenu)}
        >
          <Ionicons name="swap-vertical" size={16} color="#fff" />
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {showSortMenu && (
        <View style={styles.sortMenu}>
          <TouchableOpacity
            style={[
              styles.sortOption,
              sortOption === "name" && styles.selectedSort,
            ]}
            onPress={() => {
              setSortOption("name");
              setShowSortMenu(false);
            }}
          >
            <Text style={styles.sortOptionText}>Name (A-Z)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortOption,
              sortOption === "value-high" && styles.selectedSort,
            ]}
            onPress={() => {
              setSortOption("value-high");
              setShowSortMenu(false);
            }}
          >
            <Text style={styles.sortOptionText}>Value (High to Low)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortOption,
              sortOption === "value-low" && styles.selectedSort,
            ]}
            onPress={() => {
              setSortOption("value-low");
              setShowSortMenu(false);
            }}
          >
            <Text style={styles.sortOptionText}>Value (Low to High)</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlashList
        data={sortedTokens}
        renderItem={renderItem}
        estimatedItemSize={80}
        keyExtractor={(item) => item.address}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    margin: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    gap: 4,
  },
  sortButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  sortMenu: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 8,
    zIndex: 1,
    elevation: 3,
  },
  sortOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedSort: {
    backgroundColor: "rgba(255, 0, 122, 0.1)",
  },
  sortOptionText: {
    color: "#fff",
    fontSize: 14,
  },
  tokenItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF007A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  tokenIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  tokenInfo: {
    flex: 1,
  },
  tokenSymbol: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  tokenName: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  tokenValues: {
    alignItems: "flex-end",
  },
  tokenBalance: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#fff",
  },
  tokenUsdValue: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  loadingText: {
    opacity: 0.5,
  },
});
