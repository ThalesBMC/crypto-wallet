import { useEffect } from "react";

import { useWalletStore } from "../store/walletStore";

export const useInitializeWallet = () => {
  const { initializeWallet } = useWalletStore();

  useEffect(() => {
    initializeWallet();
  }, []);
};

export default useInitializeWallet;
