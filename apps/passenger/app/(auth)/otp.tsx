import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState("");

  const handleVerify = () => {
    // TODO: Firebase Auth - verify OTP
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérification</Text>
      <Text style={styles.subtitle}>
        Entrez le code envoyé au {phone}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Code OTP"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
        maxLength={6}
        autoFocus
      />

      <TouchableOpacity
        style={[styles.button, code.length < 6 && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={code.length < 6}
      >
        <Text style={styles.buttonText}>Vérifier</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#666", marginBottom: 32 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 12,
    padding: 16, fontSize: 24, textAlign: "center", letterSpacing: 8, marginBottom: 16,
  },
  button: {
    backgroundColor: "#F5A623", borderRadius: 12,
    padding: 16, alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
