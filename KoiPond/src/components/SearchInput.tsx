// components/SearchInput.tsx
import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface SearchInputProps {
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Alms or Acts"
        placeholderTextColor="#aaa"
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    color: "#fff",
    backgroundColor: "#222",
  },
});

export default SearchInput;
