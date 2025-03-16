import { WalletKey } from "../config/wallets";

export const WALLET_NAME_MAP: Record<WalletKey, string> = {
  "my-wallet": "My Wallet",
  vitalik: "Vitalik.eth",
  "cz-binance": "CZ Binance",
};

export const getWalletName = (id: WalletKey): string => {
  return WALLET_NAME_MAP[id] || "Unknown Wallet";
};
