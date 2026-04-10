import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons"; 

export default function Register() {
  const { registerWithEmail } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("সতর্কতা", "সবগুলো ঘর পূরণ করুন!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "পাসওয়ার্ড মেলেনি!");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে!");
      return;
    }

    try {
      setLoading(true);
      await registerWithEmail(email, password);
      Alert.alert("অভিনন্দন", "আপনার অ্যাকাউন্ট তৈরি হয়েছে!");
    } catch (error) {
      Alert.alert("Registration Failed", "এই ইমেইলটি ইতিমধ্যে ব্যবহার করা হয়েছে অথবা ইন্টারনেটে সমস্যা।");
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
        
        <View style={styles.iconCircle}>
          <Ionicons name="leaf" size={50} color="#fff" />
        </View>

        <Text style={styles.title}>নতুন অ্যাকাউন্ট</Text>
        <Text style={styles.subtitle}>
          আপনার গাছের সঠিক যত্ন নিতে আজই আমাদের সাথে যুক্ত হন
        </Text>

        <View style={styles.form}>
         
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="আপনার পূর্ণ নাম"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
          </View>

          
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="ইমেইল অ্যাড্রেস"
               placeholderTextColor="#888"
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
              placeholder="পাসওয়ার্ড"
               placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          
          <View style={styles.inputWrapper}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
               placeholderTextColor="#888"
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.registerBtn, loading && { opacity: 0.7 }]} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerBtnText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()} style={styles.footerLink}>
          <Text style={styles.footerText}>
            পুরানো অ্যাকাউন্ট আছে? <Text style={styles.linkText}>লগইন করুন</Text>
          </Text>
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
    padding: 25,
    paddingTop: 60,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#0B8457",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#0B8457",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#321919",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#777",
    marginBottom: 35,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  form: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  registerBtn: {
    width: "100%",
    backgroundColor: "#0B8457",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  registerBtnText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  footerLink: {
    marginTop: 25,
    padding: 10,
  },
  footerText: {
    fontSize: 15,
    color: "#666",
  },
  linkText: {
    color: "#0B8457",
    fontWeight: "bold",
  },
});