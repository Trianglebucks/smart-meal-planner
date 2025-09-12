import { ThemedButton, ThemedSafeAreaView } from "@/src/components/atoms";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { Text } from "react-native";

export const AccountScreen = () => {
  const { logout } = useAuthStore();
  return (
    <ThemedSafeAreaView>
      <Text>Account.screen</Text>
      <ThemedButton onPress={logout}>Logout</ThemedButton>
    </ThemedSafeAreaView>
  );
};
