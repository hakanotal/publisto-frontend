import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  View,
} from "react-native";
import apiUrl from "../constants/apiURL";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import validator from "validator";
const LoginPage = ({ navigation }) => {
  const ref_input2 = useRef();
  const ref_login = useRef();
  const storeToken = async (token) => {
    /*
     *   Store the token in the local storage
     */
    try {
      await AsyncStorage.setItem("private_token", token);
    } catch (error) {
      console.log(error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * FUNCTION
   * Try to login with the given credentials
   * Hand-made validation is replaced with validator.isEmail() from popular validator library
   */

  const tryLogin = async () => {
    if (validator.isEmail(email)) {
      const response = await fetch(apiUrl + "/api/v1/user/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status !== 200)
        throw Error("No account found with the given credentials. Try again!");

      const responseJSON = await response.json();
      storeToken(responseJSON.access_token);
      navigation.navigate("TabStack");
    } else {
      alert("You have entered invalid email. Try again!");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* KeyboardAwareScrollView hides forget pass and sign up parts  */}
      <KeyboardAwareScrollView>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.image}
        />

        <StatusBar style="auto" />
        <Text style={styles.text}>E-mail</Text>
        <SafeAreaView style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            onChangeText={(email) => setEmail(email)}
            onSubmitEditing={() => ref_input2.current.focus()}
          />
        </SafeAreaView>

        <Text style={styles.text}>Password</Text>
        <SafeAreaView style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            ref={ref_input2}
            onSubmitEditing={tryLogin}
          />
        </SafeAreaView>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={tryLogin}
          ref={ref_login}
        >
          <Text style={[styles.whiteText]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgot_button}>
          <Text style={[styles.colorPurple, styles.mt]}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgot_button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={[styles.colorPurple, styles.mt]}>
            Don't have an account?
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
    display: "flex",
    backgroundColor: "#fff",
    fontFamily: "KantumruyPro",
  },
  colorPurple: {
    color: "#7F7E7E",
  },
  mt: {
    marginTop: "10%",
    fontSize: 18,
  },
  whiteText: {
    color: "white",
    fontSize: 18,
  },
  image: {
    alignContent: "center",
    top: "15%",
    width: 300,
    height: 200,
    left: "5%",
  },

  text: {
    top: "18.8%",
    left: "3%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D54A4",
    textAlign: "left",
    left: "5%",
  },

  inputView: {
    backgroundColor: "#D9D9D9",
    top: "20%",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,
    left: "5%",
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
    top: "22%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5D54A4",
    left: "5%",
  },

  forgot_button: {
    width: "90%",
    top: "24%",
    alignItems: "center",
    justifyContent: "center",
    left: "5%",
  },

  signupBtn: {
    width: "80%",
    borderRadius: 25,
    top: "28%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5D54A4",
    left: "9%",
  },
  text_signUp: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5D54A4",
    top: "26%",
    left: "5%",
  },
});

export default LoginPage;
