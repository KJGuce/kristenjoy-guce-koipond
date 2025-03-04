import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import EmptyState from "@/src/components/EmptyState";
import { getLatestAlms, getLatestActs, API_URL } from "@/lib/api";
import { Alm, Act } from "@/lib/types";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";

const Home: React.FC = () => {
  const router = useRouter();
  const { refresh } = useLocalSearchParams(); // Retrieve the refresh parameter

  const [alms, setAlms] = useState<Alm[]>([]);
  const [acts, setActs] = useState<Act[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLatestAlms = async () => {
    try {
      const response = await getLatestAlms();
      setAlms(response);
    } catch (error) {
      console.error("Error fetching alms", error);
    }
  };

  const fetchLatestActs = async () => {
    try {
      const response = await getLatestActs();
      setActs(response);
    } catch (error) {
      console.error("Error fetching acts", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLatestAlms();
    await fetchLatestActs();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchLatestAlms();
    fetchLatestActs();
  }, []);

  // Handle refresh parameter
  useEffect(() => {
    if (refresh) {
      onRefresh(); // Refresh Alms and Acts
      router.replace("/(tabs)/home"); // Clear the refresh parameter
    }
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <ThemedText style={styles.title} type="title">
                My Pond
              </ThemedText>
              <View style={styles.buttonContainer}>
                {/* Post Alm Button */}
                <TouchableOpacity
                  style={styles.postAlmButton}
                  onPress={() =>
                    router.push({
                      pathname: "/alms/PostAlm",
                      params: { refresh: "true" },
                    })
                  }
                >
                  <FontAwesome5 name="donate" size={16} color="#fff" />
                  <ThemedText
                    style={styles.postAlmButtonText}
                    type="defaultSemiBold"
                  >
                    Post an Alm
                  </ThemedText>
                </TouchableOpacity>

                {/* Post Act Button */}
                <TouchableOpacity
                  style={styles.postActButton}
                  onPress={() =>
                    router.push({
                      pathname: "/acts/PostAct",
                      params: { refresh: "true" },
                    })
                  }
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
            </View>

            {/* Latest Alms - Horizontal Carousel */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle} type="subtitle">
                Latest Alms
              </ThemedText>
              <FlatList
                data={alms}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => router.push(`/alms/${item.id}`)}
                  >
                    <View style={styles.card}>
                      <Image
                        source={
                          item.image_url
                            ? {
                                uri: item.image_url.startsWith("http")
                                  ? item.image_url
                                  : `${API_URL}${item.image_url}`,
                              }
                            : require("@/assets/images/favicon.png") // Local fallback
                        }
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                      <ThemedText
                        style={styles.cardTitle}
                        type="defaultSemiBold"
                      >
                        {item.name}
                      </ThemedText>
                      <ThemedText style={styles.cardLocation} type="default">
                        {item.location}
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <EmptyState
                    title="No Alms Found"
                    subtitle="No resources available"
                  />
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                contentContainerStyle={styles.carousel}
              />
            </View>

            {/* Latest Acts - Regular Vertical List */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle} type="subtitle">
                Latest Acts
              </ThemedText>
              <FlatList
                data={acts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => router.push(`/acts/${item.id}`)}
                  >
                    <View style={styles.card}>
                      <ThemedText
                        style={styles.cardTitle}
                        type="defaultSemiBold"
                      >
                        {item.title}
                      </ThemedText>
                      <ThemedText style={styles.cardDescription} type="default">
                        {item.description}
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <EmptyState
                    title="No Acts Found"
                    subtitle="No volunteer opportunities available"
                  />
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          </>
        }
        renderItem={() => null}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    backgroundColor: "#1f1f1f",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
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
    color: "#333",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  cardLocation: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  carousel: {
    paddingHorizontal: 16,
  },
});
