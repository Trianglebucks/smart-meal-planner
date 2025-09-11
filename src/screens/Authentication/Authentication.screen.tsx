import { ThemedScrollView } from "@/src/components/atoms/ScrollView";
import { useAuth } from "@/src/hooks/useAuthHook"; // Assuming the hook is in this path
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

export const AuthScreen = () => {
  const [isRegister, setIsRegister] = useState(false);

  const { control, errors, loading, error, handleAuthSubmit } =
    useAuth(isRegister);

  return (
    <ThemedScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {isRegister ? "Create Account" : "Welcome Back!"}
      </Text>
      <Text style={styles.subtitle}>
        {isRegister ? "Sign up to get started." : "Sign in to continue."}
      </Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
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

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="password"
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

      {isRegister && (
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="confirmPassword"
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

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button
        mode="contained"
        onPress={handleAuthSubmit}
        style={styles.button}
        labelStyle={{ fontWeight: "bold" }}
        loading={loading}
        disabled={loading}
      >
        {isRegister ? "Create Account" : "Log In"}
      </Button>

      <View style={styles.toggleTextContainer}>
        <Text>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
        </Text>
        <Text
          style={styles.toggleLink}
          onPress={() => {
            if (!loading) {
              setIsRegister(!isRegister);
            }
          }}
        >
          {isRegister ? "Sign In" : "Sign Up"}
        </Text>
      </View>
    </ThemedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Use flexGrow to ensure content can scroll if needed
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  errorText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 4,
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
