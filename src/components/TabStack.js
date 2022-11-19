import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from "./ProfilePage";
import ListPage from "./ListPage";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView
} from "react-native";


const Tab = createBottomTabNavigator();


const TabStack = ({ navigation }) => {

   return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="ProfilePage" component={ProfilePage} />
            <Tab.Screen name="ListPage" component={ListPage} />
        </Tab.Navigator>
   
    );

}


const styles = StyleSheet.create({
 
    container: {
    flex: 1,
    backgroundColor : "",
    display : "flex",
    backgroundColor: "#fff",
    },
    
    profile_image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        marginTop: 50,
        marginLeft: 100
    },
    text: {
        top: "18.8%",
        left:"3%",
        fontSize: 15,
        fontWeight: "bold",
        color: "#5D54A4",
        textAlign: "left",
        left : "5%"
    },

    
});
  
  export default TabStack;
