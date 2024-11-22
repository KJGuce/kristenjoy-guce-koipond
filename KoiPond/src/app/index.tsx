import { Image, StyleSheet, ScrollView } from "react-native";

import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { DashboardCard } from "@/src/components/DashboardCard";

export default function KoiPondDashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <ThemedView style={styles.header}>
        <Image
          source={require("@/assets/images/logo-placeholder-image.png")}
          style={styles.logo}
        />
        <ThemedText type="title">KoiPond Dashboard</ThemedText>
      </ThemedView>

      {/* Stats Overview */}
      <ThemedView style={styles.statsContainer}>
        <DashboardCard
          title="Total Alms"
          value="45"
          description="Resources available"
        />
        <DashboardCard
          title="Total Acts"
          value="18"
          description="Volunteer opportunities"
        />
      </ThemedView>

      {/* Recent Activities */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Recent Activities</ThemedText>
        <DashboardCard
          title="John Doe"
          description="Donated 10 blankets to Alms"
        />
        <DashboardCard
          title="Jane Smith"
          description="Signed up for a clean-up event"
        />
      </ThemedView>

      {/* Action Buttons */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Quick Actions</ThemedText>
        <DashboardCard
          title="Add New Alms"
          description="Post a new resource"
          onPress={() => {
            console.log("Navigate to Add Alms screen");
          }}
        />
        <DashboardCard
          title="Create Act"
          description="Create a volunteer opportunity"
          onPress={() => {
            console.log("Navigate to Create Act screen");
          }}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
});
