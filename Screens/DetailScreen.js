import React from "react";
import { ScrollView, StyleSheet, Button, TouchableOpacity,  Text  } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const DetailScreen = ({ route, navigation }) => {
  const { todo } = route.params;

  if (!todo) {
    return (
      <ScrollView style={styles.container}>
        <Paragraph>No data available</Paragraph>
      </ScrollView>
    );
  }

  const isValidDateFormat = (dateString) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormat.test(dateString);
  };

  let formattedDate;

  if (typeof todo.date === "string" && isValidDateFormat(todo.date)) {
    const dateParts = todo.date.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);

    const dateObject = new Date(year, month, day);

    if (!isNaN(dateObject)) {
      formattedDate = dateObject.toLocaleDateString();
    } else {
      console.log("Error in date processing");
      formattedDate = "Invalid Date";
    }
  } else if (todo.date instanceof Date) {
    formattedDate = todo.date.toLocaleDateString();
  } else {
    console.log("Invalid date");
    formattedDate = "Invalid Date";
  };

  const handleViewObservation = () => {
    navigation.navigate("ViewObservationScreen", { hikeId: todo.id });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Name of the Hike</Title>
          <Paragraph>{todo.title}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Location</Title>
          <Paragraph>{todo.location}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Description</Title>
          <Paragraph>{todo.description}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Date</Title>
          <Paragraph>{formattedDate}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Parking Available</Title>
          <Paragraph>{todo.parkingAvailable}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Length of Hike</Title>
          <Paragraph>{todo.lengthOfTheHike}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Difficulty Level</Title>
          <Paragraph>{todo.difficultyLevel}</Paragraph>
        </Card.Content>
      </Card>

      <TouchableOpacity style={styles.button} onPress={handleViewObservation}>
        <Text style={styles.buttonText}>View Observations</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetailScreen;
