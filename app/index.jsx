import { useState } from "react";
import { ScrollView, Alert, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker'; //import from expo

import ImagePickerCard from "../src/components/ImagePickerCard";
import PreviewCard from "../src/components/PreviewCard";
import ResultCard from "../src/components/ResultCard";
import ActionButton from "../src/components/ActionButton";

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState({ disease: "---", confidence: "---" });

  // [pick image from gallery]
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // take iamge through cam
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Camera access is needed to take photos.");
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

  const analyzeLeaf = () => {
    if (!image) {
      Alert.alert("No Image", "Please select or take a photo first!");
      return;
    }
    console.log("Analyzing image at:", image);
    // api call ekhane hobe,,,,,,,,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    

      <ImagePickerCard
        onUpload={pickImage} 
        onCamera={takePhoto} 
      />

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
});