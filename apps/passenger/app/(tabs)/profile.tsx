import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../lib/auth";

export default function ProfileScreen() {
  const { profile, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>
      {profile && (
        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Contacts de confiance</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Gérer mes contacts SOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Paiement</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Mode de paiement par défaut</Text>
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
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  name: { fontSize: 18, color: "#666", marginBottom: 32 },
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
