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
import { getAllOpportunities } from "../../lib/api";
import { Act } from "../../lib/types";
import { styles as externalStyles } from "../components/Styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../lib/types";
import SearchInput from "../components/SearchInput";
import { MaterialIcons } from "@expo/vector-icons";

export default function ActsScreen() {
  const [acts, setActs] = useState<Act[]>([]);
  const [filteredActs, setFilteredActs] = useState<Act[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAct, setSelectedAct] = useState<Act | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchActs = async () => {
    try {
      const response = await getAllOpportunities();
      setActs(response);
      setFilteredActs(response);
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
      setFilteredActs(acts);
    } else {
      setFilteredActs(
        acts.filter(
          (act) =>
            act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            act.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, acts]);

  useEffect(() => {
    let filtered = acts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((act) =>
        selectedCategories.includes(act.category)
      );
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter((act) =>
        selectedLocations.includes(act.location)
      );
    }

    setFilteredActs(filtered);
  }, [selectedCategories, selectedLocations, acts]);

  const handleVolunteer = () => {
    setModalVisible(false);
    Alert.alert(
      "Volunteer Confirmation",
      "You have successfully signed up to volunteer for this act. The poster of this act has been notified."
    );
  };

  const handleCheckboxChange = (
    item: string,
    selectedItems: string[],
    setSelectedItems: (value: string[]) => void
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

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

  // Extract unique categories and locations from the acts data
  const categories = [...new Set(acts.map((act) => act.category))];
  const locations = [...new Set(acts.map((act) => act.location))];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredActs}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <ThemedView style={externalStyles.titleContainer}>
              <ThemedText type="title">Available Acts</ThemedText>
            </ThemedView>

            <SearchInput
              placeholder="Search all acts"
              onChangeText={(text) => setSearchQuery(text)}
            />

            <TouchableOpacity
              style={externalStyles.filterButton}
              onPress={() => setFilterModalVisible(true)}
            >
              <ThemedText style={externalStyles.filterButtonText}>
                Filter
              </ThemedText>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ActsDetailsScreen", { actId: item.id })
            }
          >
            <ThemedView style={externalStyles.card}>
              <View style={externalStyles.cardContent}>
                <Image
                  source={require("../../assets/images/5856.jpg")}
                  style={externalStyles.userIcon}
                />
                <View style={externalStyles.textContent}>
                  <ThemedText type="subtitle" style={externalStyles.cardTitle}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={externalStyles.cardDescription}>
                    {item.description}
                  </ThemedText>
                </View>
              </View>

              <TouchableOpacity
                style={externalStyles.volunteerButton}
                onPress={(event) => {
                  event.stopPropagation();
                  setSelectedAct(item);
                  setModalVisible(true);
                }}
              >
                <Text style={externalStyles.buttonText}>Volunteer</Text>
              </TouchableOpacity>
            </ThemedView>
          </TouchableOpacity>
        )}
        contentContainerStyle={externalStyles.listContent}
      />

      {/* Modal for Volunteer Confirmation */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={externalStyles.modalOverlay}>
          <View style={externalStyles.modalContainer}>
            <Text style={externalStyles.modalTitle}>
              Do you wish to volunteer for this act?
            </Text>
            <Text style={externalStyles.modalDescription}>
              {selectedAct?.title} - {selectedAct?.description}
            </Text>
            <View style={externalStyles.modalButtonContainer}>
              <TouchableOpacity
                style={[externalStyles.button, externalStyles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={externalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[externalStyles.button, externalStyles.postButton]}
                onPress={handleVolunteer}
              >
                <Text style={externalStyles.buttonText}>Confirm</Text>
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
          <View
            style={[externalStyles.modalContainer, { paddingHorizontal: 20 }]}
          >
            <TouchableOpacity
              style={externalStyles.closeButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <MaterialIcons name="close" size={28} color="black" />
            </TouchableOpacity>

            <Text style={externalStyles.modalTitle}>Filter Acts</Text>

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

            {/* Buttons */}
            <View style={externalStyles.modalButtonContainer}>
              <TouchableOpacity
                style={[externalStyles.button, externalStyles.clearButton]}
                onPress={() => {
                  setSelectedCategories([]);
                  setSelectedLocations([]);
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
  filterLabel: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButton: {
    backgroundColor: "#ccc",
  },
  applyButton: {
    backgroundColor: "#F58216",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
