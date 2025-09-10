import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { z } from "zod";
import { authSchema } from "./Authentication.schema";

// This is a self-contained screen component.
export const AuthScreen = () => {
  // State to toggle between Login and Register modes
  const [isRegister, setIsRegister] = useState(false);
  const theme = useTheme(); // Access the theme from PaperProvider
  type FormData = z.infer<typeof authSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(authSchema(isRegister)),
    // Set default values for the form fields
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch the password field to validate confirmPassword
  const password = useRef({});
  password.current = watch("password", "");

  // Function to handle form submission
  const onSubmit = (data: FormData) => {
    console.log("Submitted! not applied yet...", data);
  };

  // Dynamic styles that use the theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      color: theme.colors.primary,
    },
    subtitle: {
      textAlign: "center",
      marginBottom: 24,
      color: theme.colors.onSurface,
    },
    inputContainer: {
      marginBottom: 12,
    },
    button: {
      marginTop: 16,
      paddingVertical: 8,
    },
    toggleTextContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    toggleText: {
      color: theme.colors.onSurface,
    },
    toggleLink: {
      fontWeight: "bold",
      color: theme.colors.primary,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {isRegister ? "Create Account" : "Welcome Back!"}
      </Text>
      <Text style={styles.subtitle}>
        {isRegister ? "Sign up to get started." : "Sign in to continue."}
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <HelperText type="error">{errors.email.message}</HelperText>
        )}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
            />
          )}
        />
        {errors.password && (
          <HelperText type="error">{errors.password.message}</HelperText>
        )}
      </View>

      {/* Confirm Password Input (only in Register mode) */}
      {isRegister && (
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Please confirm your password.",
              validate: (value) =>
                value === password.current || "The passwords do not match.",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Confirm Password"
                mode="outlined"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.confirmPassword}
              />
            )}
          />
          {errors.confirmPassword && (
            <HelperText type="error">
              {errors.confirmPassword.message}
            </HelperText>
          )}
        </View>
      )}

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        labelStyle={{ fontWeight: "bold" }}
      >
        {isRegister ? "Create Account" : "Log In"}
      </Button>

      {/* Toggle between Login and Register */}
      <View style={styles.toggleTextContainer}>
        <Text style={styles.toggleText}>
          {isRegister ? "Already have an account? " : "Don't have an account? "}
        </Text>
        <Text
          style={styles.toggleLink}
          onPress={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Sign In" : "Sign Up"}
        </Text>
      </View>
    </ScrollView>
  );
};
