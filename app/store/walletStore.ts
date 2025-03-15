import { create } from "zustand";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { Wallet, ethers } from "ethers";
import * as SecureStore from "expo-secure-store";
import { Network } from "../config/networks";
import { NETWORKS } from "../config/networks";

// Vitalik's address for testing
const TEST_ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const BALANCES_STORAGE_KEY = "WALLET_BALANCES";

interface WalletState {
  address: string | null;
  selectedNetwork: Network | null;
  balances: { [networkId: string]: { [tokenAddress: string]: string } };
  isInitialized: boolean;
  isWalletCreated: boolean;
  isLoading: boolean;
  createWallet: () => Promise<{ seedPhrase: string }>;
  initializeWallet: () => Promise<void>;
  setSelectedNetwork: (network: Network) => void;
  updateBalance: (
    networkId: string,
    tokenAddress: string,
    balance: string
  ) => Promise<void>;
  loadCachedBalances: () => Promise<void>;
  importWallet: (seedPhrase: string) => Promise<void>;
  disconnect: () => Promise<void>;
}

const WALLET_ADDRESS_KEY = "WALLET_ADDRESS";
const ENCRYPTED_SEED_PHRASE_KEY = "ENCRYPTED_SEED_PHRASE";

const encryptSeedPhrase = async (seedPhrase: string): Promise<string> => {
  // In a production app, implement proper encryption here
  // This is a simplified version for demonstration
  return seedPhrase;
};

const decryptSeedPhrase = async (
  encryptedSeedPhrase: string
): Promise<string> => {
  // In a production app, implement proper decryption here
  // This is a simplified version for demonstration
  return encryptedSeedPhrase;
};

export const useWalletStore = create<WalletState>((set, get) => ({
  address: null,
  selectedNetwork: NETWORKS[0],
  balances: {},
  isInitialized: false,
  isWalletCreated: false,
  isLoading: true,

  initializeWallet: async () => {
    try {
      set({ isLoading: true });
      const savedAddress = await SecureStore.getItemAsync(WALLET_ADDRESS_KEY);
      const encryptedSeedPhrase = await SecureStore.getItemAsync(
        ENCRYPTED_SEED_PHRASE_KEY
      );

      if (savedAddress && encryptedSeedPhrase) {
        set({
          address: savedAddress,
          isInitialized: true,
          isWalletCreated: true,
          isLoading: false,
        });
        // Load cached balances after initializing
        await get().loadCachedBalances();
      } else {
        set({ isWalletCreated: false, isLoading: false });
      }
    } catch (error) {
      console.error("Failed to initialize wallet:", error);
      set({ isWalletCreated: false, isLoading: false });
    }
  },

  loadCachedBalances: async () => {
    try {
      const cachedBalances = await SecureStore.getItemAsync(
        BALANCES_STORAGE_KEY
      );
      if (cachedBalances) {
        set({ balances: JSON.parse(cachedBalances) });
      }
    } catch (error) {
      console.error("Failed to load cached balances:", error);
    }
  },

  createWallet: async () => {
    try {
      const wallet = Wallet.createRandom();
      const seedPhrase = wallet.mnemonic.phrase;

      const encryptedSeedPhrase = await encryptSeedPhrase(seedPhrase);
      await SecureStore.setItemAsync(
        ENCRYPTED_SEED_PHRASE_KEY,
        encryptedSeedPhrase
      );
      await SecureStore.setItemAsync(WALLET_ADDRESS_KEY, wallet.address);

      set({
        address: wallet.address,
        isInitialized: true,
        isWalletCreated: true,
      });

      return { seedPhrase };
    } catch (error) {
      console.error("Failed to create wallet:", error);
      throw new Error("Failed to create wallet");
    }
  },

  importWallet: async (seedPhrase: string) => {
    try {
      const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
      const encryptedSeedPhrase = await encryptSeedPhrase(seedPhrase);

      await SecureStore.setItemAsync(
        ENCRYPTED_SEED_PHRASE_KEY,
        encryptedSeedPhrase
      );
      await SecureStore.setItemAsync(WALLET_ADDRESS_KEY, wallet.address);

      set({
        address: wallet.address,
        isInitialized: true,
        isWalletCreated: true,
      });
    } catch (error) {
      console.error("Failed to import wallet:", error);
      throw new Error("Failed to import wallet");
    }
  },

  setSelectedNetwork: (network: Network) => {
    set({ selectedNetwork: network });
  },

  updateBalance: async (
    networkId: string,
    tokenAddress: string,
    balance: string
  ) => {
    set((state) => {
      const newBalances = {
        ...state.balances,
        [networkId]: {
          ...(state.balances[networkId] || {}),
          [tokenAddress]: balance,
        },
      };

      // Save to SecureStore
      SecureStore.setItemAsync(
        BALANCES_STORAGE_KEY,
        JSON.stringify(newBalances)
      ).catch((error) => console.error("Failed to save balances:", error));

      return { balances: newBalances };
    });
  },

  disconnect: async () => {
    try {
      set({ isLoading: true });
      await SecureStore.deleteItemAsync(WALLET_ADDRESS_KEY);
      await SecureStore.deleteItemAsync(ENCRYPTED_SEED_PHRASE_KEY);
      await SecureStore.deleteItemAsync(BALANCES_STORAGE_KEY);
      set({
        address: null,
        selectedNetwork: NETWORKS[0],
        balances: {},
        isInitialized: false,
        isWalletCreated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      set({ isLoading: false });
      throw new Error("Failed to disconnect wallet");
    }
  },
}));
