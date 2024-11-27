import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { HapticTab } from "@/src/components/HapticTab";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import Header from "@/src/components/Header"; // Import Header

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      {/* Global Header - visible on all screens */}
      <Header />

      <Tabs
        initialRouteName="HomeStack" // This ensures the Home tab is selected by default
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false, // Disable default header, as we already have our own custom one
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute", // Transparent background on iOS
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="HomeStack"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="AlmsStack"
          options={{
            title: "Alms",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gift.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ActsStack"
          options={{
            title: "Acts",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="figure.2.circle.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
