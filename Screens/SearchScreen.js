import React, { useState } from "react";
import { View, Text, TextInput, Button, Keyboard, FlatList, StyleSheet } from "react-native";
import Database from "../Database";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await Database.searchTodos(searchText);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching todos", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search:</Text>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Enter search text"
        returnKeyType="done" // Hiển thị nút "Done" thay vì "Return"
        onSubmitEditing={() => Keyboard.dismiss()} // Tắt bàn phím khi bấm "Done"
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>Name of the Hike: {item.title} </Text>
            <Text>Location: {item.location}</Text>
            <Text>{item.date}</Text>
            <Text>Parking Available: {item.parkingAvailable}</Text>
            <Text>Length Of The Hike: {item.lengthOfTheHike}</Text>
            <Text>Difficulty Level: {item.difficultyLevel}</Text>
            <Text>Description: {item.description}</Text>
      
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  resultItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
});

export default SearchScreen;
