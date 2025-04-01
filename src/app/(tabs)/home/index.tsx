import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EmptyState from "@/src/components/EmptyState";
import { getLatestAlms, getLatestActs, API_URL } from "@/lib/api";
import { Alm, Act } from "@/lib/types";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

const Home: React.FC = () => {
  const router = useRouter();
  const { refresh } = useLocalSearchParams();

  const [alms, setAlms] = useState<Alm[]>([]);
  const [acts, setActs] = useState<Act[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestAlms = async () => {
    try {
      const response = await getLatestAlms();
      setAlms(response);
    } catch (error) {
      console.error("Error fetching alms", error);
      setError("Failed to load alms. Please try again later.");
    }
  };

  const fetchLatestActs = async () => {
    try {
      const response = await getLatestActs();
      setActs(response);
    } catch (error) {
      console.error("Error fetching acts", error);
      setError("Failed to load acts. Please try again later.");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      await Promise.all([fetchLatestAlms(), fetchLatestActs()]);
    } catch (error) {
      console.error("Error during refresh:", error);
      setError("Failed to refresh. Please try again later.");
    } finally {
      setRefreshing(false);
    }
  };

  // Use useFocusEffect to refresh data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          await Promise.all([fetchLatestAlms(), fetchLatestActs()]);
        } catch (error) {
          console.error("Error during initialization:", error);
          setError("Failed to load data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [])
  );

  // Handle manual refresh from navigation params
  useEffect(() => {
    if (refresh === "true") {
      onRefresh();
      // Clear the refresh parameter after refreshing
      router.replace("/(tabs)/home");
    }
  }, [refresh]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.errorContainer}>
          <ThemedText>{error}</ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title} type="title">
            My Pond
          </ThemedText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.postAlmButton}
              onPress={() =>
                router.push({
                  pathname: "/alms/PostAlm",
                  params: { refresh: "true" },
                })
              }
              accessibilityLabel="Post an Alm"
            >
              <FontAwesome5 name="donate" size={16} color="#fff" />
              <ThemedText
                style={styles.postAlmButtonText}
                type="defaultSemiBold"
              >
                Post an Alm
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.postActButton}
              onPress={() =>
                router.push({
                  pathname: "/acts/PostAct",
                  params: { refresh: "true" },
                })
              }
              accessibilityLabel="Post an Act"
            >
              <FontAwesome5 name="hands-helping" size={16} color="#fff" />
              <ThemedText
                style={styles.postActButtonText}
                type="defaultSemiBold"
              >
                Post an Act
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle} type="subtitle">
            Latest Alms
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {alms.length > 0 ? (
              alms.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => router.push(`/alms/${item.id}`)}
                >
                  <ThemedView style={styles.card}>
                    <Image
                      source={
                        item.image_url
                          ? {
                              uri: item.image_url.startsWith("http")
                                ? item.image_url
                                : `${API_URL}${item.image_url}`,
                            }
                          : require("@/assets/images/favicon.png")
                      }
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <ThemedText style={styles.cardTitle} type="defaultSemiBold">
                      {item.name}
                    </ThemedText>
                    <ThemedText style={styles.cardLocation} type="default">
                      {item.location}
                    </ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              ))
            ) : (
              <EmptyState
                title="No Alms Found"
                subtitle="No resources available"
              />
            )}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle} type="subtitle">
            Latest Acts
          </ThemedText>
          {acts.length > 0 ? (
            acts.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/acts/${item.id}`)}
              >
                <ThemedView style={styles.card}>
                  <ThemedText style={styles.cardTitle} type="defaultSemiBold">
                    {item.title}
                  </ThemedText>
                  <ThemedText style={styles.cardDescription} type="default">
                    {item.description}
                  </ThemedText>
                </ThemedView>
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState
              title="No Acts Found"
              subtitle="No volunteer opportunities available"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
  },
  retryButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#F58216",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  postAlmButton: {
    backgroundColor: "#F58216",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  postAlmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  postActButton: {
    backgroundColor: "#46B3A5",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  postActButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardLocation: {
    fontSize: 14,
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  cardImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  carousel: {
    paddingHorizontal: 16,
  },
});
