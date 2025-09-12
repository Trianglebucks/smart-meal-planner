import { useAuthStore } from "@/src/stores/useAuthStore";
import * as React from "react";
import { Appbar, Button } from "react-native-paper";

export const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <Appbar.Header>
      <Appbar.Content title="Suki Menu" />
      <Button mode="text" onPress={logout}>
        Log Out
      </Button>
    </Appbar.Header>
  );
};
