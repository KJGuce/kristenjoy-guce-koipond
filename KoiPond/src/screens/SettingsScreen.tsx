import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker from the correct package

const SettingsScreen: React.FC = () => {
  // State for settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogOut = () => {
    // Logic to log out the user
    Alert.alert("Log Out", "You have logged out successfully!");
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Notifications Toggle */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      {/* Privacy Toggle */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Private Account</Text>
        <Switch value={isPrivate} onValueChange={setIsPrivate} />
      </View>

      {/* Language Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language</Text>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Language Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <Picker
              selectedValue={language}
              onValueChange={handleLanguageChange}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Filipino" value="Filipino" />
              <Picker.Item label="Spanish" value="Spanish" />
              {/* Add more languages as needed */}
            </Picker>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: "#333",
  },
  languageButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  languageText: {
    fontSize: 16,
    color: "#007bff",
  },
  logoutButton: {
    backgroundColor: "#ff6f61",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  closeModalButton: {
    marginTop: 15,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeModalText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SettingsScreen;
