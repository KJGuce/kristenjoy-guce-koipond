import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView, // Ensure safe area handling
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "@/lib/types"; // Import your types for navigation
import { NavigationProp } from "@react-navigation/native"; // Import NavigationProp to type useNavigation

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Logo with navigation to HomeScreen */}
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image
            source={require("../../assets/images/logo-placeholder-image.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Profile Avatar and Settings */}
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
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
    height: 35,
    resizeMode: "contain",
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
