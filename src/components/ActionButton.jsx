import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ActionButton({ onPress, loading, disabled }) {
  return (
    <TouchableOpacity 
      style={[styles.btn, (disabled || loading) && styles.disabledBtn]} 
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles.content}>
          <Ionicons name="scan-circle-outline" size={24} color="white" />
          <Text style={styles.text}>গাছের রোগ বিশ্লেষণ করুন</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#0B8457",
    paddingVertical: 16,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#0B8457",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  disabledBtn: {
    backgroundColor: "#A5D6A7",
    elevation: 0,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});