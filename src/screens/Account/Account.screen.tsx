import { ThemedButton, ThemedSafeAreaView } from "@/src/components/atoms";
import { useLogout } from "@/src/hooks/useAuthHook";
import { Text } from "react-native";

export const AccountScreen = () => {
  const { logout, isLoggingOut } = useLogout();

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
