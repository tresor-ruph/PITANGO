import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../../lib/auth";

const DOCUMENTS = [
  { key: "cni", label: "Carte Nationale d'Identité (CNI)" },
  { key: "license", label: "Permis de conduire" },
  { key: "registration", label: "Carte grise du véhicule" },
  { key: "insurance", label: "Attestation d'assurance" },
] as const;

export default function DocumentsScreen() {
  const { submitDocuments } = useAuth();
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const handleUpload = (docKey: string) => {
    // TODO: Open camera/gallery and upload to Firebase Storage.
    // For the MVP mock we just mark the document as provided.
    setUploaded((prev) => ({ ...prev, [docKey]: true }));
  };

  const allUploaded = DOCUMENTS.every((d) => uploaded[d.key]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitDocuments();
      // Root route guard redirects to the pending screen once status updates.
    } catch {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dossier de conformité</Text>
      <Text style={styles.subtitle}>
        Téléversez vos pièces justificatives pour activer votre compte
      </Text>

      {DOCUMENTS.map((doc) => {
        const done = uploaded[doc.key];
        return (
          <TouchableOpacity
            key={doc.key}
            style={[styles.docCard, done && styles.docCardDone]}
            onPress={() => handleUpload(doc.key)}
          >
            <Text style={styles.docLabel}>{doc.label}</Text>
            <Text style={[styles.uploadText, done && styles.uploadTextDone]}>
              {done ? "✓ Ajouté" : "Ajouter →"}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={[styles.button, (!allUploaded || loading) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!allUploaded || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Soumettre le dossier</Text>
        )}
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
  docCardDone: { borderColor: "#2ECC71", borderStyle: "solid", backgroundColor: "#f0faf4" },
  docLabel: { fontSize: 15, flex: 1 },
  uploadText: { color: "#2ECC71", fontWeight: "600" },
  uploadTextDone: { color: "#2ECC71" },
  button: {
    backgroundColor: "#2ECC71", borderRadius: 12,
    padding: 16, alignItems: "center", marginTop: 16, marginBottom: 40,
    minHeight: 56, justifyContent: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
