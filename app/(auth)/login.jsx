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
} from "react-native";
import { useRouter } from "expo-router";
import GoogleButton from "../../src/components/GoogleButton";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { setUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = () => {
    if (email && password) {
      //  (Firebase/API) will add later
      setUser({ name: "Riyad", email: "example@gmail.com" });
      router.replace("/(main)");
    } else {
      alert("Please enter both email and password");
    }
  };

  const handleGuestLogin = () => {
    setUser({ name: "Guest User", role: "guest" });
    router.replace("/(main)");
  };

  const handleGoogleLogin = () => {
    setUser({ name: "Riyad", email: "example@gmail.com" });
    router.replace("/(main)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Leaf Disease Detector</Text>
        <Text style={styles.subtitle}>গাছের সঠিক যত্ন নিতে লগইন করুন</Text>

        {/* email nput */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry //password hide
          />
        </View>

        {/* login button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleEmailLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={{ marginTop: 15, color: "#666" }}>
            অ্যাকাউন্ট নেই?{" "}
            <Text style={{ color: "#0B8457", fontWeight: "bold" }}>
              রেজিস্ট্রেশন করুন
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <GoogleButton onPress={handleGoogleLogin} />

        <TouchableOpacity style={styles.guestBtn} onPress={handleGuestLogin}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0B8457",
    marginBottom: 5,
  },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 30 },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#0B8457",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  line: { flex: 1, height: 1, backgroundColor: "#ddd" },
  orText: { marginHorizontal: 10, color: "#999" },
  guestBtn: { marginTop: 25 },
  guestText: {
    color: "#0B8457",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
