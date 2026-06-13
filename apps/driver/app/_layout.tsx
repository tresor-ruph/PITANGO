import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../lib/auth";

function RootNavigator() {
  const { status } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const group = segments[0]; // "(auth)" | "onboarding" | "(tabs)" | "ride"

    if (status === "unauthenticated") {
      if (group !== "(auth)") router.replace("/(auth)/login");
    } else if (status === "needs_documents") {
      if (group !== "onboarding") router.replace("/onboarding/documents");
    } else if (status === "pending_verification") {
      router.replace("/onboarding/pending");
    } else if (status === "verified" && group !== "(tabs)" && group !== "ride") {
      router.replace("/(tabs)");
    }
  }, [status, segments]);

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2ECC71" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="ride" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
});
