import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountScreen from "../screen/menu/AccountScreen";
import CartList from "../screen/menu/CartListScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import MenuStackNavigation from "./MenuStackNavigation";

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation(props) {
  const { params } = props.route;
  //console.log("tab:", params);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "#ligthgray",
        activeBackgroundColor: "#c4461",
        inactiveBackgorundColor: "#b55031",
      }}
    >
      <Tab.Screen
        name="Menu"
        component={MenuStackNavigation}
        initialParams={{ data: params }}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <Icon name="th-large" size={24} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        initialParams={{ data: params }}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <Icon name="user-circle" size={24} />,
        }}
      />
      <Tab.Screen
        name="CardList"
        component={CartList}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <Icon name="shopping-cart" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
