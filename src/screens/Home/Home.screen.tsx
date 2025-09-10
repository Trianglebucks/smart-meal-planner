import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const HomeScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to Smart Meal Planner!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
