import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

type Plan = "daily" | "weekly";

export default function SubscriptionScreen() {
  const [plan, setPlan] = useState<Plan>("daily");

  const handleSubscribe = () => {
    // TODO: Initiate Mobile Money payment via Cloud Function
    router.replace("/onboarding/pending");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abonnement</Text>
      <Text style={styles.subtitle}>
        Choisissez votre forfait pour accéder aux demandes de course
      </Text>

      <TouchableOpacity
        style={[styles.planCard, plan === "daily" && styles.planSelected]}
        onPress={() => setPlan("daily")}
      >
        <Text style={styles.planName}>Forfait Journalier</Text>
        <Text style={styles.planPrice}>--- FCFA / jour</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.planCard, plan === "weekly" && styles.planSelected]}
        onPress={() => setPlan("weekly")}
      >
        <Text style={styles.planName}>Forfait Hebdomadaire</Text>
        <Text style={styles.planPrice}>--- FCFA / semaine</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
        <Text style={styles.buttonText}>Payer via Mobile Money</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 32, lineHeight: 22 },
  planCard: {
    borderWidth: 2, borderColor: "#eee", borderRadius: 16,
    padding: 20, marginBottom: 16,
  },
  planSelected: { borderColor: "#2ECC71", backgroundColor: "#f0faf4" },
  planName: { fontSize: 18, fontWeight: "600" },
  planPrice: { fontSize: 16, color: "#666", marginTop: 4 },
  button: {
    backgroundColor: "#2ECC71", borderRadius: 12,
    padding: 16, alignItems: "center", marginTop: 16,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
