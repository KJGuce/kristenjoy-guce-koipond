import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Alm } from "../../lib/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types"; // Import your navigation type
import { getAlmById, getAllResources } from "../../lib/api"; // Import necessary API functions

// Define props for this screen using NativeStackScreenProps
type Props = NativeStackScreenProps<RootStackParamList, "AlmsDetailsScreen">;

function AlmsDetailsScreen({ route }: Props) {
  const { almId } = route.params; // Access the route parameters

  // State to hold the selected alm and remaining alms
  const [alm, setAlm] = useState<Alm | null>(null);
  const [remainingAlms, setRemainingAlms] = useState<Alm[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data for the selected alm and remaining alms
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the selected alm using almId
        const fetchedAlm = await getAlmById(almId.toString());
        setAlm(fetchedAlm);

        // Fetch all resources and filter out the selected alm
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

  return (
    <View style={styles.container}>
      {/* Details Card */}
      <View style={styles.detailsCard}>
        <Image source={{ uri: alm.image_url }} style={styles.cardImage} />
        <ThemedText type="title" style={styles.cardTitle}>
          {alm.name}
        </ThemedText>
        <ThemedText style={styles.cardDescription}>
          {alm.description}
        </ThemedText>
        <ThemedText style={styles.cardDetails}>
          Quantity: {alm.quantity} | Location: {alm.location} | Condition:{" "}
          {alm.condition}
        </ThemedText>
      </View>

      {/* Remaining Alms */}
      <ThemedView style={styles.remainingAlmsContainer}>
        <ThemedText type="subtitle" style={styles.remainingTitle}>
          Remaining Alms
        </ThemedText>
        <FlatList
          data={remainingAlms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView style={styles.card}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.cardImage}
              />
              <ThemedText type="subtitle">{item.name}</ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  detailsCard: { marginBottom: 24 },
  cardImage: { width: "100%", height: 120, borderRadius: 8, marginBottom: 8 },
  cardTitle: { fontSize: 18, marginBottom: 4, color: "#2B3E33" },
  cardDescription: { fontSize: 14, color: "#555" },
  cardDetails: { fontSize: 12, color: "#777", marginTop: 8 },
  remainingAlmsContainer: { marginTop: 16 },
  remainingTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  card: {
    flexDirection: "column",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default AlmsDetailsScreen;
