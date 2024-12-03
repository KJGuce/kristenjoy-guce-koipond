import React from "react";
import { Stack } from "expo-router";
import GlobalHeader from "@/src/components/Header";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: () => <GlobalHeader />, // GlobalHeader for all screens
      }}
    >
      {/* Main Tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: true }} />

      {/* Standalone Screens */}
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="profile" options={{ title: "User Profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
  );
};

export default RootLayout;
