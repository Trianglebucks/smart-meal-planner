import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  HelperText,
  TextInput as PaperInput,
  useTheme,
} from "react-native-paper";

// Use React.ComponentProps to get all the props from the Paper's TextInput
// This ensures we have access to `label`, `left`, `right`, `keyboardType`, etc.
interface ThemedInputProps extends React.ComponentProps<typeof PaperInput> {
  /**
   * Custom style for the container View.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * A helper prop to simplify error handling. If a string is provided,
   * the input will be in the 'error' state, and this string will be
   * displayed as the helper text.
   */
  errorText?: string;
}

/**
 * A themed, reusable TextInput component that wraps React Native Paper's TextInput.
 * It provides sensible defaults and adds features like simplified error message
 * display and an automatic password visibility toggle.
 */
export const ThemedInput: React.FC<ThemedInputProps> = ({
  style,
  errorText,
  secureTextEntry,
  ...rest
}) => {
  const theme = useTheme();
  // State to manage password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // This allows the password toggle to work only when secureTextEntry is true
  const isSecure = secureTextEntry && !isPasswordVisible;

  // Function to render the password toggle icon
  const renderPasswordToggleIcon = () => {
    if (secureTextEntry) {
      return (
        <PaperInput.Icon
          icon={isPasswordVisible ? "eye-off" : "eye"}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          forceTextInputFocus={false} // Prevents keyboard from dismissing on tap
        />
      );
    }
    // If it's not a secure input, don't render any icon from this logic
    // This allows the user to still pass their own `right` prop if needed.
    return rest.right;
  };

  return (
    <View style={style}>
      <PaperInput
        // --- Sensible Defaults ---
        mode="outlined"
        style={{ backgroundColor: theme.colors.surface }}
        // --- Prop Handling ---
        {...rest} // Pass all other props like `label`, `value`, `onChangeText`
        // --- Enhanced Features ---
        secureTextEntry={isSecure}
        error={!!errorText} // Automatically set error state if errorText exists
        right={renderPasswordToggleIcon()} // Add the toggle icon for secure entries
      />
      {/* The HelperText component displays error messages or hints.
        We make it visible only when `errorText` is provided.
      */}
      {!!errorText && (
        <HelperText type="error" visible={!!errorText}>
          {errorText}
        </HelperText>
      )}
    </View>
  );
};
