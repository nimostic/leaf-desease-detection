import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PreviewCard({ image }) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Ionicons name="image" size={14} color="#0B8457" />
        <Text style={styles.badgeText}>নির্বাচিত পাতা</Text>
      </View>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="cloud-upload-outline" size={40} color="#ADB5BD" />
          <Text style={styles.placeholderText}>কোনো ছবি পাওয়া যায়নি</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F4EA",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 15,
    gap: 5,
  },
  badgeText: {
    fontSize: 12,
    color: "#0B8457",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E9ECEF",
  },
  placeholder: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    backgroundColor: "#F8F9FA",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#DEE2E6",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#6C757D",
    marginTop: 10,
    fontSize: 14,
  },
});