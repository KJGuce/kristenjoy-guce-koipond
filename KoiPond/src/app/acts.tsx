import { FlatList, StyleSheet, View } from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import React, { useState, useEffect } from "react";
import { getAllActs } from "../../lib/api"; // Assumed API function for fetching acts
import { Act } from "../../lib/types";

export default function ActsScreen() {
  const [acts, setActs] = useState<Act[]>([]); // Define Act type for proper TypeScript usage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch acts from the API
  const fetchActs = async () => {
    try {
      const response = await getAllActs(); // API function to fetch all volunteer opportunities
      setActs(response);
    } catch (error) {
      console.error("Error fetching acts:", error);
      setError("Failed to load acts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActs();
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
      ListHeaderComponent={
        <ThemedView style={styles.header}>
          <ThemedText type="title">Acts</ThemedText>
        </ThemedView>
      }
      data={acts}
      keyExtractor={(item) => item.id.toString()} // Ensure `id` is a string for keyExtractor
      renderItem={({ item }) => (
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            {item.title}
          </ThemedText>
          <ThemedText>{item.description}</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.date}>
            {item.start_date}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.date}>
            {item.end_date}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.date}>
            {item.end_date}
          </ThemedText>
        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#F2F7F5",
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    marginTop: 8,
    color: "#888",
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
