import React, { useCallback, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import { Text } from "../components/Themed";
import { useWalletStore } from "../store/walletStore";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RainbowLogo } from "../components/RainbowLogo";
import { palette } from "@/app/constants/Colors";
import { PrimaryButton } from "../components/ui/Button";

export default function CreateWallet() {
  const { createWallet } = useWalletStore();
  const [isCreating, setIsCreating] = useState(false);
  const insets = useSafeAreaInsets();

  const handleCreateWallet = useCallback(async () => {
    if (isCreating) return;

    setIsCreating(true);

    setTimeout(async () => {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        const { seedPhrase } = await createWallet();

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.push({
          pathname: "/seed-phrase",
          params: { seedPhrase },
        });
      } catch (error) {
        console.error("Wallet creation failed", error);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("Error", "Wallet creation failed. Try again.");
      } finally {
        setIsCreating(false);
      }
    }, 500);
  }, [isCreating]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <RainbowLogo width={160} />
        </View>
        <Text style={styles.title}>Welcome to Rainbow</Text>
        <Text style={styles.subtitle}>
          Your gateway to the decentralized world
        </Text>

        <PrimaryButton
          onPress={handleCreateWallet}
          disabled={isCreating}
          loading={isCreating}
          fullWidth
        >
          Create New Wallet
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[900],
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
  },
  logoContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: palette.white,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: palette.gray[400],
    marginBottom: 40,
    textAlign: "center",
  },
});
