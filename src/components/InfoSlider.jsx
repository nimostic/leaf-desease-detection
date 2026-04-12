import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import diseaseData from "../data/diseases.json";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;

export default function InfoSlider() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  const diseaseImages = {
    rice_blight: require("../../assets/diseases/rice_blight.jpg"),
    potato_blight: require("../../assets/diseases/potato_blight.jpg"),
    tomato_mold: require("../../assets/diseases/tomato_mold.jpg"),
    eggplant_rot: require("../../assets/diseases/eggplant_rot.jpg"),
    wheat_rust: require("../../assets/diseases/wheat_rust.jpg"),
    maize_blight: require("../../assets/diseases/maize_blight.jpeg"),
    chili_anthracnose: require("../../assets/diseases/chili_anthracnose.jpg"),
    banana_sigatoka: require("../../assets/diseases/banana_sigatoka.webp"),
    mango_mildew: require("../../assets/diseases/mango_mildew.jpeg"),
    cucumber_mildew: require("../../assets/diseases/cucumber_mildew.jpg"),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % diseaseData.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image
        source={diseaseImages[item.image]}
        style={styles.image}
        resizeMode="cover"
        onError={() => setImgErrors((prev) => ({ ...prev, [item.id]: true }))}
      />

      <View style={styles.dotRow}>
        {diseaseData.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.desc}
        </Text>
        <View style={styles.preventionBox}>
          <Text style={styles.preventionText}>💡 {item.prevention}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🌿 Agricultural Insights</Text>
      <FlatList
        ref={flatListRef}
        data={diseaseData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 16}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / (CARD_WIDTH + 16),
          );
          setCurrentIndex(newIndex);
        }}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + 16,
          offset: (CARD_WIDTH + 16) * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C2D35",
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#0B8457",
    paddingLeft: 10,
    marginLeft: 20,
  },
  slide: {
    width: CARD_WIDTH,
    backgroundColor: "#263843",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: "#34495e",
  },
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  dotActive: {
    backgroundColor: "#0B8457",
    width: 18,
  },
  textContainer: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  desc: {
    fontSize: 13,
    color: "#BDC3C7",
    marginTop: 5,
    lineHeight: 19,
  },
  preventionBox: {
    marginTop: 10,
    backgroundColor: "rgba(11, 132, 87, 0.2)",
    padding: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#0B8457",
  },
  preventionText: {
    color: "#2ecc71",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
  },
});
