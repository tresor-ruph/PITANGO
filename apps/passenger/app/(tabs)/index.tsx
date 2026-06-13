import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function HomeScreen() {
  const [destination, setDestination] = useState("");

  return (
    <View style={styles.container}>
      {/* TODO: Replace with react-native-maps MapView */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Carte OpenStreetMap / Mapbox</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.greeting}>Où allez-vous ?</Text>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push("/ride/search")}
        >
          <Text style={styles.searchPlaceholder}>Saisir la destination...</Text>
        </TouchableOpacity>
      </View>
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
  searchContainer: {
    position: "absolute", bottom: 100, left: 16, right: 16,
    backgroundColor: "#fff", borderRadius: 16, padding: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 5,
  },
  greeting: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  searchBar: {
    backgroundColor: "#f5f5f5", borderRadius: 12, padding: 16,
  },
  searchPlaceholder: { color: "#999", fontSize: 16 },
});
