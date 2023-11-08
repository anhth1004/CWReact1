import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native";

import Database from "../Database";

const EditScreen = ({ route, navigation }) => {
  const { todo } = route.params;
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleSave = async () => {
    Alert.alert(
      "Confirm Save",
      "Are you sure you want to save the changes?",
      [
        {
          text: "Cancel",
          onPress: () => {
            // Hủy thao tác
          },
          style: "cancel",
        },
        {
          text: "Save",
          onPress: async () => {
            try {
              await Database.updateTodo(editedTodo.id, editedTodo);
              // Cập nhật danh sách công việc sau khi chỉnh sửa thành công
              navigation.navigate("Home");
            } catch (error) {
              console.log("Error updating todo", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    
    <View style={styles.container}>
      <ScrollView style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={editedTodo.title}
        onChangeText={(text) => setEditedTodo({ ...editedTodo, title: text })}
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={editedTodo.location}
        onChangeText={(text) => setEditedTodo({ ...editedTodo, location: text })}
      />
      <Text style={styles.label}>Date:</Text>
      <DateTimePicker
        style={styles.datePicker}
        value={new Date(editedTodo.date)}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            setEditedTodo({
              ...editedTodo,
              date: selectedDate.toISOString().slice(0, 10),
            });
          }
        }}
      />
      <Text style={styles.label}>Parking Available:</Text>
      <Picker
        style={styles.picker}
        selectedValue={editedTodo.parkingAvailable}
        onValueChange={(itemValue) =>
          setEditedTodo({ ...editedTodo, parkingAvailable: itemValue })
        }
      >
        <Picker.Item label="Yes" value="Yes" />
        <Picker.Item label="No" value="No" />
      </Picker>
      <Text style={styles.label}>Length Of The Hike:</Text>
      <TextInput
        style={styles.input}
        value={editedTodo.lengthOfTheHike}
        onChangeText={(text) =>
          setEditedTodo({ ...editedTodo, lengthOfTheHike: text })
        }
      />
      <Text style={styles.label}>Difficulty Level:</Text>
      <TextInput
        style={styles.input}
        value={editedTodo.difficultyLevel}
        onChangeText={(text) =>
          setEditedTodo({ ...editedTodo, difficultyLevel: text })
        }
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={editedTodo.description}
        onChangeText={(text) =>
          setEditedTodo({ ...editedTodo, description: text })
        }
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      </ScrollView>
      
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
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  datePicker: {
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditScreen;
