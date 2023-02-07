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
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import apiUrl from "../constants/apiURL";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import validator from "validator";
const SignUpPage = ({ navigation }) => {
  function isValidPass(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const trySignUp = async () => {
    if (name.length === 0) {
      alert("Empty name field");
      return;
    }
    // Copilot write me a name checker that gives alert if name start with number or contains only numbers

    if (validator.isNumeric(name)) {
      alert("Name must contain at least 1 letter");
      return;
    }
    if (!isValidPass(password)) {
      alert(
        "Password must contain at least 1 letter and 1 number also at least 8 characters"
      );
      return;
    }
    if (validator.isEmail(email)) {
      let response = await fetch(apiUrl + "/api/v1/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status != 200) throw new Error("User already exists");
          response.json();
        })
        .then((json) => {
          alert("User created successfully");
          navigation.navigate("Signin");
        })
        .catch((error) => alert(error));

      return response;
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraScrollHeight={50}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ width: 400, height: 700 }}
      >
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.image}
        />
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

        <TouchableOpacity style={styles.loginBtn} onPress={trySignUp}>
          <Text style={{ color: "#FFFFFF" }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgot_button}
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text style={{ color: "#777" }}>Do you have an account? Login.</Text>
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

  image: {
    alignContent: "center",
    width: 300,
    height: 200,
    top: "15%",
    left: "5%",
  },

  text: {
    top: "18.8%",
    left: "5%",
    fontSize: 15,
    fontFamily: "sans-serif",
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
    left: "5%",
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
});
export default SignUpPage;
