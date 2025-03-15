import React from "react";
import { View, StyleSheet, Image } from "react-native";

type RainbowLogoProps = {
  width?: number;
  style?: any;
};

export function RainbowLogo({ width = 40, style }: RainbowLogoProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../../assets/images/rainbow-logo.png")}
        style={{ width, height: width }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
});
