import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { setUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (name && email && password) {
      // Firebase/API call ekhane hobe
      setUser({ name, email });
      router.replace("/(main)");
    } else {
      alert("সবগুলো ঘর পূরণ করুন");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>নতুন অ্যাকাউন্ট</Text>
      <Text style={styles.subtitle}>
        গাছের রোগ নির্ণয় শুরু করতে রেজিস্ট্রেশন করুন
      </Text>

      <TextInput
        style={styles.input}
        placeholder="আপনার নাম"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="ইমেইল"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="পাসওয়ার্ড"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerBtnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>পুরানো অ্যাকাউন্ট আছে? লগইন করুন</Text>
      </TouchableOpacity>
    </ScrollView>
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
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
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
  registerBtn: {
    width: "100%",
    backgroundColor: "#0B8457",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  registerBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  backText: {
    marginTop: 20,
    color: "#0B8457",
    textDecorationLine: "underline",
  },
});
