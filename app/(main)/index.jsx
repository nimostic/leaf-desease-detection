import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import ImagePickerCard from "../../src/components/ImagePickerCard";
import PreviewCard from "../../src/components/PreviewCard";
import ResultCard from "../../src/components/ResultCard";
import ActionButton from "../../src/components/ActionButton";

export default function Home() {
  const { user, logout } = useAuth();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState({ disease: "---", confidence: "---" });
  const [analyzing, setAnalyzing] = useState(false);
  const router = useRouter();

  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "U";

  const handleLogout = () => {
    Alert.alert("লগআউট", "আপনি কি নিশ্চিতভাবেই লগআউট করতে চান?", [
      { text: "না", style: "cancel" },
      { text: "হ্যাঁ", onPress: () => logout(), style: "destructive" },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult({ disease: "---", confidence: "---" });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("অনুমতি প্রয়োজন", "ক্যামেরা ব্যবহারের অনুমতি প্রয়োজন।");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult({ disease: "---", confidence: "---" });
    }
  };

  const analyzeLeaf = async () => {
    if (!image) {
      Alert.alert("ছবি নেই", "অনুগ্রহ করে একটি ছবি নির্বাচন করুন!");
      return;
    }

    setAnalyzing(true);
    setResult({ disease: "বিশ্লেষণ করা হচ্ছে...", confidence: "---" });

    const historyKey = `scanHistory_${user?.email || "guest"}`;

    try {
      // ১. FormData
      const formData = new FormData();
      formData.append("image", {
        uri: Platform.OS === "android" ? image : image.replace("file://", ""),
        name: "leaf_image.jpg",
        type: "image/jpeg",
      });

      // ২. api call (pc ip)
      const response = await fetch("http://192.168.2.109:5000/api/analyze", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();

      if (response.ok) {
      
        const newScan = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString(),
          disease: data.disease,
          confidence: data.confidence,
          image: image,
        };

        setResult({ disease: newScan.disease, confidence: newScan.confidence });

        const existingHistory = await AsyncStorage.getItem(historyKey);
        const history = existingHistory ? JSON.parse(existingHistory) : [];

        const updatedHistory = [newScan, ...history];
        await AsyncStorage.setItem(historyKey, JSON.stringify(updatedHistory));
      } else {
        Alert.alert("Error", data.message || "বিশ্লেষণ ব্যর্থ হয়েছে।");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "সার্ভারের সাথে সংযোগ করা যাচ্ছে না।");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.headerSection}>
        <View style={styles.userInfo}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>{userInitial}</Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>হ্যালো,</Text>
            <Text style={styles.userName}>{user?.displayName || "User"}</Text>
          </View>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() => router.push("/(main)/history")}
          >
            <Ionicons name="time-outline" size={18} color="#fff" />
            <Text style={styles.historyBtnText}>হিস্ট্রি</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={18} color="#ff4d4d" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>পাতার ছবি দিন</Text>
          <ImagePickerCard onUpload={pickImage} onCamera={takePhoto} />
        </View>

        {image && (
          <View style={styles.cardContainer}>
            <PreviewCard image={image} />
            <View style={{ marginTop: 20 }}>
              <ActionButton
                onPress={analyzeLeaf}
                disabled={analyzing}
                loading={analyzing}
              />
            </View>
          </View>
        )}

        {(result.disease !== "---" || analyzing) && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>বিশ্লেষণের ফলাফল</Text>
            <ResultCard
              disease={result.disease}
              confidence={result.confidence}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7F6",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#0B8457",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 12,
    color: "#7A8C94",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C2D35",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  historyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#0B8457",
  },
  historyBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  logoutBtn: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#FFDADA",
  },
  scrollContent: {
    paddingTop: 15,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1C2D35",
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#0B8457",
    paddingLeft: 10,
  },
});
