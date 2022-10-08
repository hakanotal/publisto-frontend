import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
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


const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    },

    inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
    },

    TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    },

    forgot_button: {
    height: 30,
    marginBottom: 30,
    },

    loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
},
});
  
  export default LoginPage;



  