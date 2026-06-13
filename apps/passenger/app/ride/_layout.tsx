import { Stack } from "expo-router";

export default function RideLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="search" />
      <Stack.Screen name="negotiate" />
      <Stack.Screen name="tracking" />
    </Stack>
  );
}
