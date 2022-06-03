import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "../screen/menu/MenuScreen";
import Product from "../screen/menu/Product";
const Stack = createStackNavigator();

export default function MenuStackNavigation(props) {
  const { params } = props.route;
  //  console.log("Menustack", props);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Details"
        component={MenuScreen}
        initialParams={{ data: params }}
        options={{ title: "", headerTransparent: true, headerShown: false }}
/>
      <Stack.Screen
        name="Product"
        component={Product}
        initialParams={{ data: params }}
        options={{ title: "", headerTransparent: true, headerShown: false }}
      />
    </Stack.Navigator>
  );
}
