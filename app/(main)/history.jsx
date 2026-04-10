import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function History() {
  const [history, setHistory] = useState([]);
  const { user } = useAuth();

  const historyKey = `scanHistory_${user?.email || "guest"}`;

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem(historyKey);
      if (data) {
        setHistory(JSON.parse(data));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Load Error:", error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [user]);

  const clearHistory = () => {
    Alert.alert(
      "মুছে ফেলুন",
      "আপনি কি নিশ্চিতভাবে সব হিস্ট্রি মুছে ফেলতে চান?",
      [
        { text: "না", style: "cancel" },
        {
          text: "হ্যাঁ",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(historyKey);
            setHistory([]);
          },
        },
      ],
    );
  };

  const renderItem = ({ item }) => {
    const isHealthy = item.disease?.toLowerCase().includes("healthy");

    return (
      <View style={styles.historyCard}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.diseaseText,
                { color: isHealthy ? "#28A745" : "#1C2D35" },
              ]}
            >
              {item.disease}
            </Text>
            <MaterialCommunityIcons
              name={isHealthy ? "check-decagram" : "alert-decagram"}
              size={18}
              color={isHealthy ? "#28A745" : "#DC3545"}
            />
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={14} color="#7A8C94" />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="analytics-outline" size={14} color="#0B8457" />
            <Text style={styles.confidenceText}>
              নিশ্চয়তা: {item.confidence}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.headerSection}>
        <View>
          <Text style={styles.headerTitle}>আপনার স্ক্যান হিস্ট্রি</Text>
          <Text style={styles.headerSubtitle}>
            মোট {history.length} টি স্ক্যান পাওয়া গেছে
          </Text>
        </View>

        {history.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={clearHistory}>
            <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="folder-open-outline"
            size={80}
            color="#DEE2E6"
          />
          <Text style={styles.emptyText}>এখনো কোনো হিস্ট্রি পাওয়া হয়নি।</Text>
          <Text style={styles.emptySubText}>লগইন করা ইমেইল: {user?.email}</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F7F6" },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    elevation: 3,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#0B8457" },
  headerSubtitle: { fontSize: 13, color: "#7A8C94", marginTop: 2 },
  clearBtn: { padding: 10, borderRadius: 12, backgroundColor: "#FFF0F0" },
  listContainer: { padding: 15, paddingBottom: 40 },
  historyCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
    alignItems: "center",
  },
  cardImage: { width: 80, height: 80, borderRadius: 12, marginRight: 15 },
  cardContent: { flex: 1 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  diseaseText: { fontSize: 16, fontWeight: "bold" },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 3 },
  infoText: { fontSize: 13, color: "#7A8C94" },
  confidenceText: { fontSize: 13, color: "#0B8457", fontWeight: "600" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C2D35",
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: "#7A8C94",
    textAlign: "center",
    marginTop: 8,
  },
});
