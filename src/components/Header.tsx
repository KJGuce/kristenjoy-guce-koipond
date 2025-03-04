import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView, // Ensure safe area handling
} from "react-native";
import { useRouter } from "expo-router"; // Use Expo Router for navigation
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const router = useRouter(); // Use router for navigation

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Logo with navigation to HomeScreen */}
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Image
            source={require("../../assets/images/kplogo1.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Profile Avatar and Settings */}
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image
              source={require("../../assets/images/5856.jpg")}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0, // Ensures that the SafeAreaView doesn't take more space than necessary
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 100,
    height: 40,
    // resizeMode: "contain",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default Header;
