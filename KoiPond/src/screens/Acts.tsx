import React, { useState, useEffect } from "react";
import {
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
import { getAllOpportunities } from "../../lib/api"; // Update API call to fetch acts
import { Act } from "../../lib/types"; // Replace with Act type
import { styles } from "../components/Styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../lib/types";
import SearchInput from "../components/SearchInput"; // Import the SearchInput component
import RNPickerSelect from "react-native-picker-select"; // Import the picker component

export default function ActsScreen() {
  const [acts, setActs] = useState<Act[]>([]);
  const [filteredActs, setFilteredActs] = useState<Act[]>([]); // State to store filtered acts
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAct, setSelectedAct] = useState<Act | null>(null); // Selected Act for modal
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Modal visibility
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false); // Filter Modal visibility
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null); // Category filter state
  const [locationFilter, setLocationFilter] = useState<string | null>(null); // Location filter state

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchActs = async () => {
    try {
      const response = await getAllOpportunities();
      setActs(response);
      setFilteredActs(response); // Initially, show all acts
    } catch (error) {
      console.error("Error fetching acts:", error);
      setError("Failed to load volunteer opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActs();
  }, []);

  useEffect(() => {
    // Filter acts based on the search query
    if (searchQuery.trim() === "") {
      setFilteredActs(acts); // Show all acts if search is empty
    } else {
      setFilteredActs(
        acts.filter(
          (act) =>
            act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            act.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, acts]); // Re-filter when the query or acts change

  // Filter acts based on selected filters (category and location)
  useEffect(() => {
    let filtered = acts;

    if (categoryFilter) {
      filtered = filtered.filter((act) => act.category === categoryFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter((act) => act.location === locationFilter);
    }

    setFilteredActs(filtered);
  }, [categoryFilter, locationFilter, acts]);

  const handleVolunteer = () => {
    setModalVisible(false); // Close the modal
    Alert.alert(
      "Volunteer Confirmation",
      "You have successfully signed up to volunteer for this act. The poster of this act has been notified."
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

  // Extract unique categories and locations from the acts data
  const categories = [...new Set(acts.map((act) => act.category))];
  const locations = [...new Set(acts.map((act) => act.location))];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredActs}
        keyExtractor={(item) => item.id.toString()} // Ensure `item.id` is stringified
        ListHeaderComponent={
          <View>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Available Acts</ThemedText>
            </ThemedView>

            {/* SearchInput added below the title */}
            <SearchInput
              placeholder="Search all alms and acts" // Placeholder text
              onChangeText={(text) => setSearchQuery(text)} // Update search query
            />

            {/* Filter Button */}
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFilterModalVisible(true)} // Open filter modal
            >
              <ThemedText style={styles.filterButtonText}>Filter</ThemedText>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ActsDetailsScreen", { actId: item.id })
            }
          >
            <ThemedView style={styles.card}>
              <View style={styles.cardContent}>
                {/* Placeholder User Icon */}
                <Image
                  source={require("../../assets/images/5856.jpg")} // Replace with your placeholder user image path
                  style={styles.userIcon}
                />
                <View style={styles.textContent}>
                  {/* Act Details */}
                  <ThemedText type="subtitle" style={styles.cardTitle}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={styles.cardDescription}>
                    {item.description}
                  </ThemedText>
                </View>
              </View>

              {/* Volunteer Button */}
              <TouchableOpacity
                style={styles.volunteerButton}
                onPress={(event) => {
                  event.stopPropagation(); // Prevent triggering the card navigation
                  setSelectedAct(item); // Set selected act
                  setModalVisible(true); // Open modal
                }}
              >
                <Text style={styles.buttonText}>Volunteer</Text>
              </TouchableOpacity>
            </ThemedView>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal for Volunteer Confirmation */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handle back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Do you wish to volunteer for this act?
            </Text>
            <Text style={styles.modalDescription}>
              {selectedAct?.title} - {selectedAct?.description}
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
                onPress={handleVolunteer} // Handle confirmation
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)} // Handle back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Acts</Text>

            {/* Category Filter */}
            <Text style={styles.modalLabel}>Category</Text>
            <RNPickerSelect
              onValueChange={(value) => setCategoryFilter(value)}
              items={categories.map((category) => ({
                label: category,
                value: category,
              }))}
              placeholder={{ label: "Select a category", value: null }}
              value={categoryFilter}
            />

            {/* Location Filter */}
            <Text style={styles.modalLabel}>Location</Text>
            <RNPickerSelect
              onValueChange={(value) => setLocationFilter(value)}
              items={locations.map((location) => ({
                label: location,
                value: location,
              }))}
              placeholder={{ label: "Select a location", value: null }}
              value={locationFilter}
            />

            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={() => {
                  setCategoryFilter(null);
                  setLocationFilter(null);
                }}
              >
                <Text style={styles.buttonText}>Clear Filters</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => setFilterModalVisible(false)} // Close modal
              >
                <Text style={styles.buttonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
