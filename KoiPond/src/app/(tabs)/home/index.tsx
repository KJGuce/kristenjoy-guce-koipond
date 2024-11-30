import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import EmptyState from "@/src/components/EmptyState";
import { getLatestAlms, getLatestActs } from "@/lib/api";
import { Alm, Act } from "@/lib/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/lib/types";
import { API_URL } from "@/lib/api";

const Home: React.FC = () => {
  const [alms, setAlms] = useState<Alm[]>([]);
  const [acts, setActs] = useState<Act[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>My Pond</Text>
              <View style={styles.buttonContainer}>
                {/* Post Alm Button */}
                <TouchableOpacity
                  style={styles.postAlmButton}
                  onPress={() => navigation.navigate("PostAlmScreen")}
                >
                  <FontAwesome5 name="donate" size={16} color="#fff" />
                  <Text style={styles.postAlmButtonText}>Post an Alm</Text>
                </TouchableOpacity>

                {/* Post Act Button */}
                <TouchableOpacity
                  style={styles.postActButton}
                  onPress={() => navigation.navigate("PostActScreen")}
                >
                  <FontAwesome5 name="hands-helping" size={16} color="#fff" />
                  <Text style={styles.postActButtonText}>Post an Act</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Latest Alms - Horizontal Carousel */}
            <FlatList
              data={alms}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AlmsDetailsScreen", {
                      almId: item.id,
                    })
                  }
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
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardLocation}>{item.location}</Text>
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
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={styles.carousel}
            />

            {/* Latest Acts - Regular Vertical List */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Latest Acts</Text>
              <FlatList
                data={acts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ActsDetailsScreen", {
                        actId: item.id,
                      })
                    }
                  >
                    <View style={styles.card}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardDescription}>
                        {item.description}
                      </Text>
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
    backgroundColor: "#fff", // Dark background
  },
  header: {
    padding: 16,
    backgroundColor: "#1f1f1f", // Slightly lighter for contrast
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
