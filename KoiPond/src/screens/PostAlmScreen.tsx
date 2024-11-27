import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "../components/Styles"; // Assuming you have a separate styles file

const PostAlmScreen: React.FC = () => {
  const navigation = useNavigation();

  // State variables for form inputs
  const [almName, setAlmName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("New");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [images, setImages] = useState<string[]>([]);

  // Dropdown options
  const conditionOptions = ["New", "Used", "Damaged"];
  const categoryOptions = [
    "Clothing",
    "Food",
    "Furniture",
    "Electronics",
    "Other",
  ];

  // Show condition and category pickers only when clicked
  const [showConditionPicker, setShowConditionPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // Flag to track if the user is interacting with the form
  const [isUserActive, setIsUserActive] = useState(false);

  // Request permissions for media library
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Sorry, we need media library permissions to select an image."
          );
        }
      }
    })();
  }, []);

  // Function to handle image selection
  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (
      !almName ||
      !quantity ||
      !location ||
      !description ||
      !category ||
      !condition
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newAlm = {
      almName,
      quantity,
      condition,
      location,
      description,
      category,
      images,
    };

    console.log("New Alm Submitted:", newAlm);
    Alert.alert("Success", "New Alm has been posted!");
    navigation.goBack();

    // Clear form fields
    setAlmName("");
    setQuantity("");
    setCondition("New");
    setLocation("");
    setDescription("");
    setCategory("Clothing");
    setImages([]);
  };

  // Hide tab bar when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Update the tabBar visibility based on user interaction
      navigation.setOptions({
        tabBarStyle: {
          display: isUserActive ? "none" : "flex", // Hide when user is interacting
        },
      });

      return () => {
        // Reset tab bar visibility when screen loses focus
        navigation.setOptions({
          tabBarStyle: { display: "flex" }, // Show tab bar again
        });
      };
    }, [isUserActive]) // Re-run when isUserActive changes
  );

  // Handle user interaction (typing or selecting from pickers)
  const handleUserInteraction = () => {
    setIsUserActive(true); // User is interacting with the form
  };

  const handleChange = (field: string, value: string) => {
    if (value) {
      handleUserInteraction(); // Mark as active if the user types
    } else {
      setIsUserActive(false); // Stop interaction tracking if the field is empty
    }

    switch (field) {
      case "almName":
        setAlmName(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "condition":
        setCondition(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "category":
        setCategory(value);
        break;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            contentContainerStyle={[
              styles.container,
              { paddingBottom: 150 }, // Ensure enough space at the bottom
            ]}
          >
            {/* Alm Name */}
            <Text style={styles.label}>Alm Name</Text>
            <TextInput
              style={styles.input}
              value={almName}
              onChangeText={(text) => handleChange("almName", text)}
              placeholder="Enter the name of the Alm"
              placeholderTextColor="#888"
            />

            {/* Quantity */}
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={(text) => handleChange("quantity", text)}
              placeholder="Enter quantity"
              placeholderTextColor="#888"
              keyboardType="numeric"
            />

            {/* Condition Dropdown */}
            <Text style={styles.label}>Condition</Text>
            <TouchableOpacity onPress={() => setShowConditionPicker(true)}>
              <TextInput
                style={styles.input}
                value={condition}
                editable={false}
                placeholder="Select Condition"
                placeholderTextColor="#888"
              />
            </TouchableOpacity>
            {showConditionPicker && (
              <View style={[styles.pickerContainer, { zIndex: 10 }]}>
                <Picker
                  selectedValue={condition}
                  onValueChange={(itemValue) => {
                    setCondition(itemValue);
                    setShowConditionPicker(false);
                  }}
                  style={styles.picker}
                >
                  {conditionOptions.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            )}

            {/* Location */}
            <Text style={styles.label}>Pickup/Dropoff Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={(text) => handleChange("location", text)}
              placeholder="Enter location"
              placeholderTextColor="#888"
            />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={(text) => handleChange("description", text)}
              placeholder="Enter a description"
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
            />

            {/* Category Dropdown */}
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity onPress={() => setShowCategoryPicker(true)}>
              <TextInput
                style={styles.input}
                value={category}
                editable={false}
                placeholder="Select Category"
                placeholderTextColor="#888"
              />
            </TouchableOpacity>
            {showCategoryPicker && (
              <View style={[styles.pickerContainer, { zIndex: 10 }]}>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => {
                    setCategory(itemValue);
                    setShowCategoryPicker(false);
                  }}
                  style={styles.picker}
                >
                  {categoryOptions.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            )}

            {/* Image Upload */}
            <Text style={styles.label}>Upload Image(s)</Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImageUpload}
            >
              <Text style={styles.uploadButtonText}>Select Images</Text>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.image}
                />
              ))}
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setAlmName("");
                  setQuantity("");
                  setCondition("New");
                  setLocation("");
                  setDescription("");
                  setCategory("Clothing");
                  setImages([]);
                  navigation.goBack();
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.postButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Post New Alm</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostAlmScreen;
