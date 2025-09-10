import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme, // Start with the default theme
  // Override colors with the "Smart & Modern" palette
  colors: {
    ...DefaultTheme.colors,
    primary: "#2196F3", // Primary Blue: for buttons, app bars, active states
    background: "#FFFFFF", // Neutral White: for screen backgrounds
    surface: "#ECEFF1", // Light Gray: for card backgrounds
    text: "#263238", // Dark Navy/Slate: for body text (you can also use 'onSurface')
    tertiary: "#FFC107", // Accent Yellow: for highlights and special call-to-actions
  },
};
