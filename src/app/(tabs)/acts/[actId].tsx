import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Act } from "@/lib/types";
import { getActById, getAllOpportunities } from "@/lib/api";
import BackAction from "@/src/components/BackAction";
import { styles } from "@/src/components/Styles";
import { useRouter, useLocalSearchParams } from "expo-router";

const ActsDetailsScreen = () => {
  const { actId } = useLocalSearchParams(); // Retrieve the dynamic parameter
  const router = useRouter(); // For navigation
  const [act, setAct] = useState<Act | null>(null);
  const [remainingActs, setRemainingActs] = useState<Act[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAct, setSelectedAct] = useState<Act | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Safely fetch act details using the actId
        const fetchedAct = await getActById(actId?.toString() || "");
        setAct(fetchedAct);

        // Fetch and filter other acts
        const allActs = await getAllOpportunities();
        const filteredActs = allActs.filter(
          (item) => item.id !== parseInt(actId as string, 10)
        );
        setRemainingActs(filteredActs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (actId) fetchData();
  }, [actId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (!act) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>Act not found</ThemedText>
      </View>
    );
  }

  const handleVolunteer = () => {
    console.log(`Volunteered for: ${selectedAct?.title}`);
    Alert.alert(
      "Volunteer Confirmation",
      `You have successfully signed up to volunteer for this act. The poster of this act has been notified.`,
      [
        {
          text: "OK",
          onPress: () => {
            setModalVisible(false);
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <ThemedView>
      <BackAction />
      <ThemedView style={styles.actsDetailsCard}>
        <ThemedText type="title" style={styles.actsDetailsCardTitle}>
          {act.title}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDescription}>
          {act.description}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          <ThemedText style={{ fontWeight: "bold" }}>Category:</ThemedText>{" "}
          {act.category}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          <ThemedText style={{ fontWeight: "bold" }}>Start Date:</ThemedText>{" "}
          {act.start_date}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          <ThemedText style={{ fontWeight: "bold" }}>End Date:</ThemedText>{" "}
          {act.end_date}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          <ThemedText style={{ fontWeight: "bold" }}>Location:</ThemedText>{" "}
          {act.location}
        </ThemedText>
        {act.police_check_required ? (
          <ThemedText style={[styles.actsDetailsCardDetails, styles.redText]}>
            Police check required
          </ThemedText>
        ) : null}

        <TouchableOpacity
          style={styles.volunteerButton}
          onPress={() => {
            setSelectedAct(act);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Volunteer</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.actsRemainingTitle}>
        Other Acts
      </ThemedText>
    </ThemedView>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={remainingActs}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/acts/${item.id}`)}>
            <ThemedView style={styles.card}>
              <ThemedText type="subtitle" style={styles.remainingActText}>
                {item.title}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Volunteer Confirmation */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
                onPress={handleVolunteer}
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

export default ActsDetailsScreen;
