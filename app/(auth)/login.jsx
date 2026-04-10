import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 
import GoogleButton from "../../src/components/GoogleButton";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { googleLogin, loginWithEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (email && password) {
      try {
        setLoading(true);
        await loginWithEmail(email, password);
      } catch (error) {
        Alert.alert("লগইন ব্যর্থ", "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!");
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("সতর্কতা", "Email ও Password সঠিক ভাবে দিন");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
    } catch (error) {
      Alert.alert("লগইন ব্যর্থ", "Google login এ সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.headerIcon}>
          <Ionicons name="leaf" size={60} color="#0B8457" />
        </View>

        <Text style={styles.title}>Leaf Disease Detector</Text>
        <Text style={styles.subtitle}>গাছের সঠিক যত্ন নিতে লগইন করুন</Text>

        <View style={styles.inputContainer}>
          
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.loginBtn, loading && { opacity: 0.8 }]} 
          onPress={handleEmailLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginBtnText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.footerText}>
            অ্যাকাউন্ট নেই? <Text style={styles.signupText}>রেজিস্ট্রেশন করুন</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>অথবা</Text>
          <View style={styles.line} />
        </View>

        {loading ? null : <GoogleButton onPress={handleGoogleLogin} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  headerIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0B8457",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 35,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#eee",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#0B8457",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    color: "#666",
    fontSize: 15,
  },
  signupText: {
    color: "#0B8457",
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#eee",
  },
  orText: {
    marginHorizontal: 15,
    color: "#999",
    fontSize: 14,
  },
});