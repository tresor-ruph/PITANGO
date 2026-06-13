import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");

  const handleSendOtp = () => {
    // TODO: Firebase Auth - send OTP
    router.push({ pathname: "/(auth)/otp", params: { phone } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pitango</Text>
      <Text style={styles.subtitle}>Votre taxi en un clic</Text>

      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone (ex: 6XX XXX XXX)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        maxLength={9}
      />

      <TouchableOpacity
        style={[styles.button, !phone && styles.buttonDisabled]}
        onPress={handleSendOtp}
        disabled={!phone}
      >
        <Text style={styles.buttonText}>Recevoir le code OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 36, fontWeight: "bold", textAlign: "center", color: "#F5A623" },
  subtitle: { fontSize: 16, textAlign: "center", color: "#666", marginBottom: 48 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 12,
    padding: 16, fontSize: 18, marginBottom: 16,
  },
  button: {
    backgroundColor: "#F5A623", borderRadius: 12,
    padding: 16, alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
