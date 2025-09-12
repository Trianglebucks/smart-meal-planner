// ButtonProps from react-native is no longer needed
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper";

// Define the types for our custom props
// Use React.ComponentProps to get all props from PaperButton
// Then Omit the ones we want to handle with our custom 'type' prop
interface ThemedButtonProps
  extends Omit<
    React.ComponentProps<typeof PaperButton>,
    "mode" | "buttonColor" | "textColor"
  > {
  // Custom type for different button styles
  type?: "primary" | "secondary" | "outline" | "text" | "danger";
  // Allows overriding default styles
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  // Option to make the label bold by default
  bold?: boolean;
}

// The rest of your component code remains the same...
export const ThemedButton: React.FC<ThemedButtonProps> = ({
  type = "primary",
  style,
  labelStyle,
  bold = true,
  children,
  loading,
  disabled,
  ...rest
}) => {
  const theme = useTheme();

  let buttonMode: "text" | "outlined" | "contained" = "contained";
  let backgroundColor: string | undefined = undefined;
  let textColor: string | undefined = undefined;
  let borderColor: string | undefined = undefined;

  switch (type) {
    case "primary":
      buttonMode = "contained";
      backgroundColor = theme.colors.primary;
      textColor = theme.colors.onPrimary;
      break;
    case "secondary":
      buttonMode = "contained";
      backgroundColor = theme.colors.onSurfaceVariant;
      textColor = theme.colors.onSurface;
      break;
    case "outline":
      buttonMode = "outlined";
      borderColor = theme.colors.outline;
      textColor = theme.colors.primary;
      break;
    case "text":
      buttonMode = "text";
      textColor = theme.colors.primary;
      break;
    case "danger":
      buttonMode = "contained";
      backgroundColor = theme.colors.error;
      textColor = theme.colors.onError;
      break;
    default:
      buttonMode = "contained";
      backgroundColor = theme.colors.primary;
      textColor = theme.colors.onPrimary;
      break;
  }

  return (
    <PaperButton
      mode={buttonMode}
      buttonColor={backgroundColor}
      textColor={textColor}
      loading={loading}
      disabled={disabled || loading}
      style={[
        { borderRadius: theme.roundness * 2 },
        borderColor && { borderColor, borderWidth: 1 },
        style,
      ]}
      labelStyle={[{ fontWeight: bold ? "bold" : "normal" }, labelStyle]}
      {...rest}
    >
      {children}
    </PaperButton>
  );
};
