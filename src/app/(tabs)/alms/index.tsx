import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { getAllResources, API_URL } from "@/lib/api";
import { Alm } from "@/lib/types";
import { styles as externalStyles } from "@/src/components/Styles";
import { useRouter } from "expo-router";
import SearchInput from "@/src/components/SearchInput";
import { MaterialIcons } from "@expo/vector-icons";

export default function AlmsScreen() {
  const router = useRouter();
  const [resources, setResources] = useState<Alm[]>([]);
  const [filteredResources, setFilteredResources] = useState<Alm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [claimModalVisible, setClaimModalVisible] = useState<boolean>(false);
  const [selectedAlm, setSelectedAlm] = useState<Alm | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);
  const [showConditionDropdown, setShowConditionDropdown] =
    useState<boolean>(false);

  const fetchResources = async () => {
    try {
      const response = await getAllResources();
      const sortedResources = response.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setResources(sortedResources);
      setFilteredResources(sortedResources);
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
          (resource) =>
            resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            resource.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, resources]);

  useEffect(() => {
    let filtered = resources;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((resource) =>
        selectedCategories.includes(resource.category)
      );
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter((resource) =>
        selectedLocations.includes(resource.location)
      );
    }

    if (selectedConditions.length > 0) {
      filtered = filtered.filter((resource) =>
        selectedConditions.includes(resource.condition)
      );
    }

    setFilteredResources(filtered);
  }, [selectedCategories, selectedLocations, selectedConditions, resources]);

  const handleClaimAlm = () => {
    if (selectedAlm) {
      Alert.alert(
        "Claim Request Sent",
        `Your claim request for "${selectedAlm.name}" has been submitted. The poster will be notified.`,
        [{ text: "OK", onPress: () => setClaimModalVisible(false) }]
      );
    } else {
      Alert.alert("Error", "No Alm selected to claim.");
    }
  };

  const handleCheckboxChange = (
    item: string,
    selectedItems: string[],
    setSelectedItems: (value: string[]) => void
  ) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
  };

  const renderHeader = () => (
    <View>
      <ThemedView style={externalStyles.titleContainer}>
        <ThemedText type="title">Available Alms</ThemedText>
      </ThemedView>

      <SearchInput
        placeholder="Search all resources"
        onChangeText={(text) => setSearchQuery(text)}
      />

      <TouchableOpacity
        style={externalStyles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <ThemedText style={externalStyles.filterButtonText}>Filter</ThemedText>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={externalStyles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={externalStyles.errorContainer}>
        <ThemedText>{error}</ThemedText>
      </View>
    );
  }

  const categories = [
    ...new Set(resources.map((resource) => resource.category)),
  ];
  const locations = [
    ...new Set(resources.map((resource) => resource.location)),
  ];
  const conditions = [
    ...new Set(resources.map((resource) => resource.condition)),
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredResources}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/alms/${item.id}` as `/alms/[almId]`)}
          >
            <ThemedView style={externalStyles.card}>
              <Image
                source={
                  item.image_url
                    ? {
                        uri: item.image_url.startsWith("http")
                          ? item.image_url
                          : `${API_URL}${item.image_url}`,
                      }
                    : require("@/assets/images/favicon.png")
                }
                style={externalStyles.cardImage}
              />
              <ThemedText type="subtitle" style={externalStyles.cardTitle}>
                {item.name}
              </ThemedText>
              <ThemedText style={externalStyles.cardDescription}>
                {item.description}
              </ThemedText>
              <ThemedText style={externalStyles.cardDetails}>
                Quantity: {item.quantity} | Location: {item.location} |
                Condition: {item.condition}
              </ThemedText>
              <TouchableOpacity
                style={styles.claimButton}
                onPress={() => {
                  setSelectedAlm(item);
                  setClaimModalVisible(true);
                }}
              >
                <MaterialIcons
                  name="volunteer-activism"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </ThemedView>
          </TouchableOpacity>
        )}
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
            {selectedAlm && (
              <Text style={styles.modalDescription}>
                Are you sure you want to claim "{selectedAlm.name}"?
              </Text>
            )}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setClaimModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
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
        <ScrollView contentContainerStyle={externalStyles.modalOverlay}>
          <View style={externalStyles.modalContainer}>
            <TouchableOpacity
              style={externalStyles.closeButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <MaterialIcons name="close" size={28} color="black" />
            </TouchableOpacity>
            <Text style={externalStyles.modalTitle}>Filter Resources</Text>

            {/* Category Filter */}
            <TouchableOpacity
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Text style={externalStyles.filterLabel}>
                Category {showCategoryDropdown ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
            {showCategoryDropdown &&
              categories.map((category) => (
                <View key={category} style={externalStyles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleCheckboxChange(
                        category,
                        selectedCategories,
                        setSelectedCategories
                      )
                    }
                  >
                    <MaterialIcons
                      name={
                        selectedCategories.includes(category)
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={24}
                      color="#F58216"
                    />
                  </TouchableOpacity>
                  <Text style={externalStyles.checkboxLabel}>{category}</Text>
                </View>
              ))}

            {/* Location Filter */}
            <TouchableOpacity
              onPress={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              <Text style={externalStyles.filterLabel}>
                Location {showLocationDropdown ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
            {showLocationDropdown &&
              locations.map((location) => (
                <View key={location} style={externalStyles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleCheckboxChange(
                        location,
                        selectedLocations,
                        setSelectedLocations
                      )
                    }
                  >
                    <MaterialIcons
                      name={
                        selectedLocations.includes(location)
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={24}
                      color="#F58216"
                    />
                  </TouchableOpacity>
                  <Text style={externalStyles.checkboxLabel}>{location}</Text>
                </View>
              ))}

            {/* Condition Filter */}
            <TouchableOpacity
              onPress={() => setShowConditionDropdown(!showConditionDropdown)}
            >
              <Text style={externalStyles.filterLabel}>
                Condition {showConditionDropdown ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
            {showConditionDropdown &&
              conditions.map((condition) => (
                <View key={condition} style={externalStyles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleCheckboxChange(
                        condition,
                        selectedConditions,
                        setSelectedConditions
                      )
                    }
                  >
                    <MaterialIcons
                      name={
                        selectedConditions.includes(condition)
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={24}
                      color="#F58216"
                    />
                  </TouchableOpacity>
                  <Text style={externalStyles.checkboxLabel}>{condition}</Text>
                </View>
              ))}

            {/* Buttons */}
            <View style={externalStyles.modalButtonContainer}>
              <TouchableOpacity
                style={[externalStyles.button, externalStyles.clearButton]}
                onPress={() => {
                  setSelectedCategories([]);
                  setSelectedLocations([]);
                  setSelectedConditions([]);
                  setFilterModalVisible(false);
                }}
              >
                <Text style={externalStyles.buttonText}>Clear Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[externalStyles.button, externalStyles.applyButton]}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={externalStyles.buttonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  claimButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#F58216", // Icon background color
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#F58216",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
