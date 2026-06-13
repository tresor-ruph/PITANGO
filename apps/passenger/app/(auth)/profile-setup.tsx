import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../../lib/auth";

export default function ProfileSetupScreen() {
  const { completeProfile } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setLoading(true);
    setError(null);
    try {
      await completeProfile(firstName.trim(), lastName.trim());
      // Root route guard redirects to tabs once status becomes authenticated.
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer votre profil</Text>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
        editable={!loading}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[
          styles.button,
          (!firstName || !lastName || loading) && styles.buttonDisabled,
        ]}
        onPress={handleComplete}
        disabled={!firstName || !lastName || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continuer</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 32 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 12,
    padding: 16, fontSize: 16, marginBottom: 16,
  },
  error: { color: "#e74c3c", marginBottom: 12, textAlign: "center" },
  button: {
    backgroundColor: "#F5A623", borderRadius: 12,
    padding: 16, alignItems: "center", minHeight: 56, justifyContent: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
