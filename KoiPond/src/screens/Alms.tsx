import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { getAllResources } from "../../lib/api";
import { Alm } from "../../lib/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../lib/types";

export default function AlmsScreen() {
  const [resources, setResources] = useState<Alm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use typed navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchResources = async () => {
    try {
      const response = await getAllResources();
      setResources(response);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
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
      data={resources}
      keyExtractor={(item) => item.id.toString()} // `item.id` is a number, but `keyExtractor` needs a string
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
        <TouchableOpacity
          onPress={() => {
            // Pass almId to the details screen
            navigation.navigate("AlmsDetailsScreen", { almId: item.id });
          }}
        >
          <ThemedView style={styles.card}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.cardImage}
              onError={(error) =>
                console.log("Error loading image:", error.nativeEvent.error)
              }
            />
            <ThemedText type="subtitle" style={styles.cardTitle}>
              {item.name}
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              {item.description}
            </ThemedText>
            <ThemedText style={styles.cardDetails}>
              Quantity: {item.quantity} | Location: {item.location}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
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
