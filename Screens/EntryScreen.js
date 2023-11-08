import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import Database from "../Database";

const EntryScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showParkingPicker, setShowParkingPicker] = useState(false); // Sử dụng biến trạng thái để kiểm soát sự hiển thị
  const [parkingAvailable, setParkingAvailable] = useState("Yes");
  const [lengthOfTheHike, setLengthOfTheHike] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [description, setDescription] = useState("");
  const confirmAddTodo = () => {
    const message = `Name of the hike: ${title}\nLocation: ${location}\nDate: ${date.toISOString().slice(0, 10)}\nParking Available: ${parkingAvailable}\nLength Of The Hike: ${lengthOfTheHike}\nDifficulty Level: ${difficultyLevel}\nDescription: ${description}`;

    Alert.alert(
      "Confirm Add Todo",
      message,
      [
        {
          text: "Cancel",
          onPress: () => {
            // Hủy thao tác
          },
          style: "cancel",
        },
        {
          text: "Add",
          onPress: () => {
            handleAddTodo(); // Thực hiện thêm nhiệm vụ khi người dùng xác nhận
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleAddTodo = async () => {
    if (!title || !description || !location || !lengthOfTheHike || !difficultyLevel) {
      Alert.alert("Error", "Please enter all required information");
      return;
    }

    const selectedDate = date.toISOString().slice(0, 10);

    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormat.test(selectedDate)) {
      Alert.alert("Error", "Please enter a valid date in the format YYYY-MM-DD");
      return;
    }

    await Database.addTodo(
      title,
      location, // Sử dụng "location" thay vì "title"
      selectedDate,
      parkingAvailable,
      lengthOfTheHike,
      difficultyLevel,
      description
    );
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        returnKeyType="done" // Hiển thị nút "Done" thay vì "Return"
        onSubmitEditing={() => Keyboard.dismiss()} // Tắt bàn phím khi bấm "Done"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
        returnKeyType="done" // Hiển thị nút "Done" thay vì "Return"
        onSubmitEditing={() => Keyboard.dismiss()} // Tắt bàn phím khi bấm "Done"
      />
      <Text style={styles.label}>Date:</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>Select Date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Text style={styles.label}>Parking Available:</Text>
      <TouchableOpacity
        style={styles.pickerToggle}
        onPress={() => setShowParkingPicker(!showParkingPicker)}
      >
        <Text style={styles.pickerToggleText}>
          Select Parking Available
        </Text>
      </TouchableOpacity>
      {showParkingPicker && (
        <Picker
          style={styles.picker}
          selectedValue={parkingAvailable}
          onValueChange={(itemValue) => setParkingAvailable(itemValue)}
        >
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      )}
      <Text style={styles.label}>Length Of The Hike:</Text>
      <TextInput
        style={styles.input}
        value={lengthOfTheHike}
        onChangeText={setLengthOfTheHike}
        placeholder="Enter length of the hike"
        returnKeyType="done" // Hiển thị nút "Done" thay vì "Return"
        onSubmitEditing={() => Keyboard.dismiss()} // Tắt bàn phím khi bấm "Done"
      />
      <Text style={styles.label}>Difficulty Level:</Text>
      <TextInput
        style={styles.input}
        value={difficultyLevel}
        onChangeText={setDifficultyLevel}
        placeholder="Enter difficulty level"
        returnKeyType="done" // Hiển thị nút "Done" thay vì "Return"
        onSubmitEditing={() => Keyboard.dismiss()} // Tắt bàn phím khi bấm "Done"
      />
      <Text style={styles.label}>Description:</Text>
       <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        returnKeyType="done" // Hiển thị nút "Done" thay vì "Return"
        onSubmitEditing={() => Keyboard.dismiss()} // Tắt bàn phím khi bấm "Done"
      />
      <TouchableOpacity style={styles.addButton} onPress={confirmAddTodo}>
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
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
  dateButton: {
    backgroundColor: "lightgray",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  dateButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  pickerToggle: {
    backgroundColor: "lightgray",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  pickerToggleText: {
    color: "black",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default EntryScreen;