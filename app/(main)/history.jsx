import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MOCK_HISTORY = [
  {
    id: "1",
    date: "2026-03-05",
    disease: "Tomato Late Blight",
    confidence: "92%",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    date: "2026-03-06",
    disease: "Healthy Leaf",
    confidence: "98%",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    date: "2026-03-07",
    disease: "Potato Early Blight",
    confidence: "85%",
    image: "https://via.placeholder.com/100",
  },
];

export default function History() {
  const [history, setHistory] = useState(MOCK_HISTORY); //empty thakbe

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem("scanHistory");
      if (data) setHistory(JSON.parse(data));
    };
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.diseaseText}>{item.disease}</Text>
        <Text style={styles.dateText}>তারিখ: {item.date}</Text>
        <Text style={styles.confidenceText}>নিশ্চয়তা: {item.confidence}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>আপনার স্ক্যান হিস্ট্রি</Text>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>কোনো হিস্ট্রি পাওয়া যায়নি।</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0B8457",
    marginBottom: 20,
  },
  historyCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    alignItems: "center",
  },
  cardImage: { width: 70, height: 70, borderRadius: 8, marginRight: 15 },
  cardContent: { flex: 1 },
  diseaseText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  dateText: { fontSize: 12, color: "#666", marginTop: 4 },
  confidenceText: { fontSize: 12, color: "#0B8457", fontWeight: "600" },
});
