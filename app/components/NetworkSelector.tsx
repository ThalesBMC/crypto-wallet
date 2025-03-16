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
import { Network } from "@/types/network/Network";
import { colors } from "@/constants/Colors";

interface NetworkSelectorProps {
  selectedNetwork: Network;
  onSelectNetwork: (network: Network) => void;
  networks: Network[];
}

export const NetworkSelector = ({
  selectedNetwork,
  onSelectNetwork,
  networks,
}: NetworkSelectorProps) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const handlePresentPress = useCallback(() => {
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

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={handlePresentPress}>
        <View style={styles.networkIcon}>
          <Text style={styles.networkIconText}>
            {selectedNetwork.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.networkInfo}>
          <Text style={styles.networkName}>{selectedNetwork.name}</Text>
          <Text style={styles.chainId}>
            Chain ID: {selectedNetwork.chainId}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#fff" />
      </TouchableOpacity>

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
              <Text style={styles.modalTitle}>Select Network</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {networks.map((network) => (
              <TouchableOpacity
                key={network.id}
                style={[
                  styles.networkItem,
                  selectedNetwork.id === network.id && styles.selectedNetwork,
                ]}
                onPress={() => {
                  onSelectNetwork(network);
                  handleClose();
                }}
              >
                <View style={styles.networkIcon}>
                  <Text style={styles.networkIconText}>
                    {network.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.networkInfo}>
                  <Text style={styles.networkName}>{network.name}</Text>
                  <Text style={styles.chainId}>
                    Chain ID: {network.chainId}
                  </Text>
                </View>
                {selectedNetwork.id === network.id && (
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
    backgroundColor: colors.dark.networkSelectorBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  networkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark.networkSelectorIcon,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  networkIconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark.networkSelectorText,
  },
  networkInfo: {
    flex: 1,
  },
  networkName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: colors.dark.networkSelectorText,
  },
  chainId: {
    fontSize: 12,
    color: colors.dark.networkSelectorMutedText,
  },
  bottomSheetBackground: {
    backgroundColor: colors.dark.networkSelectorBottomSheet,
  },
  bottomSheetIndicator: {
    backgroundColor: colors.dark.walletSelectorBottomSheetIndicator,
    width: 40,
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.dark.networkSelectorBottomSheet,
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
    color: colors.dark.networkSelectorText,
  },
  closeButton: {
    padding: 4,
  },
  networkItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedNetwork: {
    backgroundColor: colors.dark.networkSelectorSelectedBackground,
  },
});

export default NetworkSelector;
