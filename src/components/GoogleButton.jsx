import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";

const GoogleButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={{
          uri: "https://image.similarpng.com/file/similarpng/very-thumbnail/2020/06/Logo-google-icon-PNG.png",
        }}
        style={styles.icon}
      />
      <Text style={styles.text}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  icon: { width: 20, height: 20, marginRight: 10 },
  text: { fontSize: 16, fontWeight: "600", color: "#555" },
});

export default GoogleButton;
