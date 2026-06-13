import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

const DOCUMENTS = [
  { key: "cni", label: "Carte Nationale d'Identité (CNI)" },
  { key: "license", label: "Permis de conduire" },
  { key: "registration", label: "Carte grise du véhicule" },
  { key: "insurance", label: "Attestation d'assurance" },
] as const;

export default function DocumentsScreen() {
  const handleUpload = (docKey: string) => {
    // TODO: Open camera/gallery and upload to Firebase Storage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dossier de conformité</Text>
      <Text style={styles.subtitle}>
        Téléversez vos pièces justificatives pour activer votre compte
      </Text>

      {DOCUMENTS.map((doc) => (
        <TouchableOpacity
          key={doc.key}
          style={styles.docCard}
          onPress={() => handleUpload(doc.key)}
        >
          <Text style={styles.docLabel}>{doc.label}</Text>
          <Text style={styles.uploadText}>Ajouter →</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/onboarding/subscription")}
      >
        <Text style={styles.buttonText}>Soumettre le dossier</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 32, lineHeight: 22 },
  docCard: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    backgroundColor: "#f9f9f9", borderRadius: 12, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: "#eee", borderStyle: "dashed",
  },
  docLabel: { fontSize: 15, flex: 1 },
  uploadText: { color: "#2ECC71", fontWeight: "600" },
  button: {
    backgroundColor: "#2ECC71", borderRadius: 12,
    padding: 16, alignItems: "center", marginTop: 16, marginBottom: 40,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
