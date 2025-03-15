import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "../components/Themed";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <BlurView intensity={70} style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Your Seed Phrase</Text>
            <Text style={styles.subtitle}>
              Write these words down in order and keep them safe. Never share
              them with anyone.
            </Text>

            <TouchableOpacity
              style={styles.visibilityToggle}
              onPress={toggleVisibility}
            >
              <MaterialIcons
                name={isVisible ? "visibility" : "visibility-off"}
                size={24}
                color="#FF007A"
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
          <TouchableOpacity
            style={[styles.button, !isVisible && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={!isVisible}
          >
            <Text style={styles.buttonText}>I've Saved My Seed Phrase</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
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
    color: "#ffffff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    marginBottom: 24,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  visibilityToggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(255, 0, 122, 0.1)",
    borderRadius: 12,
  },
  toggleText: {
    color: "#FF007A",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  seedPhraseContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  wordNumber: {
    color: "#FF007A",
    marginRight: 8,
    fontSize: 14,
    fontWeight: "600",
    width: 24,
  },
  word: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: "rgba(26, 26, 26, 0.8)",
  },
  button: {
    backgroundColor: "#FF007A",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 0, 122, 0.3)",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
