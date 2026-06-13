import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function SearchScreen() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Itinéraire</Text>

      <TextInput
        style={styles.input}
        placeholder="Point de départ"
        value={pickup}
        onChangeText={setPickup}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={dropoff}
        onChangeText={setDropoff}
        autoFocus
      />

      <TouchableOpacity
        style={[styles.button, (!pickup || !dropoff) && styles.buttonDisabled]}
        onPress={() => router.push("/ride/negotiate")}
        disabled={!pickup || !dropoff}
      >
        <Text style={styles.buttonText}>Proposer un prix</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 60 },
  backButton: { marginBottom: 16 },
  backText: { fontSize: 16, color: "#F5A623" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 12,
    padding: 16, fontSize: 16, marginBottom: 12,
  },
  button: {
    backgroundColor: "#F5A623", borderRadius: 12,
    padding: 16, alignItems: "center", marginTop: 12,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
