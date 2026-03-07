import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import {
  ScrollView,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImagePickerCard from "../../src/components/ImagePickerCard";
import PreviewCard from "../../src/components/PreviewCard";
import ResultCard from "../../src/components/ResultCard";
import ActionButton from "../../src/components/ActionButton";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Home() {
  const { user, setUser } = useAuth();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState({ disease: "---", confidence: "---" });
  const router = useRouter();
  // লগআউট ফাংশন
  const handleLogout = () => {
    Alert.alert("Logout", "আপনি কি লগআউট করতে চান?", [
      { text: "না", style: "cancel" },
      { text: "হ্যাঁ", onPress: () => setUser(null) },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is needed.");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeLeaf = async () => {
    if (!image) {
      Alert.alert("No Image", "Please select or take a photo first!");
      return;
    }

    // ১. ডামি রেজাল্ট জেনারেট করা (এপিআই কল হওয়ার আগ পর্যন্ত)
    const newScan = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      disease: "Tomato Late Blight", // এটি পরে API থেকে আসবে
      confidence: "95%",
      image: image,
    };

    try {
      // ২. আগের হিস্ট্রি গেট করা
      const existingHistory = await AsyncStorage.getItem("scanHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];

      // ৩. নতুন স্ক্যান ডাটা শুরুতে যোগ করা
      const updatedHistory = [newScan, ...history];

      // ৪. আবার সেভ করা
      await AsyncStorage.setItem("scanHistory", JSON.stringify(updatedHistory));

      setResult({ disease: newScan.disease, confidence: newScan.confidence });
      Alert.alert("Success", "Scan results saved to history!");
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <View>
          <Text style={styles.welcomeText}>হ্যালো,</Text>
          <Text style={styles.userName}>{user?.name || "Guest User"} 👋</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() => router.push("/(main)/history")}
          >
            <Text style={styles.historyBtnText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ImagePickerCard onUpload={pickImage} onCamera={takePhoto} />
      <PreviewCard image={image} />
      <ResultCard disease={result.disease} confidence={result.confidence} />
      <ActionButton onPress={analyzeLeaf} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  historyBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#0B8457",
  },
  historyBtnText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0B8457",
  },
  logoutBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ff4d4d",
  },
  logoutText: {
    color: "#ff4d4d",
    fontWeight: "600",
    fontSize: 12,
  },
});
