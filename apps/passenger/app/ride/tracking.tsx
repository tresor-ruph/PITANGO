import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TrackingScreen() {
  const handleSos = () => {
    // TODO: Trigger SOS alert via Cloud Function
    // - Send position to emergency contacts
    // - Alert moderation console
    // - Accelerate GPS refresh to 2s
  };

  return (
    <View style={styles.container}>
      {/* TODO: Replace with MapView showing driver position */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Suivi en temps réel</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.driverName}>Chauffeur en approche</Text>
        <Text style={styles.eta}>ETA: -- min</Text>
      </View>

      <TouchableOpacity style={styles.sosButton} onPress={handleSos}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapPlaceholder: {
    flex: 1, backgroundColor: "#e8f4e8",
    justifyContent: "center", alignItems: "center",
  },
  mapText: { color: "#888", fontSize: 16 },
  infoCard: {
    position: "absolute", bottom: 120, left: 16, right: 16,
    backgroundColor: "#fff", borderRadius: 16, padding: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 5,
  },
  driverName: { fontSize: 18, fontWeight: "bold" },
  eta: { fontSize: 16, color: "#666", marginTop: 4 },
  sosButton: {
    position: "absolute", bottom: 40, alignSelf: "center",
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: "#e74c3c", justifyContent: "center", alignItems: "center",
    shadowColor: "#e74c3c", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8, elevation: 8,
  },
  sosText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
