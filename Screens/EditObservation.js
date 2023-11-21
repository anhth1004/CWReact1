import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Database from '../Database';

function EditObservation({ route, navigation }) {
  const { observationId } = route.params;
  const [observation, setObservation] = useState('');
  const [dateObservation, setDateObservation] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadObservation();
  }, []);

  const loadObservation = () => {
    Database.getObservation(observationId)
      .then((result) => {
        const obs = result[0];
        if (obs) {
          setObservation(obs.observation);
          setDateObservation(obs.dateObservation);
          setComment(obs.comment);
        }
      })
      .catch((error) => {
        console.error('Error loading observation', error);
      });
  };

  const handleSave = () => {
    const updatedObservation = {
      observation,
      dateObservation,
      comment,
    };

    Database.updateObservation(observationId, updatedObservation)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating observation', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Observation:</Text>
      <TextInput
        style={styles.input}
        value={observation}
        onChangeText={setObservation}
      />
      <Text>Date of Observation:</Text>
      <TextInput
        style={styles.input}
        value={dateObservation}
        onChangeText={setDateObservation}
      />
      <Text>Comment:</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
  },
});

export default EditObservation;
