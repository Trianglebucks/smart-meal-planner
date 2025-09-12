// src/navigation/CustomerTabNavigator.tsx
import { AccountScreen } from "@/src/screens/Account/Account.screen";
import { EateriesScreen } from "@/src/screens/Customer/Eateries/Eataries.screen";
import { SearchScreen } from "@/src/screens/Customer/Search/Search.screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "react-native-paper"; // 1. Import the Icon component

export type CustomerTabParamList = {
  Eateries: undefined;
  Search: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<CustomerTabParamList>();

export const CustomerTabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      // 2. Change screenOptions to a function to access the `route` prop
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        // 3. Add the tabBarIcon option
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          // 4. Determine the icon name based on the route and focus state
          switch (route.name) {
            case "Eateries":
              iconName = focused ? "storefront" : "storefront-outline";
              break;
            case "Search":
              iconName = "magnify"; // This icon doesn't have a distinct outline version
              break;
            case "Account":
              iconName = focused ? "account-circle" : "account-circle-outline";
              break;
          }

          // 5. Return the Icon component from React Native Paper
          return <Icon source={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Eateries"
        component={EateriesScreen}
        options={{ title: "Eateries" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
};
