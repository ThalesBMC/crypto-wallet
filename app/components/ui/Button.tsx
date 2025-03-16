import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Text } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "@/constants/Colors";

interface BaseButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

interface TextButtonProps extends BaseButtonProps {
  children: string;
}

interface IconButtonProps extends BaseButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

export const PrimaryButton: React.FC<TextButtonProps> = ({
  children,
  style,
  loading,
  disabled,
  fullWidth,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles.primaryButton,
        disabled && styles.buttonDisabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={palette.white} size="small" />
          <Text style={[styles.buttonText, styles.loadingText]}>
            Loading...
          </Text>
        </View>
      ) : (
        <Text style={[styles.buttonText]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export const SecondaryButton: React.FC<TextButtonProps> = ({
  children,
  style,
  disabled,
  fullWidth,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles.secondaryButton,
        disabled && styles.secondaryButtonDisabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.secondaryButtonText]}>{children}</Text>
    </TouchableOpacity>
  );
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 20,
  color,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.iconButton, style]} {...props}>
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: palette.pink[500],
  },
  secondaryButton: {
    backgroundColor: palette.white,
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 0, 122, 0.3)",
  },
  secondaryButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: palette.white,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.pink[500],
  },
  fullWidth: {
    width: "100%",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginLeft: 12,
  },
  iconButton: {
    padding: 4,
  },
});
