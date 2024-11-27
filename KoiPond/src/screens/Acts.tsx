import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { getAllOpportunities } from "../../lib/api"; // Fetch function for Acts
import { Act } from "../../lib/types"; // Data type for Acts
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../lib/types";

export default function ActsScreen() {
  const [opportunities, setOpportunities] = useState<Act[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use typed navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchOpportunities = async () => {
    try {
      const response = await getAllOpportunities(); // Fetch Acts from the API
      setOpportunities(response);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      setError("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

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
    <FlatList
      data={opportunities}
      keyExtractor={(item) => item.id.toString()} // `item.id` is a number, but `keyExtractor` needs a string
      ListHeaderComponent={
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Acts (Volunteer Opportunities)</ThemedText>
        </ThemedView>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            // Navigate to the details screen with the actId
            navigation.navigate("ActsDetailsScreen", { actId: item.id });
          }}
        >
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle" style={styles.cardTitle}>
              {item.title}
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              {item.description}
            </ThemedText>
            <ThemedText style={styles.cardDetails}>
              Category: {item.category} | Start: {item.start_date} | End:{" "}
              {item.end_date}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#F2F7F5",
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "column",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 4,
    color: "#2B3E33",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  cardDetails: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    padding: 20,
  },
});
