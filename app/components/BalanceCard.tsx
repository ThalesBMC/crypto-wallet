import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Share, Alert } from "react-native";
import { Text } from "./Themed";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RainbowLogo } from "./RainbowLogo";

interface BalanceCardProps {
  balance: string;
  address: string;
  change: number;
  onDeleteWallet: () => void;
}

export const BalanceCard = ({
  balance,
  address,
  change,
  onDeleteWallet,
}: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  const handlePresentReceive = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.7}
      />
    ),
    []
  );

  const handleSend = () => {
    Toast.show({
      type: "info",
      text1: "Coming Soon",
      text2: "Send functionality will be available soon!",
    });
  };

  const handleCopyAddress = async () => {
    await Clipboard.setStringAsync(address);
    Toast.show({
      type: "success",
      text1: "Address copied to clipboard",
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My wallet address: ${address}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteWallet = () => {
    Alert.alert(
      "Delete Wallet",
      "Are you sure you want to delete this wallet? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDeleteWallet,
          style: "destructive",
        },
      ]
    );
  };

  return (
    <>
      <LinearGradient
        colors={["#FF007A", "#C800FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <RainbowLogo />
            <Text style={styles.label}>Total Balance</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => setShowBalance(!showBalance)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showBalance ? "eye-off" : "eye"}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteWallet}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.balance}>{showBalance ? balance : "••••••••"}</Text>

        <View style={styles.changeContainer}>
          <Text style={styles.changeText}>
            {change >= 0 ? "+" : ""}
            {change}% today
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handlePresentReceive}
          >
            <Ionicons name="arrow-down" size={20} color="#FF007A" />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleSend}>
            <Ionicons name="arrow-up" size={20} color="#FF007A" />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}
        >
          <BottomSheetView
            style={[styles.modalContent, { paddingBottom: insets.bottom }]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Receive</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.addressLabel}>Your Wallet Address</Text>
            <TouchableOpacity
              style={styles.addressContainer}
              onPress={handleCopyAddress}
            >
              <Text style={styles.address}>{address}</Text>
              <Ionicons name="copy-outline" size={20} color="#FF007A" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={20} color="#fff" />
              <Text style={styles.shareButtonText}>Share Address</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  eyeButton: {
    padding: 4,
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  changeContainer: {
    marginBottom: 20,
  },
  changeText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 100,
    gap: 8,
  },
  actionText: {
    color: "#FF007A",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSheetBackground: {
    backgroundColor: "#1a1a1a",
  },
  bottomSheetIndicator: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 40,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    padding: 4,
  },
  addressLabel: {
    fontSize: 14,
    color: "#a0a0a0",
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginBottom: 16,
  },
  address: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    fontFamily: "monospace",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF007A",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deleteButton: {
    padding: 4,
  },
});
