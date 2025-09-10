import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/Authentication/Authentication.screen";
import { HomeScreen } from "../screens/Home/Home.screen";

const Stack = createNativeStackNavigator();

export const RootStackNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
