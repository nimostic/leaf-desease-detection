import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ActionButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>Analyze Leaf</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    margin: 16,
    backgroundColor: "#0B8457",
    padding: 14,
    borderRadius: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
