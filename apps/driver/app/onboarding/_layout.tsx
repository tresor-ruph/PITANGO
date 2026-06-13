import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="documents" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="pending" />
    </Stack>
  );
}
