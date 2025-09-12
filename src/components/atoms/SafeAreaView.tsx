import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";

interface ThemedSafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ThemedSafeAreaView: React.FC<ThemedSafeAreaViewProps> = ({
  children,
  style,
}) => {
  const theme = useTheme();

  // 2. Create a base style object that applies the theme's background color.
  const themedStyle = {
    backgroundColor: theme.colors.background,
  };
  return (
    <SafeAreaView style={[styles.container, themedStyle, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
