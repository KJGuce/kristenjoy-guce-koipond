import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Act } from "../../lib/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types";
import { getActById, getAllOpportunities } from "../../lib/api";

// Import the main Styles.tsx file
import { styles } from "../components/Styles"; // Adjust path as necessary

type Props = NativeStackScreenProps<RootStackParamList, "ActsDetailsScreen">;

function ActsDetailsScreen({ route, navigation }: Props) {
  const { actId } = route.params; // Access the route parameters

  // State to hold the selected act and remaining acts
  const [act, setAct] = useState<Act | null>(null);
  const [remainingActs, setRemainingActs] = useState<Act[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data for the selected act and remaining acts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAct = await getActById(actId.toString());
        setAct(fetchedAct);

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

  // Handle navigation to another Act's details
  const handleSelectAct = (actId: number) => {
    // Navigate to the details page for the selected act
    navigation.navigate("ActsDetailsScreen", { actId });
  };

  return (
    <ThemedView style={styles.actsDetailsContainer}>
      {/* Details Card */}
      <ThemedView style={styles.actsDetailsCard}>
        <ThemedText type="title" style={styles.actsDetailsCardTitle}>
          {act.title}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDescription}>
          {act.description}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          Category: {act.category}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          Start Date: {act.start_date}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          End Date: {act.end_date}
        </ThemedText>
      </ThemedView>

      {/* Remaining Acts */}
      <ThemedView style={styles.actsRemainingActsContainer}>
        <ThemedText type="subtitle" style={styles.actsRemainingTitle}>
          Other Acts
        </ThemedText>
        <FlatList
          data={remainingActs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectAct(item.id)}>
              <ThemedView style={styles.card}>
                <ThemedText type="subtitle" style={styles.remainingActText}>
                  {item.title}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

export default ActsDetailsScreen;
