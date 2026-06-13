import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../../lib/auth";

export default function LoginScreen() {
  const { sendOtp } = useAuth();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const verificationId = await sendOtp(phone);
      router.push({ pathname: "/(auth)/otp", params: { phone, verificationId } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
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
        editable={!loading}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, (!phone || loading) && styles.buttonDisabled]}
        onPress={handleSendOtp}
        disabled={!phone || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Recevoir le code OTP</Text>
        )}
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
  error: { color: "#e74c3c", marginBottom: 12, textAlign: "center" },
  button: {
    backgroundColor: "#F5A623", borderRadius: 12,
    padding: 16, alignItems: "center", minHeight: 56, justifyContent: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
