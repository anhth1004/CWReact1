import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Database from '../Database';

function ViewObservationScreen({ route, navigation }) {
  const { hikeId } = route.params;
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    loadObservations();
  }, [hikeId]);

  const loadObservations = () => {
    Database.getObservationsForHike(hikeId)
      .then((result) => {
        setObservations(result);
      })
      .catch((error) => {
        console.error('Error loading observations', error);
      });
  };

  const handleEditObservation = (observationId) => {
    navigation.navigate('EditObservation', { observationId });
  };

  const handleDeleteObservation = (observationId) => {
    Database.deleteObservation(observationId)
      .then(() => {
        loadObservations(); // Refresh dữ liệu sau khi xóa
      })
      .catch((error) => {
        console.error('Error deleting observation', error);
      });
  };

  const handleAddObservation = () => {
    navigation.navigate('AddObservation', { hikeId });
  };

  const formatObservationDate = (dateString) => {
    const isValidDateFormat = (dateString) => {
      const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
      return dateFormat.test(dateString);
    };

    let formattedDate;

    if (typeof dateString === 'string' && isValidDateFormat(dateString)) {
      const dateParts = dateString.split('-');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);

      const dateObject = new Date(year, month, day);

      if (!isNaN(dateObject)) {
        formattedDate = dateObject.toLocaleDateString();
      } else {
        console.log('Error in date processing');
        formattedDate = 'Invalid Date';
      }
    } else if (dateString instanceof Date) {
      formattedDate = dateString.toLocaleDateString();
    } else {
      console.log('Invalid date');
      formattedDate = 'Invalid Date';
    }

    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Observations:</Text>
      <FlatList
        data={observations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const formattedDate = formatObservationDate(item.dateObservation);

          return (
            <View style={styles.observationContainer} key={item.id}>
              <Text style={styles.observationText}>Observation: {item.observation}</Text>
              <Text style={styles.dateText}>Date of Observation: {formattedDate}</Text>
              <Text style={styles.commentText}>Comment: {item.comment}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditObservation(item.id)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteObservation(item.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddObservation}>
        <Text style={styles.buttonText}>Add Observation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  observationContainer: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  observationText: {
    fontSize: 16,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ViewObservationScreen;
