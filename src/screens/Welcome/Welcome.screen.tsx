import { ThemedSafeAreaView } from "@/src/components/atoms/SafeArewView";
import { RootStackParamList } from "@/src/navigation/RootStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

export const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { colors } = useTheme();

  const handleRoleSelection = (role: "customer" | "seller") => {
    navigation.navigate("Authentication", { role });
  };

  return (
    <ThemedSafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Top content area for the logo and text */}
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/app-logo.png")}
          style={styles.logo}
          resizeMode="contain" // Ensures the whole logo is visible
        />
        <Text variant="headlineLarge" style={styles.title}>
          Welcome!
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Discover Local Eateries
        </Text>
      </View>

      {/* Bottom container for the action buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => handleRoleSelection("customer")}
          style={styles.button}
          labelStyle={styles.buttonText}
          icon="account"
        >
          Im a Customer
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleRoleSelection("seller")}
          style={styles.button}
          labelStyle={styles.buttonText}
          icon="store"
        >
          Im a Seller
        </Button>
      </View>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // This pushes the content to the top and buttons to the bottom
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    paddingTop: 80, // Give some space from the top
    paddingHorizontal: 20,
  },
  logo: {
    // Make the logo large and responsive
    width: "85%",
    height: undefined,
    aspectRatio: 1, // Keep it square
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#6c757d", // A softer color for the subtitle
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  button: {
    marginBottom: 15,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
