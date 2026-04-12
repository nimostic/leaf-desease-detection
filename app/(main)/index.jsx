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
  Image,
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
import ReportButton from "../../src/components/ReportButton";
import WeatherCard from "../../src/components/WeatherCard";
import FAQ from "../../src/components/FAQ";
import InfoSlider from "../../src/components/InfoSlider";

export default function Home() {
  const { user, logout } = useAuth();
  const [image, setImage] = useState(null);

  const [result, setResult] = useState({
    disease: "---",
    confidence: "---",
    details: null,
  });

  const [analyzing, setAnalyzing] = useState(false);
  const router = useRouter();

  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "U";

  const userPhoto = user?.photoURL;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => logout(), style: "destructive" },
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
      setResult({ disease: "---", confidence: "---", details: null });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera access is required to take photos.",
      );
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult({ disease: "---", confidence: "---", details: null });
    }
  };

  const analyzeLeaf = async () => {
    if (!image) {
      Alert.alert("No Image", "Please select or take a photo first!");
      return;
    }

    setAnalyzing(true);
    setResult({ disease: "Analyzing...", confidence: "---", details: null });

    const historyKey = `scanHistory_${user?.email || "guest"}`;

    try {
      // 1. Prepare FormData for API request
      const formData = new FormData();
      formData.append("image", {
        uri: Platform.OS === "android" ? image : image.replace("file://", ""),
        name: "leaf_image.jpg",
        type: "image/jpeg",
      });

      // 2. API Call
      const response = await fetch(
        "https://riyadreverie-leaf-disease-detection.hf.space/api/analyze",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // 3. Create scan object including treatment details from backend
        const newScan = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString(),
          disease: data.disease,
          confidence: data.confidence,
          details: data.details,
          image: image,
        };

        // Update UI state
        setResult({
          disease: newScan.disease,
          confidence: newScan.confidence,
          details: newScan.details,
        });

        // 4. Save scan to local history using AsyncStorage
        const existingHistory = await AsyncStorage.getItem(historyKey);
        const history = existingHistory ? JSON.parse(existingHistory) : [];

        const updatedHistory = [newScan, ...history];
        await AsyncStorage.setItem(historyKey, JSON.stringify(updatedHistory));
      } else {
        Alert.alert("Error", data.message || "Analysis failed.");
        setResult({ disease: "---", confidence: "---", details: null });
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Could not connect to the server.");
      setResult({ disease: "---", confidence: "---", details: null });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.userInfo}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(main)/dashboard")}
          >
            <View style={styles.profileCircle}>
              {userPhoto ? (
                <Image
                  source={{ uri: userPhoto }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.profileInitial}>{userInitial}</Text>
              )}
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.welcomeText}>Hello,</Text>
            <Text style={styles.userName}>{user?.displayName || "User"}</Text>
          </View>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() => router.push("/(main)/history")}
          >
            <Ionicons name="time-outline" size={18} color="#fff" />
            <Text style={styles.historyBtnText}>History</Text>
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
        <WeatherCard />
        <View style={styles.sliderWrapper}>
          <InfoSlider />
        </View>
        {/* Image Selection Card */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Input Leaf Image</Text>
          <ImagePickerCard onUpload={pickImage} onCamera={takePhoto} />
        </View>

        {/* Preview and Analysis Action */}
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

        {/* Result Card */}
        {result.disease !== "---" && !analyzing && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Analysis Result</Text>
            <ResultCard
              disease={result.disease}
              confidence={result.confidence}
              details={result.details}
            />

            {result.details &&
              !result.disease.toLowerCase().includes("healthy") && (
                <ReportButton
                  result={result}
                  details={result.details}
                  user={user}
                />
              )}
          </View>
        )}

        <FAQ />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7F6",
  },
  sliderWrapper: {
    marginHorizontal: -15,
    marginBottom: 15,
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
    overflow: "hidden",
  },
  profileInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
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
