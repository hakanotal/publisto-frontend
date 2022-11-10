import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";

import { SafeAreaView , StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";

const OpennigPage = ({navigation}) => {
    return (
            <SafeAreaView style={styles.container}>
            <Text style={styles.text_welcome}>Welcome to the bla bla </Text>
            <Image source={require('./Icon.png')} style= {styles.image}/>
            <Text style={styles.text1}> Do You Have an Account? </Text>
            <TouchableOpacity style={styles.loginBtn} onPress = {() => navigation.navigate('Signin')}>
                <Text style={{color:"#FFFFFF"}}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.text2}> Is it your first time? </Text>
            <TouchableOpacity style={styles.SignupBtn} onPress = {() => navigation.navigate('Signup')} >
                <Text style={{color:"#FFFFFF"}}>Sign Up</Text>
            </TouchableOpacity>
            </SafeAreaView>
        )

}


const styles = StyleSheet.create({
   

    container: {
    flex: 1,
    backgroundColor : "",
    display : "flex",
    backgroundColor: "#fff",
    },
    text_welcome: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "sans-serif",
        color: "#000000",
        top: "15%",
        left :"5%"
    },
    image: {
        width: 300,
        height: 200,
        alignSelf: "center",
        top: "22%",
        left: "5%",
    },
    text1 : 
    {
        top: "25%",
        left:"3%",
        fontSize: 15,
        fontFamily: "sans-serif",
        fontWeight: "bold",
    },

    text2 : 
    {
        top: "32%",
        left:"3%",
        fontSize: 15,
        fontFamily: "sans-serif",
        fontWeight: "bold",
    },
    loginBtn: {
        width: "90%",
        top: "27%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        left: "5%",
        backgroundColor: "#5D54A4",
    },
    SignupBtn: {
        width: "90%",
        top: "35%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        left: "5%",
        backgroundColor: "#5D54A4",
    },
});

export default OpennigPage;