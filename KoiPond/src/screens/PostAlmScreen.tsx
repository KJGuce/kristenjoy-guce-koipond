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
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { postNewAlm } from "../../lib/api"; // Import the API function

const PostAlmScreen: React.FC = () => {
  const navigation = useNavigation();

  // State variables for form inputs
  const [almName, setAlmName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState<string>("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  // Dropdown options
  const conditionOptions = [
    { label: "New", value: "New" },
    { label: "Used", value: "Used" },
    { label: "Damaged", value: "Damaged" },
  ];

  const categoryOptions = [
    { label: "Clothing", value: "Clothing" },
    { label: "Food", value: "Food" },
    { label: "Furniture", value: "Furniture" },
    { label: "Electronics", value: "Electronics" },
    { label: "Other", value: "Other" },
  ];

  const [isUserActive, setIsUserActive] = useState(false);

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

  // Function to handle image selection from the gallery
  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri; // Get the URI of the selected image
      console.log("Selected Image URI:", imageUri); // Log the URI here
      setImages((prev) => [...prev, imageUri]);
    } else {
      console.log("Image selection was canceled."); // Log cancellation for debugging
    }
  };

  // Function to handle taking a photo using the camera
  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri; // Get the URI of the taken photo
      console.log("Captured Image URI:", imageUri); // Log the URI here
      setImages((prev) => [...prev, imageUri]);
    } else {
      console.log("Camera capture was canceled."); // Log cancellation for debugging
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (
      !almName.trim() ||
      !quantity.trim() ||
      !location.trim() ||
      !description.trim() ||
      !category.trim() ||
      !condition.trim()
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newAlm = {
      name: almName,
      description,
      category,
      quantity: Number(quantity),
      location,
      condition,
      image: images[0] || null, // Assuming a single image upload for now
    };

    try {
      const response = await postNewAlm(newAlm);
      console.log("Backend response for new resource:", response);

      Alert.alert("Success", "New Alm has been posted!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to post new Alm.");
      console.error("Post Alm Error:", error);
    }

    // Reset form
    setAlmName("");
    setQuantity("");
    setCondition("");
    setLocation("");
    setDescription("");
    setCategory("");
    setImages([]);
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        tabBarStyle: {
          display: isUserActive ? "none" : "flex",
        },
      });

      return () => {
        navigation.setOptions({
          tabBarStyle: { display: "flex" },
        });
      };
    }, [isUserActive])
  );

  const handleUserInteraction = () => {
    setIsUserActive(true);
  };

  const handleChange = (field: string, value: string) => {
    if (value) {
      handleUserInteraction();
    } else {
      setIsUserActive(false);
    }

    switch (field) {
      case "almName":
        setAlmName(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "description":
        setDescription(value);
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
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <Text style={styles.label}>
                Alm Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={almName}
                onChangeText={(text) => handleChange("almName", text)}
                placeholder="Enter the name of the Alm"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>
                Quantity <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={(text) => handleChange("quantity", text)}
                placeholder="Enter quantity"
                placeholderTextColor="#888"
                keyboardType="numeric"
              />

              <Text style={styles.label}>
                Condition <Text style={styles.required}>*</Text>
              </Text>
              <Dropdown
                data={conditionOptions}
                labelField="label"
                valueField="value"
                placeholder="Select Condition"
                value={condition}
                onChange={(item) => setCondition(item.value)}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
              />

              <Text style={styles.label}>
                Pickup/Dropoff Location <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={(text) => handleChange("location", text)}
                placeholder="Enter location"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>
                Description <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={(text) => handleChange("description", text)}
                placeholder="Enter a description"
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
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

              <Text style={styles.label}>Upload Image(s)</Text>
              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleImageUpload}
                >
                  <MaterialIcons name="photo-library" size={24} color="#fff" />
                  <Text style={styles.uploadButtonText}>
                    Select from Gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleTakePhoto}
                >
                  <MaterialIcons name="photo-camera" size={24} color="#fff" />
                  <Text style={styles.uploadButtonText}>Take a Photo</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.imageContainer}>
                {images.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.image}
                  />
                ))}
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setAlmName("");
                  setQuantity("");
                  setCondition("");
                  setLocation("");
                  setDescription("");
                  setCategory("");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingBottom: 150,
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
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F58216",
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff", // Optional: Add a background to distinguish it
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
    backgroundColor: "#F58216",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
