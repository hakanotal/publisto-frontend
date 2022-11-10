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


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const tryLogin = async () => {
        let response = await fetch(
            'https://fastapi-ituitis-otal18.cloud.okteto.net/user/signin',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        )
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.error(error));

        return response;
    };

    return (
        <SafeAreaView>
            <SafeAreaView style={styles.container}>
            <Image source={require('./Icon.png')} style= {styles.image}/>
                <StatusBar style="auto" />
             <Text style={styles.text}>E-mail</Text>   
                <SafeAreaView style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    onChangeText={(email) => setEmail(email)}
                />
                </SafeAreaView>
                <Text style={styles.text}>Password</Text>
            <SafeAreaView style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </SafeAreaView>
        
            <TouchableOpacity style={styles.loginBtn} onPress ={tryLogin}>
                <Text style={{color:"#FFFFFF"}}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgot_button}>
                <Text style={{color:"#7F7E7E"}} >Forgot Password?</Text>
            </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
        );
    }


const styles = StyleSheet.create({
 

    container: {
    flex: 1,
    top: "15%",
    backgroundColor : "",
    display : "flex",
    backgroundColor: "#fff",
    },
    
    image: {
        alignContent: "center",
        width : 300,
        height : 200
    },

    text: {
        top: "3.8%",
        left:"3%",
        fontSize: 15,
        fontFamily: "Kantumruy-Regular",
        fontWeight: "bold",
        color: "#5D54A4",
        textAlign: "left",
    },

    inputView: {
    backgroundColor: "#D9D9D9",
    top: "5%",
    borderRadius: 30,
    width: "90%",
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

    loginBtn: {
        width: "90%",
        borderRadius: 25,
        top: "7%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5D54A4",
    },

    forgot_button: {
        width: "90%",
        top: "9%",
        alignItems: "center",
        justifyContent: "center",
    }

    
});
  
  export default LoginPage;
