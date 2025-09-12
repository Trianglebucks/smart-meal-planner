import { ThemedButton, ThemedText } from "@/src/components/atoms";
import { ThemedSafeAreaView } from "@/src/components/atoms/SafeAreaView";
import { RootStackParamList } from "@/src/navigation/RootStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

export const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleRoleSelection = (role: "customer" | "seller") => {
    navigation.navigate("Authentication", { role });
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      {/* Top content area for the logo and text */}
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/app-logo.png")}
          style={styles.logo}
          resizeMode="contain" // Ensures the whole logo is visible
        />
        <ThemedText type="title" bold>
          Welcome!
        </ThemedText>
        <ThemedText type="subtitle">Discover Local Eateries</ThemedText>
      </View>

      {/* Bottom container for the action buttons */}
      <View style={styles.buttonContainer}>
        <ThemedButton
          type="primary"
          onPress={() => handleRoleSelection("customer")}
          contentStyle={styles.button}
          labelStyle={styles.buttonText}
          icon="account"
          bold
        >
          Im a Customer
        </ThemedButton>
        <ThemedButton
          type="outline"
          onPress={() => handleRoleSelection("seller")}
          contentStyle={styles.button}
          labelStyle={styles.buttonText}
          icon="store"
          bold
        >
          Im a Seller
        </ThemedButton>
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
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 15,
  },
  button: {
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
  },
});
