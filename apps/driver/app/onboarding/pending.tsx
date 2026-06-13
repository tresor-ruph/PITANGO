import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useAuth } from "../../lib/auth";
import { driverProfileService } from "../../lib/services";

export default function PendingScreen() {
  const { uid, refreshProfile, signOut } = useAuth();
  const [working, setWorking] = useState(false);

  // Dev helper: in production the admin web console flips this status.
  const simulateApproval = async () => {
    if (!uid) return;
    setWorking(true);
    await driverProfileService.update(uid, { verificationStatus: "verified" });
    await refreshProfile();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⏳</Text>
      <Text style={styles.title}>Dossier en cours de vérification</Text>
      <Text style={styles.subtitle}>
        L'équipe Pitango vérifie vos documents. Vous recevrez une notification dès
        que votre compte sera activé.
      </Text>

      <TouchableOpacity
        style={styles.devButton}
        onPress={simulateApproval}
        disabled={working}
      >
        <Text style={styles.devButtonText}>
          [Dev] Simuler l'approbation administrateur
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={signOut}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", padding: 24 },
  icon: { fontSize: 64, textAlign: "center", marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", lineHeight: 24 },
  devButton: {
    marginTop: 48, padding: 14, borderRadius: 12,
    borderWidth: 1, borderColor: "#2ECC71", borderStyle: "dashed", alignItems: "center",
  },
  devButtonText: { color: "#2ECC71", fontSize: 14, fontWeight: "600" },
  logout: { marginTop: 16, padding: 14, alignItems: "center" },
  logoutText: { color: "#999", fontSize: 14 },
});
