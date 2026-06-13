import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function DriverHomeScreen() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <View style={styles.container}>
      {/* TODO: Replace with MapView showing current position */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Carte - Position actuelle</Text>
      </View>

      <View style={styles.statusBar}>
        <TouchableOpacity
          style={[styles.toggleButton, isOnline && styles.toggleOnline]}
          onPress={() => setIsOnline(!isOnline)}
        >
          <Text style={styles.toggleText}>
            {isOnline ? "En ligne" : "Hors ligne"}
          </Text>
        </TouchableOpacity>
      </View>

      {isOnline && (
        <View style={styles.waitingCard}>
          <Text style={styles.waitingText}>En attente de demandes...</Text>
          <Text style={styles.waitingHint}>
            Vous recevrez une alerte dès qu'un passager à proximité cherche un taxi.
          </Text>
        </View>
      )}
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
  statusBar: {
    position: "absolute", top: 60, alignSelf: "center",
  },
  toggleButton: {
    backgroundColor: "#ccc", paddingHorizontal: 32, paddingVertical: 12,
    borderRadius: 24,
  },
  toggleOnline: { backgroundColor: "#2ECC71" },
  toggleText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  waitingCard: {
    position: "absolute", bottom: 120, left: 16, right: 16,
    backgroundColor: "#fff", borderRadius: 16, padding: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 5,
  },
  waitingText: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  waitingHint: { fontSize: 14, color: "#666", lineHeight: 20 },
});
