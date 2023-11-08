import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";

import Database from "./Database";
import DetailScreen from "./Screens/DetailScreen";
import EditScreen from "./Screens/EditScreen";
import EntryScreen from "./Screens/EntryScreen"; 
import HomeScreen from "./Screens/HomeScreen";
import SearchScreen from "./Screens/SearchScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Entry" component={EntryScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} /> 
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  )
}
const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Trang chủ" component={HomeStack} />
        <Tab.Screen name="Thêm" component={EntryScreen} />
        <Tab.Screen name="Tìm kiếm" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;