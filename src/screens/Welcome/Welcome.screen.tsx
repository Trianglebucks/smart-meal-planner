import { RootStackParamList } from "@/src/navigation/RootStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/app-logo.png")}
          style={styles.logo}
        />
        <Text variant="headlineLarge" style={styles.title}>
          How will you be using our app?
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Please select your role to continue.
        </Text>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Distribute content more evenly instead of pushing to extremes
    justifyContent: "center",
  },
  content: {
    // This no longer needs flex: 1, which was causing the large gap
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 60, // Add some space above the buttons
  },
  logo: {
    // Increased size for more presence, while maintaining balance
    width: 250,
    height: 250,
    borderRadius: 25, // Adjusted for the larger size
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    // Removed marginBottom as spacing is now handled by the container
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
