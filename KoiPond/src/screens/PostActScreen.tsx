import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../lib/types";
import { postNewAct } from "../../lib/api"; // Import the function to post a new act

type PostActScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PostActScreen"
>;

interface PostActScreenProps {
  navigation: PostActScreenNavigationProp;
}

const PostActScreen: React.FC<PostActScreenProps> = ({ navigation }) => {
  const [actName, setActName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [policeCheckRequired, setPoliceCheckRequired] = useState("No");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const categoryOptions = [
    { label: "Community", value: "Community" },
    { label: "Environmental", value: "Environmental" },
    { label: "Health", value: "Health" },
    { label: "Other", value: "Other" },
  ];

  const handleSubmit = async () => {
    if (
      !actName.trim() ||
      !startDate ||
      !endDate ||
      !location.trim() ||
      !description.trim() ||
      !category
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (startDate > endDate) {
      Alert.alert("Error", "Start Date cannot be later than End Date.");
      return;
    }

    const newAct = {
      title: actName, // Ensure it aligns with the backend field
      start_date: startDate?.toISOString().split("T")[0],
      end_date: endDate?.toISOString().split("T")[0],
      location,
      category,
      description,
      police_check_required: policeCheckRequired === "Yes",
    };

    try {
      const response = await postNewAct(newAct);

      if (response) {
        Alert.alert("Success", "New Act has been posted!");
        // Reset form after successful submission
        setActName("");
        setStartDate(null);
        setEndDate(null);
        setLocation("");
        setCategory("");
        setDescription("");
        setPoliceCheckRequired("No");

        // Navigate back or refresh data
        navigation.navigate("HomeScreen"); // Make sure HomeScreen fetches latest data
      } else {
        Alert.alert("Error", "Failed to post the new act. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting new act:", error);
      Alert.alert(
        "Error",
        "An error occurred while posting the act. Please check your network or try again."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[styles.container, { paddingBottom: 150 }]}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContainer}>
              <Text style={styles.label}>
                Act Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={actName}
                onChangeText={setActName}
                placeholder="Enter act name"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>
                Start Date <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.datePickerText}>
                  {startDate
                    ? startDate.toISOString().split("T")[0]
                    : "Select start date"}
                </Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowStartDatePicker(false);
                    if (date) setStartDate(date);
                  }}
                />
              )}

              <Text style={styles.label}>
                End Date <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.datePickerText}>
                  {endDate
                    ? endDate.toISOString().split("T")[0]
                    : "Select end date"}
                </Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowEndDatePicker(false);
                    if (date) setEndDate(date);
                  }}
                />
              )}

              <Text style={styles.label}>
                Location <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>
                Category <Text style={styles.required}>*</Text>
              </Text>
              <Dropdown
                data={categoryOptions}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={category}
                onChange={(item) => setCategory(item.value)}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
              />

              <Text style={styles.label}>
                Description <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
              />

              <Text style={styles.label}>Police Check Required</Text>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setPoliceCheckRequired("Yes")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      policeCheckRequired === "Yes" && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setPoliceCheckRequired("No")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      policeCheckRequired === "No" && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.postButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Post New Act</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostActScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    color: "#888",
  },
  selectedTextStyle: {
    color: "#333",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: "#46B3A5",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  footerContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  postButton: {
    backgroundColor: "#46B3A5",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
