// app/home/HomeStack.tsx
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./index"; // Import the home page
import PostAlmScreen from "../screens/PostAlmScreen"; // Import post alm page
import PostActScreen from "../screens/PostActScreen"; // Import post act page
import { RootStackParamList } from "../../lib/types"; // Import type from types folder

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="PostAlmScreen" component={PostAlmScreen} />
      <Stack.Screen name="PostActScreen" component={PostActScreen} />
    </Stack.Navigator>
  );
}
