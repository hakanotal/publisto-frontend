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


const SignUpPage = ({ navigation })=> {
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    const cloud_url = "https://eurmpfph3wu5w7rmksrgt46b5q0prnws.lambda-url.eu-central-1.on.aws"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const trySignUp = async () => {
        if (isValidEmail(email)){
            let response = await fetch(
                cloud_url + '/api/v1/user/signup',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": name,
                        "email": email,
                        "password": password,
                    }),
                }
            )
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch((error) => console.error(error));

            return response;
        }
        else{
            alert("Please enter a valid email address")
        }
    };

    return (
            <SafeAreaView style={styles.container}>
            <Image source={require('./Icon.png')} style= {styles.image}/>
                <StatusBar style="auto" />
                <Text style={styles.text}>Name</Text>   
                <SafeAreaView style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    onChangeText={(name) => setName(name)}
                />
                </SafeAreaView>
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
        
            <TouchableOpacity style={styles.loginBtn} onPress ={trySignUp}>
                <Text style={{color:"#FFFFFF"}}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgot_button}>
                <Text style={{color:"#7F7E7E"}} >Forgot Password?</Text>
            </TouchableOpacity>
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
    
    image: {
        alignContent: "center",
        width : 300,
        height : 200,
        top : "15%",
        left : "5%"
    },

    text: {
        top: "18.8%",
        left:"5%",
        fontSize: 15,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "#5D54A4",
        textAlign: "left",
        left : "5%"

    },

    inputView: {
        backgroundColor: "#D9D9D9",
        top: "20%",
        borderRadius: 30,
        width: "90%",
        height: 45,
        marginBottom: 20,
        left : "5%"
        },

    TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    left : "5%"

    },

    loginBtn: {
        width: "90%",
        borderRadius: 25,
        top: "22%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5D54A4",
        left : "5%"

    },

    forgot_button: {
        width: "90%",
        top: "24%",
        alignItems: "center",
        justifyContent: "center",
        left : "5%"

    }

    
});
  export default SignUpPage;
