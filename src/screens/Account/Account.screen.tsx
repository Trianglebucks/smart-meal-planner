import { ThemedButton, ThemedSafeAreaView } from "@/src/components/atoms";
// 1. Correct the import path to your new refactored hook file
import { useLogout } from "@/src/hooks/useAuthHook";
import { Text } from "react-native";

export const AccountScreen = () => {
  const { logout, isLoggingOut } = useLogout();

  // 2. Simplified handler - no async or try/catch needed
  const handlePressLogout = () => {
    logout();
  };

  return (
    <ThemedSafeAreaView>
      <Text>Account.screen</Text>
      <ThemedButton onPress={handlePressLogout} loading={isLoggingOut}>
        Logout
      </ThemedButton>
    </ThemedSafeAreaView>
  );
};
