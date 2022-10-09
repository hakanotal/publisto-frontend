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

const SignUpPage = () => {




    return(
        <SafeAreaView>
            <TouchableOpacity>
                <TouchableOpacity style={styles.signInBtn} onPress ={tryLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </TouchableOpacity>

        </SafeAreaView>

    );
} 


const styles = StyleSheet.create({

    container : {

    },

    signInBtn : {

    }

})