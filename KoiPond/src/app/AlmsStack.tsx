import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AlmsScreen from "../screens/Alms"; // Adjust path as necessary
import AlmsDetailsScreen from "../../src/screens/AlmsDetailsScreen"; // Import your details screen
import { RootStackParamList } from "../../lib/types"; // Import type from types folder

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function AlmsStack() {
  return (
    <Stack.Navigator initialRouteName="AlmsScreen">
      <Stack.Screen name="AlmsScreen" component={AlmsScreen} />
      <Stack.Screen name="AlmsDetailsScreen" component={AlmsDetailsScreen} />
    </Stack.Navigator>
  );
}
