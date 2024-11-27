import React, { useEffect, useState } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Alm } from "../../lib/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types";
import { getAlmById, getAllResources } from "../../lib/api";

// Import the main Styles.tsx file
import { styles } from "../components/Styles"; // Adjust the path based on where your Styles.tsx is

type Props = NativeStackScreenProps<RootStackParamList, "AlmsDetailsScreen">;

function AlmsDetailsScreen({ route, navigation }: Props) {
  const { almId } = route.params;
  const [alm, setAlm] = useState<Alm | null>(null);
  const [remainingAlms, setRemainingAlms] = useState<Alm[]>([]);
  const [loading, setLoading] = useState(true);

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
    <ThemedView style={styles.almsDetailsContainer}>
      {/* Alm Details Section */}
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
          Quantity: {alm.quantity} | Location: {alm.location} | Condition:{" "}
          {alm.condition}
        </ThemedText>
      </ThemedView>

      {/* Remaining Alms Section */}
      <ThemedView style={styles.almsRemainingAlmsContainer}>
        <ThemedText type="subtitle" style={styles.almsRemainingTitle}>
          Other Alms
        </ThemedText>
        <FlatList
          data={remainingAlms}
          keyExtractor={(item) => item.id.toString()}
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
      </ThemedView>
    </ThemedView>
  );
}

export default AlmsDetailsScreen;
