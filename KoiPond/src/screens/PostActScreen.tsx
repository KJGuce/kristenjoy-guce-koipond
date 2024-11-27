import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // For dropdowns
import { StackNavigationProp } from "@react-navigation/stack"; // For navigation typing
import { RootStackParamList } from "../../lib/types"; // Import your param list for typing

// Define the type for PostActScreen navigation prop
type PostActScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PostActScreen"
>;

interface PostActScreenProps {
  navigation: PostActScreenNavigationProp;
}

const PostActScreen: React.FC<PostActScreenProps> = ({ navigation }) => {
  // State variables for form inputs
  const [actName, setActName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Community");
  const [description, setDescription] = useState("");
  const [policeCheckRequired, setPoliceCheckRequired] = useState("No");

  // Dropdown options
  const categoryOptions = ["Community", "Environmental", "Health", "Other"];
  const policeCheckOptions = ["Yes", "No"];

  // Handle form submission
  const handleSubmit = () => {
    if (!actName || !startDate || !endDate || !location || !description) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newAct = {
      actName,
      startDate,
      endDate,
      location,
      category,
      description,
      policeCheckRequired,
    };

    console.log("New Act Submitted:", newAct);
    Alert.alert("Success", "New Act has been posted!");

    // Reset form after submission
    setActName("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setCategory("Community");
    setDescription("");
    setPoliceCheckRequired("No");

    // Optionally navigate to a different screen
    navigation.navigate("HomeScreen"); // or any other screen in your stack
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Act Name */}
      <Text>Act Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
        }}
        value={actName}
        onChangeText={setActName}
        placeholder="Enter act name"
      />

      {/* Start Date */}
      <Text>Start Date</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
        }}
        value={startDate}
        onChangeText={setStartDate}
        placeholder="Enter start date"
      />

      {/* End Date */}
      <Text>End Date</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
        }}
        value={endDate}
        onChangeText={setEndDate}
        placeholder="Enter end date"
      />

      {/* Location */}
      <Text>Location</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
        }}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />

      {/* Category */}
      <Text>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={{ height: 50, marginBottom: 12 }}
      >
        {categoryOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>

      {/* Description */}
      <Text>Description</Text>
      <TextInput
        style={{
          height: 80,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
          textAlignVertical: "top",
        }}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      {/* Police Check Required */}
      <Text>Police Check Required</Text>
      <Picker
        selectedValue={policeCheckRequired}
        onValueChange={(itemValue) => setPoliceCheckRequired(itemValue)}
        style={{ height: 50, marginBottom: 12 }}
      >
        {policeCheckOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>

      {/* Submit Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#46B3A5",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Post New Act</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostActScreen;
