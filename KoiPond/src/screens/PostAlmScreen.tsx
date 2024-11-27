import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // For image uploads
import { Picker } from "@react-native-picker/picker"; // For dropdown
import { styles } from "../components/Styles";
import { useNavigation } from "@react-navigation/native";

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
      setImages((prev) => [...prev, result.assets[0].uri]); // Accessing uri from the assets array
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!almName || !quantity || !location || !description) {
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
    navigation.goBack(); // Navigate back or to a confirmation screen

    // Reset form after submission
    setAlmName("");
    setQuantity("");
    setCondition("New");
    setLocation("");
    setDescription("");
    setCategory("Clothing");
    setImages([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Alm Name */}
      <Text style={styles.label}>Alm Name</Text>
      <TextInput
        style={styles.input}
        value={almName}
        onChangeText={setAlmName}
        placeholder="Enter the name of the Alm"
        placeholderTextColor="#888"
      />

      {/* Quantity */}
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      {/* Condition Dropdown */}
      <Text style={styles.label}>Condition</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={condition}
          onValueChange={(itemValue) => setCondition(itemValue)}
          style={styles.picker}
        >
          {conditionOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      {/* Pickup/Dropoff Location */}
      <Text style={styles.label}>Pickup/Dropoff Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
        placeholderTextColor="#888"
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter a description"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
      />

      {/* Category Dropdown */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {categoryOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      {/* Image Upload */}
      <Text style={styles.label}>Upload Image(s)</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.uploadButtonText}>Select Images</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
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
  );
};

export default PostAlmScreen;
