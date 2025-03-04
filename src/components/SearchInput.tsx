// components/SearchInput.tsx
import React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";

// Extending TextInputProps to accept standard TextInput props
interface SearchInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onChangeText,
  ...rest // Spread the remaining props (e.g., placeholder, value, etc.)
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        {...rest} // Apply the rest of the props to TextInput
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 40,
  },
  input: {
    height: 40,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    color: "#444", // Darker text color for better contrast
    backgroundColor: "#f0f0f0", // Lighter grey background
  },
});

export default SearchInput;
