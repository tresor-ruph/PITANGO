import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../lib/auth";

export default function DriverOtpScreen() {
  const { phone, verificationId } = useLocalSearchParams<{
    phone: string;
    verificationId: string;
  }>();
  const { verifyOtp } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    try {
      await verifyOtp(verificationId, code);
      // Navigation handled by the root route guard once status updates.
    } catch (e) {
      setError(e instanceof Error ? e.message : "Code invalide.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérification</Text>
      <Text style={styles.subtitle}>Entrez le code envoyé au {phone}</Text>

      <TextInput
        style={styles.input}
        placeholder="------"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
        maxLength={6}
        autoFocus
        editable={!loading}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, (code.length < 6 || loading) && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={code.length < 6 || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Vérifier</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.hint}>Code de test : 123456</Text>
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
  error: { color: "#e74c3c", marginBottom: 12, textAlign: "center" },
  button: {
    backgroundColor: "#2ECC71", borderRadius: 12,
    padding: 16, alignItems: "center", minHeight: 56, justifyContent: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  hint: { fontSize: 13, color: "#bbb", textAlign: "center", marginTop: 24 },
});
