import { View, Text, Image, StyleSheet } from "react-native";

export default function PreviewCard({ image }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Selected Leaf Image</Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No image selected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  placeholder: {
    color: "gray",
  },
});
