import { StyleProp, TextProps, TextStyle } from "react-native";
import { Text as PaperText, useTheme } from "react-native-paper";

// Define the types for our custom props
interface ThemedTextProps extends TextProps {
  type?: "title" | "subtitle" | "body" | "error" | "link" | "small" | "label";
  // Allow passing custom styles, merging with our defaults
  style?: StyleProp<TextStyle>;
  // For link type, if it's tappable
  onPress?: () => void;
  // If you need to make it bold explicitly
  bold?: boolean;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  type = "body", // Default type
  style,
  onPress,
  bold,
  children,
  ...rest
}) => {
  const theme = useTheme();

  // Define base styles for different types
  const getTextStyle = (): TextStyle => {
    switch (type) {
      case "title":
        return {
          fontSize: 28,
          fontWeight: bold ? "bold" : "600",
          color: theme.colors.onSurface,
          textAlign: "center",
          marginBottom: 8,
        };
      case "subtitle":
        return {
          fontSize: 16,
          fontWeight: bold ? "bold" : "normal",
          color: theme.colors.onSurfaceVariant, // Or a slightly lighter text color
          textAlign: "center",
          marginBottom: 16, // Default subtitle spacing
        };
      case "body":
        return {
          fontSize: 14,
          fontWeight: bold ? "bold" : "normal",
          color: theme.colors.onSurface,
        };
      case "error":
        return {
          fontSize: 12,
          fontWeight: bold ? "bold" : "normal",
          color: theme.colors.error,
          textAlign: "center", // Error messages often benefit from centering
          marginTop: 4,
          marginBottom: 4,
        };
      case "link":
        return {
          fontSize: 14,
          fontWeight: bold ? "bold" : "normal",
          color: theme.colors.primary, // Links typically use primary color
          textDecorationLine: "underline",
        };
      case "small":
        return {
          fontSize: 12,
          fontWeight: bold ? "bold" : "normal",
          color: theme.colors.onSurfaceVariant,
        };
      case "label": // For input labels or small descriptive text
        return {
          fontSize: 12,
          fontWeight: bold ? "bold" : "normal",
          color: theme.colors.outline, // Or a subtle color
        };
      default:
        return {
          fontSize: 14,
          fontWeight: bold ? "bold" : "normal",
          color: theme.colors.onSurface,
        };
    }
  };

  return (
    <PaperText
      style={[getTextStyle(), style]} // Merge default styles with any custom styles
      onPress={onPress}
      {...rest}
    >
      {children}
    </PaperText>
  );
};
