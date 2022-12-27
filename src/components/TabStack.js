import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "../pages/ProfilePage";
import ListsPage from "../pages/ListsPage";
import PublicListPage from "../pages/PublicListPage";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const TabStack = ({ route, navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBar: true,
        tabBarLabelStyle: {
          fontFamily: "KantumruyProBold",
          fontSize: 12,
          color: "purple",
        },
      }}
    >
      <Tab.Screen
        name="Private Lists"
        component={ListsPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={24} color="purple" />
          ),
        }}
      />
      <Tab.Screen
        name="Public Lists"
        component={PublicListPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={24} color="purple" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={24} color="purple" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
    display: "flex",
    backgroundColor: "#fff",
  },

  profile_image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 50,
    marginLeft: 100,
  },
  text: {
    top: "18.8%",
    left: "3%",
    fontSize: 15,
    fontWeight: "bold",
    color: "#5D54A4",
    textAlign: "left",
    left: "5%",
  },
});

export default TabStack;
