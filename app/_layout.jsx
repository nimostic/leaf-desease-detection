import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootLayoutNav() {
  const { user } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B8457" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitle: "Leaf Disease Detector",
        headerTitleAlign: "center",
      }}
    >
      {!user ? (
        <Stack.Screen
          name="(auth)/login"
          options={{ title: "Login", headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="(main)/index" options={{ title: "Home" }} />
          <Stack.Screen name="(main)/history" options={{ title: "Scan History" }} />
        </>
      )}
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}