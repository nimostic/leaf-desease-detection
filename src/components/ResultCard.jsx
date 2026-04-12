import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResultCard({
  disease = "---",
  confidence = "---",
  details = null,
}) {
  const isHealthy = disease.toLowerCase().includes("healthy");

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={isHealthy ? "check-decagram" : "alert-decagram"}
          size={24}
          color={isHealthy ? "#28A745" : "#DC3545"}
        />
        <View style={styles.textGroup}>
          <Text style={styles.label}>শনাক্তকৃত রোগ</Text>
          <Text
            style={[styles.value, { color: isHealthy ? "#28A745" : "#1C2D35" }]}
          >
            {disease}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="bullseye-arrow"
          size={24}
          color="#0B8457"
        />
        <View style={styles.textGroup}>
          <Text style={styles.label}>নির্ভুলতা (Confidence)</Text>
          <Text style={styles.confidenceValue}>{confidence}</Text>
        </View>
      </View>

      {details && !isHealthy && (
        <View style={styles.detailsContainer}>
          <View style={styles.divider} />

          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>📍 লক্ষণ:</Text>
            <Text style={styles.detailText}>{details.symptoms}</Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={[styles.detailLabel, { color: "#DC3545" }]}>
              💊 সমাধান:
            </Text>
            <Text style={styles.detailText}>{details.treatment}</Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={[styles.detailLabel, { color: "#0B8457" }]}>
              🛡️ প্রতিরোধ:
            </Text>
            <Text style={styles.detailText}>{details.prevention}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 15 },
  row: { flexDirection: "row", alignItems: "center", gap: 15 },
  textGroup: { flex: 1 },
  label: {
    fontSize: 11,
    color: "#6C757D",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: { fontSize: 17, fontWeight: "bold", color: "#1C2D35", marginTop: 2 },
  confidenceValue: { fontSize: 17, fontWeight: "bold", color: "#0B8457" },
  divider: { height: 1, backgroundColor: "#F1F3F5", marginVertical: 5 },
  detailsContainer: { gap: 12 },
  detailSection: { marginTop: 5 },
  detailLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 3,
  },
  detailText: { fontSize: 14, color: "#212529", lineHeight: 20 },
});
