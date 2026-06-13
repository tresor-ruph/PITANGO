import { View, Text, StyleSheet } from "react-native";

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes courses</Text>
      <Text style={styles.empty}>Aucune course pour le moment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  empty: { color: "#999", fontSize: 16, textAlign: "center", marginTop: 40 },
});
