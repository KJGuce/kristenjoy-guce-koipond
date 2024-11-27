// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   FlatList,
//   Image,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import { ThemedText } from "@/src/components/ThemedText";
// import { ThemedView } from "@/src/components/ThemedView";
// import { getAllResources } from "../../lib/api";
// import { Alm } from "../../lib/types";
// import { useNavigation, NavigationProp } from "@react-navigation/native";
// import { RootStackParamList } from "../../lib/types";
// import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
// import { styles } from "../components/Styles";

// export default function AlmsScreen() {
//   const [resources, setResources] = useState<Alm[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Use typed navigation
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   const fetchResources = async () => {
//     try {
//       const response = await getAllResources();
//       setResources(response);
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

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ThemedText>Loading...</ThemedText>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <ThemedText>{error}</ThemedText>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={resources}
//       keyExtractor={(item) => item.id.toString()} // `item.id` is a number, but `keyExtractor` needs a string
//       ListHeaderComponent={
//         <View>
//           <Image
//             source={require("@/assets/images/logo-placeholder-image.png")}
//             style={styles.headerImage}
//           />
//           <ThemedView style={styles.titleContainer}>
//             <ThemedText type="title">Alms (Resources)</ThemedText>
//           </ThemedView>
//         </View>
//       }
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           onPress={() => {
//             // Pass almId to the details screen
//             navigation.navigate("AlmsDetailsScreen", { almId: item.id });
//           }}
//         >
//           <ThemedView style={styles.card}>
//             {/* Alm Image */}
//             <Image
//               source={{ uri: item.image_url }}
//               style={styles.cardImage}
//               onError={(error) =>
//                 console.log("Error loading image:", error.nativeEvent.error)
//               }
//             />
//             {/* Alm Details */}
//             <ThemedText type="subtitle" style={styles.cardTitle}>
//               {item.name}
//             </ThemedText>
//             <ThemedText style={styles.cardDescription}>
//               {item.description}
//             </ThemedText>
//             <ThemedText style={styles.cardDetails}>
//               Quantity: {item.quantity} | Location: {item.location}
//             </ThemedText>

//             {/* Volunteer-Activism Icon */}
//             <TouchableOpacity
//               style={styles.iconContainer}
//               onPress={() => console.log(`Claiming resource: ${item.id}`)}
//             >
//               <MaterialIcons
//                 name="volunteer-activism"
//                 size={28}
//                 color="#F58216"
//               />
//             </TouchableOpacity>
//           </ThemedView>
//         </TouchableOpacity>
//       )}
//       contentContainerStyle={styles.listContent}
//     />
//   );
// }

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

export default function AlmsScreen() {
  const [resources, setResources] = useState<Alm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlm, setSelectedAlm] = useState<Alm | null>(null); // Track the selected alm for the modal
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Track modal visibility

  // Use typed navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchResources = async () => {
    try {
      const response = await getAllResources();
      setResources(response);
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
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id.toString()} // `item.id` is a number, but `keyExtractor` needs a string
        ListHeaderComponent={
          <View>
            <Image
              source={require("@/assets/images/logo-placeholder-image.png")}
              style={styles.headerImage}
            />
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Alms (Resources)</ThemedText>
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
