import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../lib/auth";

export default function DriverProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Abonnement</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Gérer mon forfait</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Documents</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Mes pièces justificatives</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Véhicule</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Informations du véhicule</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 32 },
  section: { marginBottom: 24 },
  label: { fontSize: 14, color: "#999", marginBottom: 8, textTransform: "uppercase" },
  row: {
    backgroundColor: "#f9f9f9", borderRadius: 12, padding: 16, marginBottom: 8,
  },
  rowText: { fontSize: 16 },
  logoutButton: {
    marginTop: 40, padding: 16, borderRadius: 12,
    borderWidth: 1, borderColor: "#e74c3c", alignItems: "center",
  },
  logoutText: { color: "#e74c3c", fontSize: 16, fontWeight: "600" },
});
