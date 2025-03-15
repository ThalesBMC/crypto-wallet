import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useWalletStore } from "../store/walletStore";

const WALLET_ADDRESS_KEY = "WALLET_ADDRESS";

export function useInitializeWallet() {
  const { initializeWallet } = useWalletStore();

  useEffect(() => {
    initializeWallet();
  }, []);
}
