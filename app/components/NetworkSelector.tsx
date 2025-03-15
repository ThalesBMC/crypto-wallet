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
import { Network } from "../config/networks";

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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  networkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  networkIconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  networkInfo: {
    flex: 1,
  },
  networkName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#fff",
  },
  chainId: {
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
  networkItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedNetwork: {
    backgroundColor: "rgba(79, 70, 229, 0.1)",
  },
});
