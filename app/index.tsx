import { Redirect } from "expo-router";
import { useWalletStore } from "./store/walletStore";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { palette } from "./constants/Colors";

export default function Index() {
  const { address, isLoading } = useWalletStore();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={palette.pink[500]} />
      </View>
    );
  }

  return <Redirect href={address ? "/wallet" : "/create"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[900],
    justifyContent: "center",
    alignItems: "center",
  },
});
