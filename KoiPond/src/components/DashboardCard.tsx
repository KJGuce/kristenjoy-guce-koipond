import { StyleSheet, Pressable } from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";

export function DashboardCard({ title, value, description, onPress }: any) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">{title}</ThemedText>
        {value && <ThemedText type="title">{value}</ThemedText>}
        <ThemedText>{description}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 2,
  },
});
