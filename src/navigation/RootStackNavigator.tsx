import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/Authentication/Authentication.screen";
import { WelcomeScreen } from "../screens/Welcome/Welcome.screen";
import { useAuthStore } from "../stores/useAuthStore";
import { CustomerTabNavigator } from "./CustomerTabNavigator";
import { SellerTabNavigator } from "./SellerTabNavigator";

export type RootStackParamList = {
  Welcome: undefined;
  Authentication: { role: "customer" | "seller" };
  Home: undefined;
  CustomerApp: undefined;
  SellerApp: undefined;
};

const Stack = createNativeStackNavigator();

export const RootStackNavigator: React.FC = () => {
  const { isLoggedIn, userRole } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // Render the appropriate main app navigator based on userRole
          userRole === "customer" ? (
            <Stack.Screen
              name="CustomerApp"
              component={CustomerTabNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="SellerApp"
              component={SellerTabNavigator}
              options={{ headerShown: false }}
            />
          )
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Authentication"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
