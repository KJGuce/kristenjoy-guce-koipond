// components/Styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 16,
    backgroundColor: "#1f1f1f",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
});
