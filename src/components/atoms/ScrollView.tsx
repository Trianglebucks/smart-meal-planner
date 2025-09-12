import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

/**
 * A custom ScrollView component that automatically applies the theme's
 * background color. It accepts all the same props as the original
 * React Native ScrollView, making it a seamless, theme-aware replacement.
 */
export const ThemedScrollView = ({ style, ...props }: ScrollViewProps) => {
  // 1. Get the current theme from the provider.
  const theme = useTheme();

  // 2. Create a base style object that applies the theme's background color.
  const themedStyle = {
    backgroundColor: theme.colors.background,
  };

  return (
    // 3. Use the original ScrollView.
    //    - The `style` prop is an array. It applies our themed style first,
    //      then merges any additional styles passed in via props. This allows
    //      for further customization on a per-use basis.
    <ScrollView
      style={[styles.base, themedStyle, style]}
      {...props} // Pass through all other props like `contentContainerStyle`, etc.
    />
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});
