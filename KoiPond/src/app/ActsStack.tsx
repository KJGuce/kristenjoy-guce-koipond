import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActsScreen from "../screens/Acts"; // Adjust path as necessary
import ActsDetailsScreen from "../screens/ActsDetailsScreen"; // Import your details screen
import { RootStackParamList } from "../../lib/types"; // Import type from types folder

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function ActsStack() {
  return (
    <Stack.Navigator
      initialRouteName="ActsScreen"
      screenOptions={{
        headerShown: false, // Disable the default header for all screens in this stack
      }}
    >
      <Stack.Screen name="ActsScreen" component={ActsScreen} />
      <Stack.Screen name="ActsDetailsScreen" component={ActsDetailsScreen} />
    </Stack.Navigator>
  );
}
