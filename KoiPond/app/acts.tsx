import { FlatList, StyleSheet, Text } from "react-native";
import { ThemedView } from "@//src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";

export default function ActsScreen() {
  const Acts = [
    {
      id: "1",
      title: "Beach Cleanup",
      description: "Join us for a beach cleanup.",
      date: "Jan 25, 2025",
    },
    {
      id: "2",
      title: "Soup Kitchen Volunteering",
      description: "Help serve meals.",
      date: "Jan 26, 2025",
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={
        <ThemedView style={styles.header}>
          <ThemedText type="title">Acts</ThemedText>
        </ThemedView>
      }
      data={Acts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            {item.title}
          </ThemedText>
          <ThemedText>{item.description}</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.date}>
            {item.date}
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
});
