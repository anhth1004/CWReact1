import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Database from '../Database';

const AddObservationScreen = ({ route, navigation }) => {
  const { hikeId } = route.params;
  const [observation, setObservation] = useState('');
  const [dateOfObservation, setDateOfObservation] = useState(new Date());
  const [comments, setComments] = useState(''); // Thêm trường "Comments"
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSaveObservation = async () => {
    if (!observation) {
      alert('Please enter an observation.');
      return;
    }

    // Chuyển đổi ngày thành chuỗi định dạng YYYY-MM-DD
    const formattedDate = dateOfObservation.toISOString().slice(0, 10);

    // Lưu quan sát mới vào cơ sở dữ liệu
    await Database.addObservation(hikeId, observation, formattedDate, comments);

    // Trở lại màn hình trước đó
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfObservation(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Observation:</Text>
      <TextInput
        style={styles.input}
        value={observation}
        onChangeText={setObservation}
        placeholder="Enter your observation"
        multiline={true}
        numberOfLines={4}
      />
      <Text style={styles.label}>Date of Observation:</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>Select Date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfObservation}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Text style={styles.label}>Comments: {/* Thêm trường "Comments" */}
      
      </Text>
      <TextInput
        style={styles.input}
        value={comments}
        onChangeText={setComments}
        placeholder="Enter your comments"
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSaveObservation}>
        <Text style={styles.addButtonText}>Save Observation</Text>
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  dateButton: {
    backgroundColor: 'lightgray',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  dateButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddObservationScreen;
