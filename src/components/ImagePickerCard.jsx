import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ImagePickerCard({ onUpload, onCamera }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.btn} onPress={onUpload}>
        <Text style={styles.btnText}>Upload from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnOutline} onPress={onCamera}>
        <Text style={styles.btnOutlineText}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  btn: {
    backgroundColor: "#0B8457",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#0B8457",
    padding: 12,
    borderRadius: 8,
  },
  btnOutlineText: {
    color: "#0B8457",
    textAlign: "center",
    fontWeight: "bold",
  },
});
