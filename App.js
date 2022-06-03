import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screen/auth/LoginScreen";
import SigninScreen from "./screen/auth/SigninScreen";
import LocationListScreen from "./screen/location/LocationListScreen";
import LocationScreen from "./screen/location/LocationScreen";
import TabNavigation from "./navigation/TabNavigation";

import { UserProvider } from "./context/UserContext";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={SigninScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LocationList"
            component={LocationListScreen}
            options={{ title: "", headerTransparent: true, headerShown: false }}
          />
          <Stack.Screen
            name="GetLocation"
            component={LocationScreen}
            options={{ title: "", headerTransparent: true, headerShown: false }}
          />
          <Stack.Screen
            name="Stack"
            component={TabNavigation}
            options={{ title: "", headerTransparent: true, headerShown: false }}
          />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}
