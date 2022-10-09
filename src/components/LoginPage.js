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
    return (
        <SafeAreaView>

            <Image source={require('./cat.webp')} style= {styles.image}/>

            <SafeAreaView style={styles.container}>

                <StatusBar style="auto" />
                <SafeAreaView style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
                </SafeAreaView>
        
            <SafeAreaView style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </SafeAreaView>
        
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
                
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
        );
    }


const styles = StyleSheet.create({
    image: {
        alignContent: "center",
        top : "50%",
        left : 40,
        width : 300,
        height : 200
    }
    ,

    container: {
    flex: 1,
    backgroundColor : "",
    top : "90%",
    width : "100%",
    height : "80%",
    display : "flex",
    alignContent : "center",
    padding : 20,
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



  