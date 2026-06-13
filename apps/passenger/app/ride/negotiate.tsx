import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function NegotiateScreen() {
  const [price, setPrice] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marchander</Text>
      <Text style={styles.subtitle}>Proposez votre tarif en FCFA</Text>

      <TextInput
        style={styles.priceInput}
        placeholder="1500"
        keyboardType="number-pad"
        value={price}
        onChangeText={setPrice}
        autoFocus
      />
      <Text style={styles.currency}>FCFA</Text>

      <TouchableOpacity
        style={[styles.button, !price && styles.buttonDisabled]}
        onPress={() => {
          // TODO: Create ride session in Firebase Realtime DB
          router.push("/ride/tracking");
        }}
        disabled={!price}
      >
        <Text style={styles.buttonText}>Envoyer l'offre</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        Les chauffeurs à proximité recevront votre offre et pourront accepter ou contre-proposer.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 32 },
  priceInput: {
    fontSize: 48, fontWeight: "bold", textAlign: "center",
    borderBottomWidth: 2, borderColor: "#F5A623", paddingBottom: 8, marginBottom: 4,
  },
  currency: { fontSize: 18, color: "#999", textAlign: "center", marginBottom: 32 },
  button: {
    backgroundColor: "#F5A623", borderRadius: 12,
    padding: 16, alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  hint: { fontSize: 14, color: "#999", textAlign: "center", marginTop: 24, lineHeight: 20 },
});
