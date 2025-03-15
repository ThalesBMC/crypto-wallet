# Rainbow Wallet Demo

A simple yet powerful cryptocurrency wallet demo showcasing wallet creation, management, and token balance viewing capabilities across multiple networks.

## Features

- Secure wallet creation with seed phrase backup
- Support for Base and Polygon networks
- View top 5 most common tokens per network
- Clean and modern UI with dark theme
- Offline-capable with local storage of wallet data
- Extensible architecture for adding new networks

## Tech Stack

- React Native / Expo
- TypeScript
- Ethers.js for wallet functionality
- Zustand for state management
- Expo SecureStore for secure storage
- Expo Router for navigation

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm start
```

3. Run on iOS or Android:

```bash
pnpm ios
# or
pnpm android
```

## Project Structure

```
/app
  ├── /screens          # Main screen components
  ├── /components      # Reusable UI components
  ├── /store          # Zustand state management
  ├── /config         # Network and token configurations
  └── /services       # Wallet and network services
```

## Security Features

- Seed phrases are encrypted and stored securely using Expo SecureStore
- No cloud storage of sensitive data
- All wallet operations are performed locally
- Network requests only for reading blockchain data

## Supported Networks

### Base

- DAI
- WETH
- USDbC
- COMP
- USDT

### Polygon

- WMATIC
- WETH
- USDC
- USDT
- WBTC

## Contributing

Feel free to submit issues and enhancement requests!
