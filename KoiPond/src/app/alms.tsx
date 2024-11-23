// AlmsScreen.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Image, View } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { getAllResources } from "../../lib/api"; // Import the API function
import { Alm } from "../../lib/types"; // Import Alm type

export default function AlmsScreen() {
  const [resources, setResources] = useState<Alm[]>([]); // State to hold resources
  const [loading, setLoading] = useState<boolean>(true); // State for loading state
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Function to fetch resources from the backend API
  const fetchResources = async () => {
    try {
      const response = await getAllResources(); // Using the API function
      setResources(response); // Update state with fetched resources
    } catch (error) {
      setError("Failed to load resources"); // Set error message if the request fails
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  // Use effect to fetch resources on component mount
  useEffect(() => {
    fetchResources();
  }, []);

  // Display loading state or error if data is not loaded yet
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
      data={resources}
      keyExtractor={(item) => item.id.toString()}
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
        <ThemedView style={styles.card}>
          <Image source={{ uri: item.image_url }} style={styles.cardImage} />{" "}
          <ThemedText type="subtitle" style={styles.cardTitle}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            {item.description}
          </ThemedText>
        </ThemedView>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
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
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
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
