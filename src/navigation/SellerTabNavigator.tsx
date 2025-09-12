// src/navigation/SellerTabNavigator.tsx
import { AccountScreen } from "@/src/screens/Account/Account.screen";
import { HomeScreen } from "@/src/screens/Seller/Home/Home.screen";
import { MenuScreen } from "@/src/screens/Seller/Menu/Menu.screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "react-native-paper"; // 1. Import Icon

export type SellerTabParamList = {
  Home: undefined;
  Menu: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<SellerTabParamList>();

export const SellerTabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        // 2. Add the tabBarIcon option to render icons
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Menu":
              iconName = focused
                ? "book-open-page-variant"
                : "book-open-page-variant-outline";
              break;
            case "Account":
              iconName = focused ? "account-circle" : "account-circle-outline";
              break;
          }

          // Return the React Native Paper Icon component
          return <Icon source={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ title: "Menu" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
};
