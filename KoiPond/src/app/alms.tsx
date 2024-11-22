import { StyleSheet, FlatList, Image, View } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

export default function AlmsScreen() {
  const resources = [
    {
      id: "1",
      title: "Food Bank",
      description: "Local food distribution center.",
      image: require("@/assets/images/icon.png"),
    },
    {
      id: "2",
      title: "Clothing Drive",
      description: "Donate or pick up clothes.",
      image: require("@/assets/images/icon.png"),
    },
    {
      id: "3",
      title: "Shelter Assistance",
      description: "Temporary housing support.",
      image: require("@/assets/images/icon.png"),
    },
  ];

  return (
    <FlatList
      data={resources}
      keyExtractor={(item) => item.id}
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
          <Image source={item.image} style={styles.cardImage} />
          <ThemedText type="subtitle" style={styles.cardTitle}>
            {item.title}
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
});
