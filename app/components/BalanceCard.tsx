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
import { colors, palette } from "../constants/Colors";

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
        colors={[palette.pink[500], palette.purple[500]]}
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
                name={showBalance ? "eye" : "eye-off"}
                size={20}
                color={palette.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteWallet}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={20} color={palette.white} />
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
            <Ionicons name="arrow-down" size={20} color={palette.pink[500]} />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleSend}>
            <Ionicons name="arrow-up" size={20} color={palette.pink[500]} />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
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
                <Ionicons name="close" size={24} color={palette.white} />
              </TouchableOpacity>
            </View>

            <Text style={styles.addressLabel}>Your Wallet Address</Text>
            <TouchableOpacity
              style={styles.addressContainer}
              onPress={handleCopyAddress}
            >
              <Text style={styles.address}>{address}</Text>
              <Ionicons
                name="copy-outline"
                size={20}
                color={palette.pink[500]}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={20} color={palette.white} />
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
    color: colors.dark.balanceCardMutedText,
  },
  eyeButton: {
    padding: 4,
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: palette.white,
    marginBottom: 8,
  },
  changeContainer: {
    marginBottom: 20,
  },
  changeText: {
    fontSize: 14,
    color: colors.dark.balanceCardMutedText,
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
    backgroundColor: palette.white,
    padding: 12,
    borderRadius: 100,
    gap: 8,
  },
  actionText: {
    color: palette.pink[500],
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSheetBackground: {
    backgroundColor: palette.gray[900],
  },
  bottomSheetIndicator: {
    backgroundColor: colors.dark.walletSelectorBottomSheetIndicator,
    width: 40,
  },
  modalContent: {
    flex: 1,
    backgroundColor: palette.gray[900],
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
    color: palette.white,
  },
  closeButton: {
    padding: 4,
  },
  addressLabel: {
    fontSize: 14,
    color: palette.gray[400],
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.balanceCardAddressBackground,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginBottom: 16,
  },
  address: {
    flex: 1,
    fontSize: 16,
    color: palette.white,
    fontFamily: "monospace",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.pink[500],
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  shareButtonText: {
    color: palette.white,
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

export default BalanceCard;
