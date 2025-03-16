import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "../components/Themed";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette, colors } from "@/app/constants/Colors";
import { PrimaryButton } from "../components/ui/Button";

export default function SeedPhrase() {
  const params = useLocalSearchParams<{ seedPhrase: string }>();
  const [isVisible, setIsVisible] = useState(false);

  const handleContinue = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push("/wallet");
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const words = params.seedPhrase?.split(" ") || [];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Your Seed Phrase</Text>
          <Text style={styles.subtitle}>
            Write these words down in order and keep them safe. Never share them
            with anyone.
          </Text>

          <TouchableOpacity
            style={styles.visibilityToggle}
            onPress={toggleVisibility}
          >
            <MaterialIcons
              name={isVisible ? "visibility" : "visibility-off"}
              size={24}
              color={palette.pink[500]}
            />
            <Text style={styles.toggleText}>
              {isVisible ? "Hide Seed Phrase" : "Show Seed Phrase"}
            </Text>
          </TouchableOpacity>
        </View>

        {isVisible && (
          <View style={styles.seedPhraseContainer}>
            {words.map((word, index) => (
              <View key={index} style={styles.wordContainer}>
                <Text style={styles.wordNumber}>
                  {(index + 1).toString().padStart(2, "0")}
                </Text>
                <Text style={styles.word}>{word}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.bottomContainer}>
        <PrimaryButton onPress={handleContinue} disabled={!isVisible} fullWidth>
          I've Saved My Seed Phrase
        </PrimaryButton>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.seedPhraseBackground,
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: palette.white,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: palette.gray[400],
    marginBottom: 24,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  visibilityToggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.dark.seedPhraseToggleBackground,
    borderRadius: 12,
  },
  toggleText: {
    color: palette.pink[500],
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  seedPhraseContainer: {
    backgroundColor: colors.dark.seedPhraseWordBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  wordContainer: {
    flexDirection: "row",
    width: "45%",
    backgroundColor: colors.dark.seedPhraseWordBackground,
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  wordNumber: {
    color: colors.dark.seedPhraseWordNumber,
    marginRight: 8,
    fontSize: 14,
    fontWeight: "600",
    width: 24,
  },
  word: {
    color: palette.white,
    fontSize: 16,
    fontWeight: "600",
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: colors.dark.seedPhraseBottomBackground,
  },
});
