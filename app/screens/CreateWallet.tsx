import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import { Text } from "../components/Themed";
import { useWalletStore } from "../store/walletStore";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RainbowLogo } from "../components/RainbowLogo";

export default function CreateWallet() {
  const { createWallet } = useWalletStore();
  const [isCreating, setIsCreating] = useState(false);
  const insets = useSafeAreaInsets();
  const handleCreateWallet = async () => {
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
    }, 1000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BlurView intensity={70} style={styles.blurContainer}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <RainbowLogo width={160} color="#ffffff" />
          </View>
          <Text style={styles.title}>Welcome to Rainbow</Text>
          <Text style={styles.subtitle}>
            Your gateway to the decentralized world
          </Text>

          <TouchableOpacity
            style={[styles.button, isCreating && styles.buttonDisabled]}
            onPress={handleCreateWallet}
            disabled={isCreating}
          >
            {isCreating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#ffffff" size="small" />
                <Text style={[styles.buttonText, styles.loadingText]}>
                  Creating Wallet...
                </Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Create New Wallet</Text>
            )}
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  blurContainer: {
    flex: 1,
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
    color: "#ffffff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF007A",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 0, 122, 0.3)",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginLeft: 12,
  },
});
