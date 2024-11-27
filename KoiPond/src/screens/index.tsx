import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Image, // Import Image for displaying alms images
} from "react-native";
import SearchInput from "../components/SearchInput";
import EmptyState from "../components/EmptyState";
import { getLatestAlms, getLatestActs } from "../../lib/api"; // Import API functions
import { Alm, Act } from "../../lib/types"; // Import types for Alms and Acts
import { styles } from "../components/Styles"; // Import styles
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Import typing for navigation
import { RootStackParamList } from "../../lib/types"; // Import RootStackParamList

const Home: React.FC = () => {
  const [alms, setAlms] = useState<Alm[]>([]); // Alm type for alms
  const [acts, setActs] = useState<Act[]>([]); // Act type for acts
  const [refreshing, setRefreshing] = useState(false);

  // Properly type the navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fetch latest alms
  const fetchLatestAlms = async () => {
    try {
      const response = await getLatestAlms();
      setAlms(response);
    } catch (error) {
      console.error("Error fetching alms", error);
    }
  };

  // Fetch latest acts
  const fetchLatestActs = async () => {
    try {
      const response = await getLatestActs();
      setActs(response);
    } catch (error) {
      console.error("Error fetching acts", error);
    }
  };

  // Refresh data
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLatestAlms();
    await fetchLatestActs();
    setRefreshing(false);
  };

  // Fetch data on component mount
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
            {/* Page Header */}
            <View style={styles.header}>
              <Text style={styles.title}>My Pond</Text>
              <SearchInput onChangeText={(text) => console.log(text)} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("PostAlmScreen")}
                >
                  <Text style={styles.buttonText}>Post an Alm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("PostActScreen")}
                >
                  <Text style={styles.buttonText}>Post an Act</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Alms Section - Horizontal Carousel */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Latest Alms</Text>
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
                      {/* Image */}
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                      {/* Title and Description */}
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
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                contentContainerStyle={styles.carousel}
              />
            </View>

            {/* Acts Section - Regular Vertical List */}
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
