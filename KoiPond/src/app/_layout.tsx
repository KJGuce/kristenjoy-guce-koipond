import { Stack } from "expo-router";
import Header from "@/src/components/Header";

const RootLayout = () => {
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
        <Stack.Screen name="profile" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
  );
};

export default RootLayout;
