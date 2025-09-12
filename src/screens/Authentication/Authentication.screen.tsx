import {
  ThemedSafeAreaView,
  ThemedScrollView,
  ThemedText,
} from "@/src/components/atoms";
import { ThemedButton } from "@/src/components/atoms/Button";
import { ThemedInput } from "@/src/components/molecules";
import { useAuth } from "@/src/hooks/useAuthHook";
import { RootStackParamList } from "@/src/navigation/RootStackNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type AuthScreenRouteProp = RouteProp<RootStackParamList, "Authentication">;

export const AuthScreen = () => {
  const route = useRoute<AuthScreenRouteProp>();
  const navigation = useNavigation(); // Initialize useNavigation
  const [isRegister, setIsRegister] = useState(false);
  const role = route.params?.role || "customer";

  const { control, errors, loading, error, handleAuthSubmit } = useAuth({
    isRegister,
    role,
  });

  const handleToggle = () => {
    if (loading) return;
    setIsRegister(!isRegister);
  };

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen (RoleSelectionScreen)
  };

  return (
    <ThemedSafeAreaView style={styles.flexContainer}>
      {/* Back Button */}
      <ThemedButton
        icon="arrow-left" // MaterialCommunityIcons arrow-left icon
        type="text" // Text mode for a subtle button
        onPress={handleGoBack}
        style={styles.backButton}
        labelStyle={styles.backButtonLabel}
      >
        Back
      </ThemedButton>

      <ThemedScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" bold>
          {isRegister ? "Create Account" : "Welcome Back!"}
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          {isRegister
            ? `Sign up as a ${role}`
            : `Sign in to continue as ${role}.`}
        </ThemedText>

        {isRegister && (
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  label="Username"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.username}
                  autoCapitalize="none"
                  errorText={errors?.username?.message}
                />
              )}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                label="Email"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                errorText={errors?.email?.message}
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                label="Password"
                mode="outlined"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
                errorText={errors?.password?.message}
              />
            )}
          />
        </View>

        {isRegister && (
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  label="Confirm Password"
                  mode="outlined"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.confirmPassword}
                  errorText={errors?.confirmPassword?.message}
                />
              )}
            />
          </View>
        )}

        {error && (
          <ThemedText type="error" bold>
            {error}
          </ThemedText>
        )}

        <ThemedButton
          type="primary"
          onPress={handleAuthSubmit}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          loading={loading}
          disabled={loading}
        >
          {isRegister ? "Create Account" : "Log In"}
        </ThemedButton>

        <View style={styles.toggleTextContainer}>
          <ThemedText type="body">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </ThemedText>
          <ThemedText
            style={styles.toggleLink}
            type="link"
            onPress={handleToggle}
          >
            {isRegister ? "Sign In" : "Sign Up"}
          </ThemedText>
        </View>
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 5, // Reduce padding for a more compact button
    alignSelf: "flex-start", // Align button itself to the start
  },
  backButtonLabel: {
    fontSize: 20, // Adjust font size if "Back" text is too large
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: 60, // Add top padding to prevent content from going behind the back button
  },
  subtitle: {
    marginBottom: 24,
    textTransform: "capitalize",
  },
  inputContainer: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  buttonLabel: {
    fontWeight: "bold",
  },
  toggleTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  toggleLink: {
    fontWeight: "bold",
    marginLeft: 4,
  },
});
