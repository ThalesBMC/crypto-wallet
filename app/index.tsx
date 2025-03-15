import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useWalletStore } from "./store/walletStore";

export default function Index() {
  const { isWalletCreated, isLoading } = useWalletStore();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF007A" />
      </View>
    );
  }

  return <Redirect href={isWalletCreated ? "/wallet" : "/create"} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
});
