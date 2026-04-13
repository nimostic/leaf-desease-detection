import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useAuth } from "../../context/AuthContext";


export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, healthy: 0, diseased: 0 });
  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [user])
  );


  const loadStats = async () => {
    try {
      const historyKey = `scanHistory_${user?.email || "guest"}`;
      const savedHistory = await AsyncStorage.getItem(historyKey);
      const history = savedHistory ? JSON.parse(savedHistory) : [];


      const healthyCount = history.filter((item) =>
        item.disease.toLowerCase().includes("healthy")
      ).length;


      setStats({
        total: history.length,
        healthy: healthyCount,
        diseased: history.length - healthyCount,
      });
    } catch (error) {
      console.error("Error loading stats", error);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C2D35" />
     
      {/* Header with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Activity Dashboard</Text>
      </View>


      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
       
        <View style={styles.statsContainer}>
          {/* Total Card - Blue Palette */}
          <View style={[styles.card, { borderLeftColor: "#3498db" }]}>
            <MaterialCommunityIcons name="image-multiple" size={32} color="#3498db" />
            <Text style={styles.cardValue}>{stats.total}</Text>
            <Text style={styles.cardLabel}>Total Scans</Text>
          </View>


          <View style={styles.row}>
            {/* Healthy Card - Green Palette */}
            <View style={[styles.smallCard, { borderLeftColor: "#2ecc71" }]}>
              <MaterialCommunityIcons name="leaf" size={28} color="#2ecc71" />
              <Text style={styles.cardValueSmall}>{stats.healthy}</Text>
              <Text style={styles.cardLabel}>Healthy</Text>
            </View>


            {/* Diseased Card - Red/Coral Palette */}
            <View style={[styles.smallCard, { borderLeftColor: "#e74c3c" }]}>
              <MaterialCommunityIcons name="alert-decagram" size={28} color="#e74c3c" />
              <Text style={styles.cardValueSmall}>{stats.diseased}</Text>
              <Text style={styles.cardLabel}>Infected</Text>
            </View>
          </View>
        </View>


        {/* Note Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoTitleRow}>
            <MaterialCommunityIcons name="shield-check" size={18} color="#0B8457" />
            <Text style={styles.infoTitle}>Privacy Note:</Text>
          </View>
          <Text style={styles.infoText}>
            This data is stored locally on your device using AsyncStorage to ensure
            blazing-fast access and 100% user privacy.
          </Text>
        </View>


      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C2D35",
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15
  },
  backBtn: {
    padding: 8,
    backgroundColor: '#263843',
    borderRadius: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  statsContainer: {
    gap: 15,
    marginTop: 10
  },
  card: {
    backgroundColor: "#263843",
    padding: 25,
    borderRadius: 20,
    borderLeftWidth: 6,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  smallCard: {
    backgroundColor: "#263843",
    width: "48%",
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 5,
    alignItems: "center",
    elevation: 3,
  },
  cardValue: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
    marginVertical: 5,
  },
  cardValueSmall: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 5,
  },
  cardLabel: {
    color: "#7A8C94",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5
  },
  infoBox: {
    marginTop: 40,
    padding: 20,
    backgroundColor: "#16242A",
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#34495e",
  },
  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8
  },
  infoTitle: {
    color: "#0B8457",
    fontWeight: "bold",
    fontSize: 15
  },
  infoText: {
    color: "#95a5a6",
    fontSize: 13,
    lineHeight: 20
  },
});
