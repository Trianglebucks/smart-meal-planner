import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme, // Start with the default theme
  // Override colors with an "Appetizing & Welcoming" palette
  colors: {
    ...DefaultTheme.colors,
    // Primary: A warm, inviting teal that represents freshness and community.
    primary: "#00897B", // Deep Teal

    // On Primary: Text/icons that appear on the primary color.
    onPrimary: "#FFFFFF", // White

    // Background: A clean, soft off-white for main screen backgrounds.
    background: "#F5F5F5", // Light Gray (almost white)

    // Surface: For cards, sheets, and components that sit on the background.
    surface: "#FFFFFF", // Pure White (for elevated elements)

    // On Surface: Text/icons that appear on the surface color.
    onSurface: "#424242", // Dark Gray (for main content)

    // Text: General body text.
    // Using onSurface for general text usually works well for consistency.
    // You can also define 'onBackground' if needed for text on the main app background.
    onBackground: "#424242", // Dark Gray

    // Tertiary: A vibrant, warm accent for highlights, alerts, or special actions (e.g., "Sold Out").
    tertiary: "#FFC107", // Amber Yellow

    // Error: Standard for error states.
    error: "#B00020", // Red
    onError: "#FFFFFF", // White

    // Outline: For borders, dividers, or disabled states.
    outline: "#BDBDBD", // Medium Gray
  },
};
