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

    const group = segments[0]; // "(auth)" | "(tabs)" | "ride" | undefined

    if (status === "unauthenticated" && group !== "(auth)") {
      router.replace("/(auth)/login");
    } else if (status === "needs_profile") {
      router.replace("/(auth)/profile-setup");
    } else if (status === "authenticated" && group === "(auth)") {
      router.replace("/(tabs)");
    }
  }, [status, segments]);

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
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
