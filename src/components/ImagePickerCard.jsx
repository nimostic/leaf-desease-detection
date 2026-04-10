import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ImagePickerCard({ onUpload, onCamera }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onUpload}>
        <Ionicons name="images-outline" size={24} color="#0B8457" />
        <Text style={styles.btnText}>গ্যালারি</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.btn} onPress={onCamera}>
        <Ionicons name="camera-outline" size={24} color="#0B8457" />
        <Text style={styles.btnText}>ক্যামেরা</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    padding: 10,
  },
  btn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 5,
  },
  btnText: {
    color: "#495057",
    fontWeight: "600",
    fontSize: 13,
  },
  divider: {
    width: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 10,
  },
});