import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import TabLayout from "./src/navigation/TabLayout"; // Adjust the path as necessary

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <TabLayout />
    </NavigationContainer>
  );
}
