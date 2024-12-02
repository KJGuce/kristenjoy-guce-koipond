import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Alm } from "../../lib/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types";
import { getAlmById, getAllResources } from "../../lib/api";
import { styles } from "../components/Styles";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import BackAction from "../components/BackAction"; // Adjust the path based on your project structure

type Props = NativeStackScreenProps<RootStackParamList, "AlmsDetailsScreen">;

function AlmsDetailsScreen({ route, navigation }: Props) {
  const { almId } = route.params;
  const [alm, setAlm] = useState<Alm | null>(null);
  const [remainingAlms, setRemainingAlms] = useState<Alm[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const [selectedAlm, setSelectedAlm] = useState<Alm | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAlm = await getAlmById(almId.toString());
        setAlm(fetchedAlm);

        const allResources = await getAllResources();
        const filteredResources = allResources.filter(
          (resource) => resource.id !== almId
        );
        setRemainingAlms(filteredResources);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [almId]);

  // Claim confirmation logic
  const handleClaimAlm = () => {
    Alert.alert(
      "Claim Confirmation",
      `Your request to claim "${selectedAlm?.name}" has been sent. The poster has been notified.`,
      [
        {
          text: "OK",
          onPress: () => setClaimModalVisible(false),
        },
      ]
    );
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  // Error state
  if (!alm) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>Alm not found</ThemedText>
      </View>
    );
  }

  // Render Alm details and Claim button
  const renderHeader = () => (
    <ThemedView>
      <BackAction />
      <ThemedView style={styles.almsDetailsCard}>
        <Image
          source={{ uri: alm.image_url }}
          style={styles.almsDetailsCardImage}
        />
        <ThemedText type="title" style={styles.almsDetailsCardTitle}>
          {alm.name}
        </ThemedText>
        <ThemedText style={styles.almsDetailsCardDescription}>
          {alm.description}
        </ThemedText>
        <ThemedText style={styles.almsDetailsCardDetails}>
          <Text style={{ fontWeight: "bold" }}>Quantity:</Text> {alm.quantity} |{" "}
          <Text style={{ fontWeight: "bold" }}>Location:</Text> {alm.location} |{" "}
          <Text style={{ fontWeight: "bold" }}>Condition:</Text> {alm.condition}
        </ThemedText>

        {/* Claim Button */}
        <TouchableOpacity
          style={styles.claimButton}
          onPress={() => {
            setSelectedAlm(alm);
            setClaimModalVisible(true);
          }}
        >
          <MaterialIcons name="volunteer-activism" size={28} color="#fff" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.almsRemainingTitle}>
        Other Alms
      </ThemedText>
    </ThemedView>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={remainingAlms}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AlmsDetailsScreen", { almId: item.id })
            }
          >
            <ThemedView style={styles.card}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.cardImage}
              />
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {item.name}
              </ThemedText>
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
            <Text style={styles.modalDescription}>
              Are you sure you want to claim "{selectedAlm?.name}"?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setClaimModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.postButton]}
                onPress={handleClaimAlm}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default AlmsDetailsScreen;
