import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import { AsyncStorage } from 'react-native';

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


const ListPage = ({ navigation }) => {

    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('private_token');
            if (value !== null) {
            // We have data!!
            console.log(value);
            return value
            }
        } catch (error) {
          console.log(error);
            // Error retrieving data
        }
    };
    return (
            <SafeAreaView style={styles.container}>
            <Text style={styles.text}>List Page</Text>
            </SafeAreaView>
        );
    }


const styles = StyleSheet.create({
 
    container: {
    flex: 1,
    backgroundColor : "",
    display : "flex",
    backgroundColor: "#fff",
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
  
  export default ListPage;
