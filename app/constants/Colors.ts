const palette = {
  pink: {
    50: "#FFF1F8",
    100: "#FFE4F0",
    200: "#FFB8DA",
    300: "#FF8CC4",
    400: "#FF60AE",
    500: "#FF007A",
    600: "#CC0062",
    700: "#99004A",
    800: "#660031",
    900: "#330019",
  },
  purple: {
    50: "#F9F1FF",
    100: "#F4E4FF",
    200: "#E3B8FF",
    300: "#D28CFF",
    400: "#C160FF",
    500: "#C800FF",
    600: "#A000CC",
    700: "#780099",
    800: "#500066",
    900: "#280033",
  },
  indigo: {
    50: "#F1F2FF",
    100: "#E4E6FF",
    200: "#B8BCFF",
    300: "#8C93FF",
    400: "#6069FF",
    500: "#4F46E5",
    600: "#3F38B8",
    700: "#2F2A8A",
    800: "#1F1C5C",
    900: "#100E2E",
  },

  gray: {
    50: "#F7F7F7",
    100: "#E6E6E6",
    200: "#CCCCCC",
    300: "#B3B3B3",
    400: "#999999",
    500: "#808080",
    600: "#666666",
    700: "#4D4D4D",
    800: "#333333",
    900: "#1A1A1A",
  },

  success: {
    light: "#22c55e",
    dark: "#4ade80",
  },
  error: {
    light: "#ef4444",
    dark: "#f87171",
  },
  warning: {
    light: "#f59e0b",
    dark: "#fbbf24",
  },

  white: "#FFFFFF",
  black: "#000000",
};

export type ColorTheme = {
  text: string;
  background: string;
  backgroundSecondary: string;

  primary: string;
  primaryLight: string;
  primaryDark: string;

  surface: string;
  surfaceHover: string;
  surfaceActive: string;
  border: string;

  success: string;
  error: string;
  warning: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  seedPhraseBackground: string;
  seedPhraseBottomBackground: string;
  seedPhraseWordBackground: string;
  seedPhraseToggleBackground: string;
  seedPhraseWordNumber: string;

  walletSelectorBackground: string;
  walletSelectorAvatar: string;
  walletSelectorText: string;
  walletSelectorAddressText: string;
  walletSelectorBottomSheet: string;
  walletSelectorBottomSheetIndicator: string;
  walletSelectorSelectedBackground: string;

  tokenListBackground: string;
  tokenListBorder: string;
  tokenListSortButton: string;
  tokenListSortMenu: string;
  tokenListTokenIcon: string;
  tokenListMutedText: string;

  balanceCardText: string;
  balanceCardMutedText: string;
  balanceCardBackground: string;
  balanceCardAddressBackground: string;

  networkSelectorBackground: string;
  networkSelectorIcon: string;
  networkSelectorText: string;
  networkSelectorMutedText: string;
  networkSelectorBottomSheet: string;
  networkSelectorSelectedBackground: string;

  buttonPrimaryBackground: string;
  buttonPrimaryText: string;
  buttonPrimaryDisabled: string;
  buttonSecondaryBackground: string;
  buttonSecondaryText: string;
  buttonSecondaryDisabled: string;
  buttonIcon: string;
  buttonLoadingText: string;
};

export type Colors = {
  light: ColorTheme;
  dark: ColorTheme;
};

export const colors: Colors = {
  light: {
    text: palette.gray[900],
    background: palette.white,
    backgroundSecondary: palette.gray[50],

    primary: palette.pink[500],
    primaryLight: palette.pink[400],
    primaryDark: palette.pink[600],

    surface: palette.white,
    surfaceHover: palette.gray[50],
    surfaceActive: palette.gray[100],
    border: palette.gray[200],

    success: palette.success.light,
    error: palette.error.light,
    warning: palette.warning.light,

    textPrimary: palette.gray[900],
    textSecondary: palette.gray[700],
    textMuted: palette.gray[500],
    textInverse: palette.white,

    seedPhraseBackground: palette.white,
    seedPhraseBottomBackground: "rgba(26, 26, 26, 0.8)",
    seedPhraseWordBackground: "rgba(255, 255, 255, 0.05)",
    seedPhraseToggleBackground: "rgba(255, 0, 122, 0.1)",
    seedPhraseWordNumber: palette.pink[500],

    walletSelectorBackground: "rgba(26, 26, 26, 0.05)",
    walletSelectorAvatar: palette.pink[500],
    walletSelectorText: palette.gray[900],
    walletSelectorAddressText: "rgba(26, 26, 26, 0.7)",
    walletSelectorBottomSheet: palette.white,
    walletSelectorBottomSheetIndicator: "rgba(26, 26, 26, 0.5)",
    walletSelectorSelectedBackground: "rgba(255, 0, 122, 0.1)",

    tokenListBackground: "rgba(26, 26, 26, 0.05)",
    tokenListBorder: "rgba(26, 26, 26, 0.1)",
    tokenListSortButton: "rgba(26, 26, 26, 0.1)",
    tokenListSortMenu: palette.gray[100],
    tokenListTokenIcon: palette.pink[500],
    tokenListMutedText: palette.gray[500],

    balanceCardText: palette.gray[900],
    balanceCardMutedText: "rgba(26, 26, 26, 0.7)",
    balanceCardBackground: palette.white,
    balanceCardAddressBackground: "rgba(26, 26, 26, 0.05)",

    networkSelectorBackground: "rgba(26, 26, 26, 0.05)",
    networkSelectorIcon: palette.indigo[500],
    networkSelectorText: palette.gray[900],
    networkSelectorMutedText: "rgba(26, 26, 26, 0.7)",
    networkSelectorBottomSheet: palette.white,
    networkSelectorSelectedBackground: "rgba(79, 70, 229, 0.1)",

    buttonPrimaryBackground: palette.pink[500],
    buttonPrimaryText: palette.white,
    buttonPrimaryDisabled: "rgba(255, 0, 122, 0.3)",
    buttonSecondaryBackground: palette.white,
    buttonSecondaryText: palette.pink[500],
    buttonSecondaryDisabled: "rgba(255, 255, 255, 0.3)",
    buttonIcon: palette.gray[900],
    buttonLoadingText: palette.white,
  },
  dark: {
    text: palette.gray[50],
    background: palette.gray[900],
    backgroundSecondary: palette.gray[800],

    primary: palette.pink[500],
    primaryLight: palette.pink[400],
    primaryDark: palette.pink[600],

    surface: palette.gray[800],
    surfaceHover: palette.gray[700],
    surfaceActive: palette.gray[600],
    border: palette.gray[700],

    success: palette.success.dark,
    error: palette.error.dark,
    warning: palette.warning.dark,

    textPrimary: palette.gray[50],
    textSecondary: palette.gray[300],
    textMuted: palette.gray[500],
    textInverse: palette.gray[900],

    seedPhraseBackground: palette.gray[900],
    seedPhraseBottomBackground: "rgba(26, 26, 26, 0.8)",
    seedPhraseWordBackground: "rgba(255, 255, 255, 0.05)",
    seedPhraseToggleBackground: "rgba(255, 0, 122, 0.1)",
    seedPhraseWordNumber: palette.pink[500],

    walletSelectorBackground: "rgba(255, 255, 255, 0.05)",
    walletSelectorAvatar: palette.pink[500],
    walletSelectorText: palette.white,
    walletSelectorAddressText: "rgba(255, 255, 255, 0.7)",
    walletSelectorBottomSheet: palette.gray[900],
    walletSelectorBottomSheetIndicator: "rgba(255, 255, 255, 0.5)",
    walletSelectorSelectedBackground: "rgba(255, 0, 122, 0.1)",

    tokenListBackground: "rgba(255, 255, 255, 0.05)",
    tokenListBorder: "rgba(255, 255, 255, 0.1)",
    tokenListSortButton: "rgba(255, 255, 255, 0.1)",
    tokenListSortMenu: palette.gray[800],
    tokenListTokenIcon: palette.pink[500],
    tokenListMutedText: palette.gray[500],

    balanceCardText: palette.white,
    balanceCardMutedText: "rgba(255, 255, 255, 0.7)",
    balanceCardBackground: palette.gray[900],
    balanceCardAddressBackground: "rgba(255, 255, 255, 0.05)",

    networkSelectorBackground: "rgba(255, 255, 255, 0.05)",
    networkSelectorIcon: palette.indigo[500],
    networkSelectorText: palette.white,
    networkSelectorMutedText: "rgba(255, 255, 255, 0.7)",
    networkSelectorBottomSheet: palette.gray[900],
    networkSelectorSelectedBackground: "rgba(79, 70, 229, 0.1)",

    buttonPrimaryBackground: palette.pink[500],
    buttonPrimaryText: palette.white,
    buttonPrimaryDisabled: "rgba(255, 0, 122, 0.3)",
    buttonSecondaryBackground: palette.white,
    buttonSecondaryText: palette.pink[500],
    buttonSecondaryDisabled: "rgba(255, 255, 255, 0.3)",
    buttonIcon: palette.white,
    buttonLoadingText: palette.white,
  },
};

export { palette };
