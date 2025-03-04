import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import { HapticTab } from "@/src/components/HapticTab";
import TabBarBackground from "@/src/components/ui/TabBarBackground";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false, // Header is handled globally
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alms"
        options={{
          title: "Alms",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gift.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="acts"
        options={{
          title: "Acts",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="figure.2.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
