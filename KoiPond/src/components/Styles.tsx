// components/Styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark mode background
    padding: 16,
  },
  header: {
    padding: 16,
    backgroundColor: "#1f1f1f", // Slightly lighter than the container for contrast
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: "#333", // Card background
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 14,
    color: "#aaa", // Muted description color
    marginTop: 5,
  },
  // Title style for pages
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  // Button styles
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  button: {
    backgroundColor: "#46B3A5", // Teal button color
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#121212", // Dark text for contrast with the button color
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#444", // Darker button for cancel actions
  },
  postButton: {
    backgroundColor: "#007AFF", // Highlight color for action buttons
  },
  // Section styles
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  carousel: {
    paddingHorizontal: 16,
  },
  // Form input styles
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    color: "#fff",
    height: 50,
  },
  // Upload button style
  uploadButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});
