import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import { HapticTab } from "@/src/components/HapticTab";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Alms"
        options={{
          title: "Alms",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gift.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Opportunities"
        options={{
          title: "Opportunities",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="figure.2.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
