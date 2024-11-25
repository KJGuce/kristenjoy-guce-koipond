import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AlmsScreen from "./src/app/alms"; // Adjust path as necessary
import AlmsDetailsScreen from "./src/screens/AlmsDetailsScreen"; // Import your details screen
import { RootStackParamList } from "./lib/types"; // Import type from types folder

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="AlmsScreen">
        <Stack.Screen name="AlmsScreen" component={AlmsScreen} />
        <Stack.Screen name="AlmsDetailsScreen" component={AlmsDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
