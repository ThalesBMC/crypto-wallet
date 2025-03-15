import React, { useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

interface WalletSelectorProps {
  selectedWallet: string;
  onSelectWallet: (walletId: string) => void;
  wallets: {
    [key: string]: string;
  };
}
const WALLET_NAME_MAP: { [key: string]: string } = {
  "my-wallet": "My Wallet",
  vitalik: "Vitalik",
  "cz-binance": "CZ Binance",
};

const getWalletName = (id: string) => {
  return WALLET_NAME_MAP[id] || "Unknown Wallet";
};

const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

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

  const selectedWalletName = getWalletName(selectedWallet);
  const selectedWalletAddress = wallets[selectedWallet];

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={handlePresentPress}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{selectedWalletName.charAt(0)}</Text>
        </View>
        <View style={styles.walletInfo}>
          <Text style={styles.walletName}>{selectedWalletName}</Text>
          <Text style={styles.walletAddress}>
            {formatAddress(selectedWalletAddress)}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#fff" />
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
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {Object.entries(wallets).map(([id, address]) => (
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
                  <Ionicons name="checkmark" size={24} color="#FF007A" />
                )}
              </TouchableOpacity>
            ))}
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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF007A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#fff",
  },
  walletAddress: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
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
  walletItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedWallet: {
    backgroundColor: "rgba(255, 0, 122, 0.1)",
  },
});
