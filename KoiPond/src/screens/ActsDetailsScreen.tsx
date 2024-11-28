import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Act } from "../../lib/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types";
import { getActById, getAllOpportunities } from "../../lib/api";
import BackAction from "../components/BackAction"; // Adjust the path based on your project structure
import { styles } from "../components/Styles"; // Adjust path as necessary

type Props = NativeStackScreenProps<RootStackParamList, "ActsDetailsScreen">;

function ActsDetailsScreen({ route, navigation }: Props) {
  const { actId } = route.params;
  const [act, setAct] = useState<Act | null>(null);
  const [remainingActs, setRemainingActs] = useState<Act[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAct = await getActById(actId.toString());
        setAct(fetchedAct);

        const allActs = await getAllOpportunities();
        const filteredActs = allActs.filter((item) => item.id !== actId);
        setRemainingActs(filteredActs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (!act) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>Act not found</ThemedText>
      </View>
    );
  }

  const renderHeader = () => (
    <ThemedView>
      <BackAction />
      {/* Details Card */}
      <ThemedView style={styles.actsDetailsCard}>
        <ThemedText type="title" style={styles.actsDetailsCardTitle}>
          {act.title}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDescription}>
          {act.description}
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          <ThemedText style={{ fontWeight: "bold" }}>Category:</ThemedText>{" "}
          <ThemedText>{act.category}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          <ThemedText style={{ fontWeight: "bold" }}>Start Date:</ThemedText>{" "}
          <ThemedText>{act.start_date}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          <ThemedText style={{ fontWeight: "bold" }}>End Date:</ThemedText>{" "}
          <ThemedText>{act.end_date}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.actsDetailsCardDetails}>
          <ThemedText style={{ fontWeight: "bold" }}>Location:</ThemedText>{" "}
          <ThemedText>{act.location}</ThemedText>
        </ThemedText>
        {/* Conditionally render "Police check required" */}
        <ThemedView>
          {act.police_check_required ? (
            <ThemedText style={[styles.actsDetailsCardDetails, styles.redText]}>
              Police check required
            </ThemedText>
          ) : null}
        </ThemedView>
      </ThemedView>

      {/* Title for Remaining Acts */}
      <ThemedText type="subtitle" style={styles.actsRemainingTitle}>
        Other Acts
      </ThemedText>
    </ThemedView>
  );

  return (
    <FlatList
      data={remainingActs}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader} // Render Act Details as the header
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ActsDetailsScreen", { actId: item.id })
          }
        >
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle" style={styles.remainingActText}>
              {item.title}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      )}
    />
  );
}

export default ActsDetailsScreen;
