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
import { getAllOpportunities } from "@/lib/api";
import { Act } from "@/lib/types";
import { styles as externalStyles } from "@/src/components/Styles";
import SearchInput from "@/src/components/SearchInput";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ActsScreen() {
  const router = useRouter();
  const [acts, setActs] = useState<Act[]>([]);
  const [filteredActs, setFilteredActs] = useState<Act[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [volunteerModalVisible, setVolunteerModalVisible] =
    useState<boolean>(false);
  const [selectedAct, setSelectedAct] = useState<Act | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);

  const fetchActs = async () => {
    try {
      const response = await getAllOpportunities();
      const sortedActs = response.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setActs(sortedActs);
      setFilteredActs(sortedActs);
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
    setVolunteerModalVisible(false);
    Alert.alert(
      "Volunteer Confirmation",
      `You have successfully signed up to volunteer for the act: ${selectedAct?.title}.`
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
          <ThemedView style={externalStyles.card}>
            <TouchableOpacity
              onPress={() => router.push(`/acts/${item.id}` as `/acts/[actId]`)}
            >
              <View style={externalStyles.cardContent}>
                <Image
                  source={require("@/assets/images/5856.jpg")}
                  style={externalStyles.userIcon}
                />
                <View style={externalStyles.textContent}>
                  <ThemedText type="subtitle" style={externalStyles.cardTitle}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={externalStyles.cardDescription}>
                    {item.description}
                  </ThemedText>
                  <ThemedText style={externalStyles.cardDetails}>
                    <Text>
                      Location: {item.location} | Category: {item.category}
                    </Text>
                  </ThemedText>
                </View>
              </View>
            </TouchableOpacity>
            {/* Volunteer Button */}
            <TouchableOpacity
              style={externalStyles.volunteerButton}
              onPress={() => {
                setSelectedAct(item);
                setVolunteerModalVisible(true);
              }}
            >
              <Text style={externalStyles.buttonText}>Volunteer</Text>
            </TouchableOpacity>
          </ThemedView>
        )}
        contentContainerStyle={externalStyles.listContent}
      />

      {/* Volunteer Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={volunteerModalVisible}
        onRequestClose={() => setVolunteerModalVisible(false)}
      >
        <View style={externalStyles.modalOverlay}>
          <View style={externalStyles.modalContainer}>
            <Text style={externalStyles.modalTitle}>
              Confirm Volunteer Action
            </Text>
            <Text style={externalStyles.modalDescription}>
              Are you sure you want to volunteer for the following act?
            </Text>
            <Text style={externalStyles.modalDescription}>
              <Text style={{ fontWeight: "bold" }}>{selectedAct?.title}</Text>
            </Text>
            <View style={externalStyles.modalButtonContainer}>
              <TouchableOpacity
                style={[externalStyles.button, externalStyles.cancelButton]}
                onPress={() => setVolunteerModalVisible(false)}
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
