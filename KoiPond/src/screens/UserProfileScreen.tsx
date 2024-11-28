import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For the edit icon

const UserProfileScreen: React.FC = () => {
  // State to hold the user's profile information
  const [username, setUsername] = useState("john_doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");

  // State to track which field is being edited
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    username: false,
    email: false,
    firstName: false,
    lastName: false,
    phoneNumber: false,
  });

  const handleEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    // You can add save logic here (e.g., sending data to a server)
  };

  const handleChangePassword = () => {
    // Logic for changing password
    Alert.alert("Change Password", "Password change feature coming soon!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>

      {/* Username */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Username</Text>
        {isEditing.username ? (
          <View style={styles.fieldInputContainer}>
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
            />
            <TouchableOpacity onPress={() => handleSave("username")}>
              <MaterialIcons name="check-circle" size={24} color="#28a745" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.fieldTextContainer}>
            <Text style={styles.fieldText}>{username}</Text>
            <TouchableOpacity onPress={() => handleEdit("username")}>
              <MaterialIcons name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Email */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email</Text>
        {isEditing.email ? (
          <View style={styles.fieldInputContainer}>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity onPress={() => handleSave("email")}>
              <MaterialIcons name="check-circle" size={24} color="#28a745" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.fieldTextContainer}>
            <Text style={styles.fieldText}>{email}</Text>
            <TouchableOpacity onPress={() => handleEdit("email")}>
              <MaterialIcons name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* First Name */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>First Name</Text>
        {isEditing.firstName ? (
          <View style={styles.fieldInputContainer}>
            <TextInput
              style={styles.textInput}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TouchableOpacity onPress={() => handleSave("firstName")}>
              <MaterialIcons name="check-circle" size={24} color="#28a745" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.fieldTextContainer}>
            <Text style={styles.fieldText}>{firstName}</Text>
            <TouchableOpacity onPress={() => handleEdit("firstName")}>
              <MaterialIcons name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Last Name */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Last Name</Text>
        {isEditing.lastName ? (
          <View style={styles.fieldInputContainer}>
            <TextInput
              style={styles.textInput}
              value={lastName}
              onChangeText={setLastName}
            />
            <TouchableOpacity onPress={() => handleSave("lastName")}>
              <MaterialIcons name="check-circle" size={24} color="#28a745" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.fieldTextContainer}>
            <Text style={styles.fieldText}>{lastName}</Text>
            <TouchableOpacity onPress={() => handleEdit("lastName")}>
              <MaterialIcons name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Phone Number */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Phone Number</Text>
        {isEditing.phoneNumber ? (
          <View style={styles.fieldInputContainer}>
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity onPress={() => handleSave("phoneNumber")}>
              <MaterialIcons name="check-circle" size={24} color="#28a745" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.fieldTextContainer}>
            <Text style={styles.fieldText}>{phoneNumber}</Text>
            <TouchableOpacity onPress={() => handleEdit("phoneNumber")}>
              <MaterialIcons name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Change Password Button */}
      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={handleChangePassword}
      >
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>
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
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  fieldTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  fieldInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  changePasswordButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  changePasswordText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default UserProfileScreen;
