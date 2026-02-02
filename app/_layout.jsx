import { Stack } from "expo-router";

export default function Layout() {
  return <Stack screenOptions={{
        headerStyle: { backgroundColor: "#0B8457" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitle: "Leaf Disease Detector",
        headerTitleAlign: "center",
      }} />;
}
