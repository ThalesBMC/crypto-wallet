import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text } from "./Themed";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { WalletKey, WalletAddresses } from "../config/wallets";
import { palette, colors } from "@/app/constants/Colors";
import { getWalletName } from "../utils/wallet";
import { formatAddress } from "../utils/formatAddress";

interface WalletSelectorProps {
  selectedWallet: WalletKey;
  onSelectWallet: (walletId: WalletKey) => void;
  wallets: WalletAddresses;
}

export const WalletSelector = ({
  selectedWallet,
  onSelectWallet,
  wallets,
}: WalletSelectorProps) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const handlePresentPress = useCallback(() => {
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

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={handlePresentPress}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getWalletName(selectedWallet).charAt(0)}
          </Text>
        </View>
        <View style={styles.walletInfo}>
          <Text style={styles.walletName}>{getWalletName(selectedWallet)}</Text>
          <Text style={styles.walletAddress}>
            {formatAddress(wallets[selectedWallet])}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color={palette.white} />
      </TouchableOpacity>

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
              <Text style={styles.modalTitle}>Select Wallet</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={palette.white} />
              </TouchableOpacity>
            </View>

            {(Object.entries(wallets) as [WalletKey, string][]).map(
              ([id, address]) => (
                <TouchableOpacity
                  key={id}
                  style={[
                    styles.walletItem,
                    selectedWallet === id && styles.selectedWallet,
                  ]}
                  onPress={() => {
                    onSelectWallet(id);
                    handleClose();
                  }}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {getWalletName(id).charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>{getWalletName(id)}</Text>
                    <Text style={styles.walletAddress}>
                      {formatAddress(address)}
                    </Text>
                  </View>
                  {selectedWallet === id && (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color={palette.pink[500]}
                    />
                  )}
                </TouchableOpacity>
              )
            )}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.dark.walletSelectorBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark.walletSelectorAvatar,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark.walletSelectorText,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: colors.dark.walletSelectorText,
  },
  walletAddress: {
    fontSize: 12,
    color: colors.dark.walletSelectorAddressText,
  },
  bottomSheetBackground: {
    backgroundColor: colors.dark.walletSelectorBottomSheet,
  },
  bottomSheetIndicator: {
    backgroundColor: colors.dark.walletSelectorBottomSheetIndicator,
    width: 40,
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.dark.walletSelectorBottomSheet,
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
    color: colors.dark.walletSelectorText,
  },
  closeButton: {
    padding: 4,
  },
  walletItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedWallet: {
    backgroundColor: colors.dark.walletSelectorSelectedBackground,
  },
});

export default WalletSelector;
