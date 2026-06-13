import { View, Text, StyleSheet } from "react-native";

export default function EarningsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revenus</Text>
      <View style={styles.card}>
        <Text style={styles.amount}>0 FCFA</Text>
        <Text style={styles.period}>Aujourd'hui</Text>
      </View>
      <Text style={styles.empty}>Aucune course effectuée</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  card: {
    backgroundColor: "#f0faf4", borderRadius: 16, padding: 24,
    alignItems: "center", marginBottom: 24,
  },
  amount: { fontSize: 36, fontWeight: "bold", color: "#2ECC71" },
  period: { fontSize: 16, color: "#666", marginTop: 4 },
  empty: { color: "#999", fontSize: 16, textAlign: "center", marginTop: 20 },
});
