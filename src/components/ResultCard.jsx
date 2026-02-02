import { View, Text, StyleSheet } from "react-native";

export default function ResultCard({ disease = "---", confidence = "---" }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Disease: {disease}</Text>
      <Text style={styles.text}>Confidence: {confidence}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#E6FFFA",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
