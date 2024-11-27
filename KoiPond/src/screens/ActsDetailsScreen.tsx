import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Act } from "../../lib/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types"; // Import your navigation type
import { getActById, getAllOpportunities } from "../../lib/api"; // Import necessary API functions

// Define props for this screen using NativeStackScreenProps
type Props = NativeStackScreenProps<RootStackParamList, "ActsDetailsScreen">;

function ActsDetailsScreen({ route }: Props) {
  const { actId } = route.params; // Access the route parameters

  // State to hold the selected act and remaining acts
  const [act, setAct] = useState<Act | null>(null);
  const [remainingActs, setRemainingActs] = useState<Act[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data for the selected act and remaining acts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the selected act using actId
        const fetchedAct = await getActById(actId.toString());
        setAct(fetchedAct);

        // Fetch all acts and filter out the selected act
        const allActs = await getAllOpportunities();
        const filteredActs = allActs.filter((item) => item.id !== actId);
        setRemainingActs(filteredActs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <View style={styles.container}>
      {/* Details Card */}
      <View style={styles.detailsCard}>
        <ThemedText type="title" style={styles.cardTitle}>
          {act.title}
        </ThemedText>
        <ThemedText style={styles.cardDescription}>
          {act.description}
        </ThemedText>
        <ThemedText style={styles.cardDetails}>
          Category: {act.category}
        </ThemedText>
        <ThemedText style={styles.cardDetails}>
          Start Date: {act.start_date}
        </ThemedText>
        <ThemedText style={styles.cardDetails}>
          End Date: {act.end_date}
        </ThemedText>
      </View>

      {/* Remaining Acts */}
      <ThemedView style={styles.remainingActsContainer}>
        <ThemedText type="subtitle" style={styles.remainingTitle}>
          Remaining Acts
        </ThemedText>
        <FlatList
          data={remainingActs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView style={styles.card}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
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
  cardTitle: { fontSize: 18, marginBottom: 4, color: "#2B3E33" },
  cardDescription: { fontSize: 14, color: "#555" },
  cardDetails: { fontSize: 12, color: "#777", marginTop: 8 },
  remainingActsContainer: { marginTop: 16 },
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

export default ActsDetailsScreen;
