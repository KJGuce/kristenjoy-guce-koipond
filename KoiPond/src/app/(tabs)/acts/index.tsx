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
import { useRouter } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { getAllOpportunities } from "@/lib/api";
import { Act } from "@/lib/types";
import { styles as externalStyles } from "@/src/components/Styles";
import SearchInput from "@/src/components/SearchInput";
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

  const router = useRouter();

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
            onPress={() => router.push(`/acts/${item.id}` as `/acts/${number}`)}
          >
            <ThemedView style={externalStyles.card}>
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
            </ThemedView>
          </TouchableOpacity>
        )}
        contentContainerStyle={externalStyles.listContent}
      />
    </View>
  );
}
