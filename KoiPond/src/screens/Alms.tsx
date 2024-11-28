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
import RNPickerSelect from "react-native-picker-select"; // Import the picker component
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
  const [filteredResources, setFilteredResources] = useState<Alm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlm, setSelectedAlm] = useState<Alm | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false); // Modal visibility state
  const [claimModalVisible, setClaimModalVisible] = useState<boolean>(false); // Claim confirmation modal visibility state
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [conditionFilter, setConditionFilter] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchResources = async () => {
    try {
      const response = await getAllResources();
      setResources(response);
      setFilteredResources(response);
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
    if (searchQuery.trim() === "") {
      setFilteredResources(resources);
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
  }, [searchQuery, resources]);

  // Filter resources based on the selected filters
  useEffect(() => {
    let filtered = resources;

    if (categoryFilter) {
      filtered = filtered.filter((alm) => alm.category === categoryFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter((alm) => alm.location === locationFilter);
    }

    if (conditionFilter) {
      filtered = filtered.filter((alm) => alm.condition === conditionFilter);
    }

    setFilteredResources(filtered);
  }, [categoryFilter, locationFilter, conditionFilter, resources]);

  const handleClaimAlm = () => {
    setClaimModalVisible(false); // Close modal after claim
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

  // Extract unique categories, locations, and conditions
  const categories = [...new Set(resources.map((alm) => alm.category))];
  const locations = [...new Set(resources.map((alm) => alm.location))];
  const conditions = [...new Set(resources.map((alm) => alm.condition))];

  return (
    <View style={{ flex: 1 }}>
      <SearchInput
        placeholder="Search alms..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <FlatList
        data={filteredResources}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Available Alms</ThemedText>
            </ThemedView>
            {/* Filter Button */}
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFilterModalVisible(true)}
            >
              <ThemedText style={styles.filterButtonText}>Filter</ThemedText>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AlmsDetailsScreen", { almId: item.id });
            }}
          >
            <ThemedView style={styles.card}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.cardImage}
                onError={(error) =>
                  console.log("Error loading image:", error.nativeEvent.error)
                }
              />
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {item.name}
              </ThemedText>
              <ThemedText style={styles.cardDescription}>
                {item.description}
              </ThemedText>
              <ThemedText style={styles.cardDetails}>
                Quantity: {item.quantity} | Location: {item.location}
              </ThemedText>

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  setSelectedAlm(item);
                  setClaimModalVisible(true); // Open the claim confirmation modal
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

      {/* Claim Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={claimModalVisible}
        onRequestClose={() => setClaimModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Claim Alm</Text>

            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={() => setClaimModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              {/* Confirm Button */}
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={handleClaimAlm}
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
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Icon */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <MaterialIcons name="close" size={28} color="black" />
            </TouchableOpacity>

            {/* Modal Title */}
            <Text style={styles.modalTitle}>Filter Alms</Text>

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

            {/* Condition Filter */}
            <Text style={styles.modalLabel}>Condition</Text>
            <RNPickerSelect
              onValueChange={(value) => setConditionFilter(value)}
              items={conditions.map((condition) => ({
                label: condition,
                value: condition,
              }))}
              placeholder={{ label: "Select a condition", value: null }}
              value={conditionFilter}
            />

            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              {/* Clear Filters Button */}
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={() => {
                  setCategoryFilter(null);
                  setLocationFilter(null);
                  setConditionFilter(null);
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Clear Filters</Text>
              </TouchableOpacity>

              {/* Apply Filters Button */}
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => setFilterModalVisible(false)}
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
