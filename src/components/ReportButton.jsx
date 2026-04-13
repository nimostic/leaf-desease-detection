import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { generateLeafReport } from '../utils/ReportGenerator';


export default function ReportButton({ result, details, user }) {
  const [loading, setLoading] = useState(false);


  const handleDownload = async () => {
    setLoading(true);
    try {
      await generateLeafReport(result, details, user);
    } catch (error) {
      alert("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleDownload}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <>
          <MaterialCommunityIcons name="file-pdf-box" size={22} color="#fff" />
          <Text style={styles.text}>Download Full Analysis Report</Text>
        </>
      )}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1C2D35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
