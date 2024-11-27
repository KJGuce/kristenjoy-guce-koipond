import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "@/lib/types"; // Import your types for navigation
import { NavigationProp } from "@react-navigation/native"; // Import NavigationProp to type useNavigation

// Type the navigation correctly
const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Correctly type the navigation

  return (
    <View style={styles.headerContainer}>
      {/* Logo with navigation to HomeStack */}
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Image
          source={require("../../assets/images/logo-placeholder-image.png")} // Replace with your logo
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* Profile Avatar and Settings */}
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../assets/images/icon.png")} // Replace with user profile image
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 120,
    height: 40,
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
