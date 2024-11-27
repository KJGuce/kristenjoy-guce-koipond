import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { getAllResources } from "../../lib/api";
import { Alm } from "../../lib/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../lib/types";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import { styles } from "../components/Styles";
import SearchInput from "../components/SearchInput"; // Import the existing SearchInput component

export default function AlmsScreen() {
  const [resources, setResources] = useState<Alm[]>([]);
  const [filteredResources, setFilteredResources] = useState<Alm[]>([]); // State to store filtered resources
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlm, setSelectedAlm] = useState<Alm | null>(null); // Track the selected alm for the modal
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Track modal visibility
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to track the search query

  // Use typed navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchResources = async () => {
    try {
      const response = await getAllResources();
      setResources(response);
      setFilteredResources(response); // Initially, show all resources
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    // Filter resources based on the search query
    if (searchQuery.trim() === "") {
      setFilteredResources(resources); // Show all resources if search is empty
    } else {
      setFilteredResources(
        resources.filter(
          (alm) =>
            alm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alm.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, resources]); // Re-filter when the query or resources change

  const handleClaimAlm = () => {
    setModalVisible(false); // Close the modal
    Alert.alert(
      "Claim Submitted",
      "The poster of this item has been notified."
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>{error}</ThemedText>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Use the custom SearchInput component */}
      <SearchInput
        placeholder="Search alms..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <FlatList
        data={filteredResources}
        keyExtractor={(item) => item.id.toString()} // `item.id` is a number, but `keyExtractor` needs a string
        ListHeaderComponent={
          <View>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Available Alms</ThemedText>
            </ThemedView>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Pass almId to the details screen
              navigation.navigate("AlmsDetailsScreen", { almId: item.id });
            }}
          >
            <ThemedView style={styles.card}>
              {/* Alm Image */}
              <Image
                source={{ uri: item.image_url }}
                style={styles.cardImage}
                onError={(error) =>
                  console.log("Error loading image:", error.nativeEvent.error)
                }
              />
              {/* Alm Details */}
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {item.name}
              </ThemedText>
              <ThemedText style={styles.cardDescription}>
                {item.description}
              </ThemedText>
              <ThemedText style={styles.cardDetails}>
                Quantity: {item.quantity} | Location: {item.location}
              </ThemedText>

              {/* Volunteer-Activism Icon */}
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  setSelectedAlm(item); // Set the selected Alm
                  setModalVisible(true); // Show the modal
                }}
              >
                <MaterialIcons
                  name="volunteer-activism"
                  size={28}
                  color="#F58216"
                />
              </TouchableOpacity>
            </ThemedView>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal for Claim Confirmation */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handle back button press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Do you wish to claim this alm?
            </Text>
            <Text style={styles.modalDescription}>
              {selectedAlm?.name} - {selectedAlm?.description}
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.postButton]}
                onPress={handleClaimAlm}
              >
                <Text style={styles.buttonText}>Claim This Alm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
