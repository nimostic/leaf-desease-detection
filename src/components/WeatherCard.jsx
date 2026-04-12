import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location"; 

const API_KEY = "09fb4eefb78b51a1370349bdfe78815d";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

useEffect(() => {
  (async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        fetchWeatherData(23.8103, 90.4125); 
        return;
      }

    
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low, 
        timeout: 10000,
      });
      
      const { latitude, longitude } = location.coords;
      fetchWeatherData(latitude, longitude);
      
    } catch (error) {
      console.log("Location error, using default:", error);
      fetchWeatherData(23.8103, 90.4125);
    }
  })();
}, []);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather({
          main: { temp: 28 },
          weather: [{ main: "Cloudy" }],
          name: "Current Location",
        });
      }
    } catch (err) {
      console.log("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAgriTip = (temp, weatherMain) => {
    if (temp > 30) return "অতিরিক্ত তাপ! গাছের গোড়ায় পর্যাপ্ত পানি দিন।";
    if (weatherMain === "Rain")
      return "বৃষ্টির সম্ভাবনা আছে, সার প্রয়োগ থেকে বিরত থাকুন।";
    return "ফসল পর্যবেক্ষণের জন্য আজকের আবহাওয়া চমৎকার।";
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.weatherRow}>
        <View>
          <Text style={styles.temp}>{Math.round(weather?.main?.temp)}°C</Text>
          <Text style={styles.city}>
            {weather?.name
              ? `${weather.name}, Bangladesh`
              : "Detecting Location..."}
          </Text>
        </View>
        <MaterialCommunityIcons
          name={
            weather?.weather[0]?.main === "Rain"
              ? "weather-rainy"
              : "weather-sunny"
          }
          size={40}
          color="#FFD700"
        />
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>🌾 কৃষি পরামর্শ:</Text>
        <Text style={styles.tipText}>
          {getAgriTip(weather?.main?.temp, weather?.weather[0]?.main)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C2D35",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    minHeight: 120,
    justifyContent: "center",
  },
  weatherRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  temp: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  city: { color: "#ccc", fontSize: 14 },
  tipContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#444",
  },
  tipTitle: { color: "#FFD700", fontWeight: "bold", marginBottom: 5 },
  tipText: { color: "#fff", fontSize: 13, lineHeight: 18 },
});
