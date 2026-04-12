import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ImagePickerCard({ onUpload, onCamera }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="leaf-outline" size={18} color="#0B8457" />
        <Text style={styles.headerText}>একটি পাতার ছবি নিন</Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, styles.btnGreen]}
          onPress={onUpload}
          activeOpacity={0.85}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="images-outline" size={26} color="#0B8457" />
          </View>
          <Text style={styles.btnTitle}>Gallery</Text>
          <Text style={styles.btnSub}>ফোন থেকে বাছুন</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnDark]}
          onPress={onCamera}
          activeOpacity={0.85}
        >
          <View style={styles.iconCircleDark}>
            <Ionicons name="camera-outline" size={26} color="#fff" />
          </View>
          <Text style={[styles.btnTitle, { color: "#fff" }]}>Camera</Text>
          <Text style={[styles.btnSub, { color: "#BDC3C7" }]}>
            এখনই তুলুন
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hintRow}>
        <Ionicons name="information-circle-outline" size={14} color="#999" />
        <Text style={styles.hintText}>
          ভালো ফলাফলের জন্য পরিষ্কার আলোতে ছবি তুলুন
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C2D35",
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 14,
    gap: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  btnGreen: {
    backgroundColor: "#0B8457",
  },
  btnDark: {
    backgroundColor: "#1C2D35",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  iconCircleDark: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  btnTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  btnSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
  },
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  hintText: {
    fontSize: 11,
    color: "#999",
    flex: 1,
  },
});