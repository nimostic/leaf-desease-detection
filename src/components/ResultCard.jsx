import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResultCard({ disease = "---", confidence = "---" }) {
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
          <Text style={[styles.value, { color: isHealthy ? "#28A745" : "#1C2D35" }]}>
            {disease}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <MaterialCommunityIcons name="bullseye-arrow" size={24} color="#0B8457" />
        <View style={styles.textGroup}>
          <Text style={styles.label}>নির্ভুলতা (Confidence)</Text>
          <Text style={styles.confidenceValue}>{confidence}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  textGroup: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#6C757D",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C2D35",
    marginTop: 2,
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B8457",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F3F5",
  },
});