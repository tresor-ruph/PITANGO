import { View, Text, StyleSheet } from "react-native";

export default function PendingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⏳</Text>
      <Text style={styles.title}>Dossier en cours de vérification</Text>
      <Text style={styles.subtitle}>
        L'équipe Pitango vérifie vos documents. Vous recevrez une notification dès que votre compte sera activé.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", padding: 24 },
  icon: { fontSize: 64, textAlign: "center", marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", lineHeight: 24 },
});
