import { Stack } from "expo-router";
import Header from "@/src/components/Header";
import { useFonts } from "expo-font";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const RootLayout = () => {
  // Load Quicksand fonts
  const [fontsLoaded] = useFonts({
    "Quicksand-Regular": require("@/assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("@/assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("@/assets/fonts/Quicksand-Bold.ttf"),
  });

  // Show a loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#46B3A5" />
      </View>
    );
  }

  return (
    <>
      {/* Include Global Header */}
      <Header />
      <Stack
        screenOptions={{
          headerShown: false, // Disable default headers
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile/index" />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="register/index" />
      </Stack>
    </>
  );
};

export default RootLayout;

// Styles for the loading screen
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f9f8", // Match KoiPond theme
  },
});
