// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   FlatList,
//   Image,
//   View,
//   TouchableOpacity,
//   Modal,
//   Text,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { ThemedText } from "@/src/components/ThemedText";
// import { ThemedView } from "@/src/components/ThemedView";
// import { getAllResources } from "../../lib/api";
// import { Alm } from "../../lib/types";
// import { useNavigation, NavigationProp } from "@react-navigation/native";
// import { RootStackParamList } from "../../lib/types";
// import { MaterialIcons } from "@expo/vector-icons";
// import { styles as externalStyles } from "../components/Styles";
// import SearchInput from "../components/SearchInput";
// import { API_URL } from "../../lib/api";

// export default function AlmsScreen() {
//   const [resources, setResources] = useState<Alm[]>([]);
//   const [filteredResources, setFilteredResources] = useState<Alm[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedAlm, setSelectedAlm] = useState<Alm | null>(null);
//   const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
//   const [claimModalVisible, setClaimModalVisible] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
//   const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

//   const [showCategoryDropdown, setShowCategoryDropdown] =
//     useState<boolean>(false);
//   const [showLocationDropdown, setShowLocationDropdown] =
//     useState<boolean>(false);
//   const [showConditionDropdown, setShowConditionDropdown] =
//     useState<boolean>(false);

//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   const fetchResources = async () => {
//     try {
//       const response = await getAllResources();
//       // Sort resources by `created_at` in descending order
//       const sortedResources = response.sort(
//         (a, b) =>
//           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       );

//       setResources(sortedResources);
//       setFilteredResources(sortedResources);
//     } catch (error) {
//       console.error("Error fetching resources:", error);
//       setError("Failed to load resources");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchResources();
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setFilteredResources(resources);
//     } else {
//       setFilteredResources(
//         resources.filter(
//           (alm) =>
//             alm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             alm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             alm.location.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     }
//   }, [searchQuery, resources]);

//   // Filter resources based on the selected filters
//   useEffect(() => {
//     let filtered = resources;

//     if (selectedCategories.length > 0) {
//       filtered = filtered.filter((alm) =>
//         selectedCategories.includes(alm.category)
//       );
//     }

//     if (selectedLocations.length > 0) {
//       filtered = filtered.filter((alm) =>
//         selectedLocations.includes(alm.location)
//       );
//     }

//     if (selectedConditions.length > 0) {
//       filtered = filtered.filter((alm) =>
//         selectedConditions.includes(alm.condition)
//       );
//     }

//     setFilteredResources(filtered);
//   }, [selectedCategories, selectedLocations, selectedConditions, resources]);

//   const handleClaimAlm = () => {
//     setClaimModalVisible(false);
//     Alert.alert(
//       "Claim Submitted",
//       "The poster of this item has been notified."
//     );
//   };

//   const handleCheckboxChange = (
//     item: string,
//     selectedItems: string[],
//     setSelectedItems: (value: string[]) => void
//   ) => {
//     if (selectedItems.includes(item)) {
//       setSelectedItems(selectedItems.filter((i) => i !== item));
//     } else {
//       setSelectedItems([...selectedItems, item]);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={externalStyles.loadingContainer}>
//         <ThemedText>Loading...</ThemedText>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={externalStyles.errorContainer}>
//         <ThemedText>{error}</ThemedText>
//       </View>
//     );
//   }

//   // Extract unique categories, locations, and conditions
//   const categories = [...new Set(resources.map((alm) => alm.category))];
//   const locations = [...new Set(resources.map((alm) => alm.location))];
//   const conditions = [...new Set(resources.map((alm) => alm.condition))];

//   return (
//     <View style={{ flex: 1 }}>
//       <SearchInput
//         placeholder="Search alms..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         autoCorrect={false}
//         autoCapitalize="none"
//       />

//       <FlatList
//         data={filteredResources}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate("AlmsDetailsScreen", { almId: item.id });
//             }}
//           >
//             <ThemedView style={externalStyles.card}>
//               <Image
//                 source={
//                   item.image_url
//                     ? {
//                         uri: item.image_url.startsWith("http")
//                           ? item.image_url
//                           : `${API_URL}${item.image_url}`,
//                       }
//                     : require("../../assets/images/favicon.png") // Local fallback
//                 }
//                 style={externalStyles.cardImage}
//               />
//               <ThemedText type="subtitle" style={externalStyles.cardTitle}>
//                 {item.name}
//               </ThemedText>
//               <ThemedText style={externalStyles.cardDescription}>
//                 {item.description}
//               </ThemedText>
//               <ThemedText style={externalStyles.cardDetails}>
//                 Quantity: {item.quantity} | Location: {item.location}
//               </ThemedText>
//               <TouchableOpacity
//                 style={externalStyles.iconContainer}
//                 onPress={() => {
//                   setSelectedAlm(item);
//                   setClaimModalVisible(true);
//                 }}
//               >
//                 <MaterialIcons
//                   name="volunteer-activism"
//                   size={28}
//                   color="#F58216"
//                 />
//               </TouchableOpacity>
//             </ThemedView>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={externalStyles.listContent}
//       />
//       {/* Claim Confirmation Modal */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={claimModalVisible}
//         onRequestClose={() => setClaimModalVisible(false)}
//       >
//         <View style={externalStyles.modalOverlay}>
//           <View style={externalStyles.modalContainer}>
//             <Text style={externalStyles.modalTitle}>Claim Alm</Text>
//             <View style={externalStyles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={[externalStyles.button, externalStyles.clearButton]}
//                 onPress={() => setClaimModalVisible(false)}
//               >
//                 <Text style={externalStyles.buttonText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[externalStyles.button, externalStyles.applyButton]}
//                 onPress={handleClaimAlm}
//               >
//                 <Text style={externalStyles.buttonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Filter Modal */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={filterModalVisible}
//         onRequestClose={() => setFilterModalVisible(false)}
//       >
//         <ScrollView contentContainerStyle={styles.modalOverlay}>
//           <View style={[styles.modalContainer, { paddingHorizontal: 20 }]}>
//             {/* Close Icon */}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setFilterModalVisible(false)}
//             >
//               <MaterialIcons name="close" size={28} color="black" />
//             </TouchableOpacity>

//             {/* Modal Title */}
//             <Text style={styles.modalTitle}>Filter Alms</Text>

//             {/* Category Filter */}
//             <TouchableOpacity
//               onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
//             >
//               <Text style={styles.filterLabel}>
//                 Category {showCategoryDropdown ? "▲" : "▼"}
//               </Text>
//             </TouchableOpacity>
//             {showCategoryDropdown &&
//               categories.map((category) => (
//                 <View key={category} style={styles.checkboxContainer}>
//                   <TouchableOpacity
//                     onPress={() =>
//                       handleCheckboxChange(
//                         category,
//                         selectedCategories,
//                         setSelectedCategories
//                       )
//                     }
//                   >
//                     <MaterialIcons
//                       name={
//                         selectedCategories.includes(category)
//                           ? "check-box"
//                           : "check-box-outline-blank"
//                       }
//                       size={24}
//                       color="#F58216"
//                     />
//                   </TouchableOpacity>
//                   <Text style={styles.checkboxLabel}>{category}</Text>
//                 </View>
//               ))}

//             {/* Location Filter */}
//             <TouchableOpacity
//               onPress={() => setShowLocationDropdown(!showLocationDropdown)}
//             >
//               <Text style={styles.filterLabel}>
//                 Location {showLocationDropdown ? "▲" : "▼"}
//               </Text>
//             </TouchableOpacity>
//             {showLocationDropdown &&
//               locations.map((location) => (
//                 <View key={location} style={styles.checkboxContainer}>
//                   <TouchableOpacity
//                     onPress={() =>
//                       handleCheckboxChange(
//                         location,
//                         selectedLocations,
//                         setSelectedLocations
//                       )
//                     }
//                   >
//                     <MaterialIcons
//                       name={
//                         selectedLocations.includes(location)
//                           ? "check-box"
//                           : "check-box-outline-blank"
//                       }
//                       size={24}
//                       color="#F58216"
//                     />
//                   </TouchableOpacity>
//                   <Text style={styles.checkboxLabel}>{location}</Text>
//                 </View>
//               ))}

//             {/* Condition Filter */}
//             <TouchableOpacity
//               onPress={() => setShowConditionDropdown(!showConditionDropdown)}
//             >
//               <Text style={styles.filterLabel}>
//                 Condition {showConditionDropdown ? "▲" : "▼"}
//               </Text>
//             </TouchableOpacity>
//             {showConditionDropdown &&
//               conditions.map((condition) => (
//                 <View key={condition} style={styles.checkboxContainer}>
//                   <TouchableOpacity
//                     onPress={() =>
//                       handleCheckboxChange(
//                         condition,
//                         selectedConditions,
//                         setSelectedConditions
//                       )
//                     }
//                   >
//                     <MaterialIcons
//                       name={
//                         selectedConditions.includes(condition)
//                           ? "check-box"
//                           : "check-box-outline-blank"
//                       }
//                       size={24}
//                       color="#F58216"
//                     />
//                   </TouchableOpacity>
//                   <Text style={styles.checkboxLabel}>{condition}</Text>
//                 </View>
//               ))}

//             {/* Buttons */}
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={[styles.button, styles.clearButton]}
//                 onPress={() => {
//                   setSelectedCategories([]);
//                   setSelectedLocations([]);
//                   setSelectedConditions([]);
//                   setFilterModalVisible(false);
//                 }}
//               >
//                 <Text style={styles.buttonText}>Clear Filters</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.button, styles.applyButton]}
//                 onPress={() => setFilterModalVisible(false)}
//               >
//                 <Text style={styles.buttonText}>Apply Filters</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </Modal>
//     </View>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { getAllResources } from "../../lib/api";
import { Alm } from "../../lib/types";
import { styles as externalStyles } from "../components/Styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../lib/types";
import SearchInput from "../components/SearchInput";
import { MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "../../lib/api";

export default function AlmsScreen() {
  const [resources, setResources] = useState<Alm[]>([]);
  const [filteredResources, setFilteredResources] = useState<Alm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
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

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        ListHeaderComponent={
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
              <ThemedText style={externalStyles.filterButtonText}>
                Filter
              </ThemedText>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AlmsDetailsScreen", { almId: item.id })
            }
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
                    : require("../../assets/images/favicon.png") // Local fallback image
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
            </ThemedView>
          </TouchableOpacity>
        )}
        contentContainerStyle={externalStyles.listContent}
      />

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
