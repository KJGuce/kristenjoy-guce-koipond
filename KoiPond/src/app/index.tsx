import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  RefreshControl,
} from "react-native";
import SearchInput from "../components/SearchInput";
import EmptyState from "../components/EmptyState";
import { getLatestAlms, getLatestActs } from "../../lib/api"; // Import API functions
import { Alm, Act } from "../../lib/types"; // Import types for Alms and Acts
import { styles } from "../components/Styles"; // Import styles

const Home: React.FC = () => {
  const [alms, setAlms] = useState<Alm[]>([]); // Alm type for alms
  const [acts, setActs] = useState<Act[]>([]); // Act type for acts
  const [refreshing, setRefreshing] = useState(false);

  // Use GET requests to fetch latest alms
  const fetchLatestAlms = async () => {
    try {
      const response = await getLatestAlms(); // API call for latest alms
      setAlms(response); // Update state with alms data
    } catch (error) {
      console.error("Error fetching alms", error);
    }
  };

  // Use GET requests to fetch latest acts
  const fetchLatestActs = async () => {
    try {
      const response = await getLatestActs(); // API call for latest acts
      setActs(response); // Update state with acts data
    } catch (error) {
      console.error("Error fetching acts", error);
    }
  };

  // Refresh data when pulling down on the list
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLatestAlms(); // Refresh alms
    await fetchLatestActs(); // Refresh acts
    setRefreshing(false);
  };

  // Fetch alms and acts when component mounts
  useEffect(() => {
    fetchLatestAlms(); // Get latest alms on initial load
    fetchLatestActs(); // Get latest acts on initial load
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={alms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.heading}>Latest Alms</Text>
            <SearchInput onChangeText={(text) => console.log(text)} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Alms Found" subtitle="No resources available" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <FlatList
        data={acts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.heading}>Latest Acts</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Acts Found"
            subtitle="No volunteer opportunities available"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
