import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/Authentication/Authentication.screen";
import { HomeScreen } from "../screens/Home/Home.screen";
import { WelcomeScreen } from "../screens/Welcome/Welcome.screen";
import { useAuthStore } from "../stores/useAuthStore";

export type RootStackParamList = {
  Welcome: undefined;
  Authentication: { role: "customer" | "seller" };
  Home: undefined;
};

const Stack = createNativeStackNavigator();

export const RootStackNavigator: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <NavigationContainer>
      {/* Remove the global screenOptions from here */}
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            {/* Add the option specifically to the Welcome screen */}
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            {/* This screen will now show the header and back button by default */}
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
