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
    position: "relative", // Enable absolute positioning for icon
    shadowColor: "#000", // Shadow for elevation effect
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
    color: "#aaa", // Muted description color
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#aaa", // Muted description color
    marginTop: 5,
  },
  cardDetails: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 8,
  },
  cardImage: {
    width: "100%",
    height: 120, // Updated to fit the card width
    borderRadius: 8, // Optional: round the edges
    marginBottom: 8, // Add spacing between image and text
  },

  // Icon container for bottom-right placement
  iconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff", // White background for contrast
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
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

  // Image container
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  volunteerButton: {
    backgroundColor: "#46B3A5", // Teal button color
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  // Add the styles for AlmsDetailsScreen here
  almsDetailsContainer: {
    flex: 1,
    padding: 16,
  },
  almsDetailsCard: {
    marginBottom: 24,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  almsDetailsCardImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  almsDetailsCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B3E33",
    marginBottom: 4,
  },
  almsDetailsCardDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  almsDetailsCardDetails: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  almsRemainingAlmsContainer: {
    marginTop: 16,
    flex: 1,
  },
  almsRemainingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2B3E33",
  },
  // Add the styles for ActsDetailsScreen here
  actsDetailsContainer: {
    flex: 1,
    padding: 16,
  },
  actsDetailsCard: {
    marginBottom: 24,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  actsDetailsCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B3E33",
    marginBottom: 4,
  },
  actsDetailsCardDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  actsDetailsCardDetails: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  actsRemainingActsContainer: {
    marginTop: 16,
    flex: 1,
  },
  actsRemainingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2B3E33",
  },
  // New style to make text white for remaining act items
  remainingActText: {
    fontSize: 14,
    color: "white", // White text
  },

  //Acts
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },

  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#DDD", // Placeholder background color
  },

  textContent: {
    flex: 1,
  },

  //back button
  backButton: {
    marginLeft: 10,
    padding: 5, // Adjust this to position the back button
  },
});
