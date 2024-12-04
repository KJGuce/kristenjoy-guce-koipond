import * as React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const BackAction = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
    </Appbar.Header>
  );
};

export default BackAction;

const styles = StyleSheet.create({
  header: {
    marginTop: 0, // Ensure there's no extra margin
    paddingTop: 0, // Remove internal padding
    elevation: 0, // Adjust elevation to avoid shadows adding visual space
    height: 56, // Set the height to the standard AppBar height
  },
});
