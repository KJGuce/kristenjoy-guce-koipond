import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/index"; // Import the home page
import PostAlmScreen from "../screens/PostAlmScreen"; // Import post alm page
import PostActScreen from "../screens/PostActScreen"; // Import post act page
import ActsDetailsScreen from "../screens/ActsDetailsScreen"; // Import your details screen
import AlmsDetailsScreen from "../screens/AlmsDetailsScreen"; // Import your details screen

import { RootStackParamList } from "../../lib/types"; // Import type from types folder

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false, // Disable the default header for all screens in this stack
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PostAlmScreen" component={PostAlmScreen} />
      <Stack.Screen name="PostActScreen" component={PostActScreen} />
      <Stack.Screen name="AlmsDetailsScreen" component={AlmsDetailsScreen} />
      <Stack.Screen name="ActsDetailsScreen" component={ActsDetailsScreen} />
    </Stack.Navigator>
  );
}
