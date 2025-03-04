import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Alm } from "@/lib/types";
import { getAlmById, getAllResources } from "@/lib/api";
import BackAction from "@/src/components/BackAction";
import { styles } from "@/src/components/Styles";
import { useRouter, useLocalSearchParams } from "expo-router";

const AlmsDetailsScreen = () => {
  const { almId } = useLocalSearchParams(); // Retrieve dynamic parameter
  const router = useRouter(); // For navigation
  const [alm, setAlm] = useState<Alm | null>(null);
  const [remainingAlms, setRemainingAlms] = useState<Alm[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const [selectedAlm, setSelectedAlm] = useState<Alm | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the specific alm
        const fetchedAlm = await getAlmById(almId?.toString() || "");
        setAlm(fetchedAlm);

        // Fetch and filter out the current alm from the list
        const allResources = await getAllResources();
        const filteredResources = allResources.filter(
          (resource) => resource.id !== parseInt(almId as string, 10)
        );
        setRemainingAlms(filteredResources);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (almId) fetchData();
  }, [almId]);

  const handleClaimAlm = () => {
    Alert.alert(
      "Claim Confirmation",
      `Your request to claim "${selectedAlm?.name}" has been sent. The poster has been notified.`,
      [
        {
          text: "OK",
          onPress: () => {
            setClaimModalVisible(false);
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (!alm) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>Alm not found</ThemedText>
      </View>
    );
  }

  const renderHeader = () => (
    <ThemedView>
      <BackAction />
      <ThemedView style={styles.almsDetailsCard}>
        <Image
          source={
            alm.image_url
              ? { uri: alm.image_url }
              : require("@/assets/images/favicon.png")
          }
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

        <TouchableOpacity
          style={styles.claimButton}
          onPress={() => {
            setSelectedAlm(alm);
            setClaimModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Claim</Text>
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
          <TouchableOpacity onPress={() => router.push(`/alms/${item.id}`)}>
            <ThemedView style={styles.card}>
              <Image
                source={
                  item.image_url
                    ? { uri: item.image_url }
                    : require("@/assets/images/favicon.png")
                }
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
};

export default AlmsDetailsScreen;
