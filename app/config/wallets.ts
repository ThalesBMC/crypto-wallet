export type WalletKey = "my-wallet" | "vitalik" | "cz-binance";

export type WalletAddresses = {
  [K in WalletKey]: string;
};

export const WALLETS: WalletAddresses = {
  "my-wallet": "",
  vitalik: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "cz-binance": "0xF977814e90dA44bFA03b6295A0616a897441aceC",
};
