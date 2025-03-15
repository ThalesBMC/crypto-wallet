import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useInitializeWallet } from "./hooks/useInitializeWallet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PortalProvider } from "@gorhom/portal";

export default function Layout() {
  // Initialize wallet on app startup
  useInitializeWallet();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <PortalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                animation: "fade",
              }}
            />
            <Stack.Screen
              name="create"
              options={{
                animation: "fade",
              }}
            />
            <Stack.Screen
              name="seed-phrase"
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                animation: "fade",
              }}
            />
          </Stack>
        </PortalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
