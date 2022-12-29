import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
const { startListeningDb } = require("../api/dbListener");

import resetPass from "../functions/resetPass";
import apiUrl from "../constants/apiURL";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Modal, Text, Input, Button } from "native-base";
import validator from "validator";
import verifyPass from "../functions/verifyPass";
import getUserInfo from "../functions/getUserInfo";
const LoginPage = ({ navigation ,NotificationUpdate}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updatePassword2, setUpdatePassword2] = useState("");
  const [updateCode, setUpdateCode] = useState("");
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
    if (email.length === 0) {
      alert("Empty email field");
      return;
    }
    if (password.length === 0) {
      alert("Empty password field");
      return;
    }
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
      if (response.status !== 200) {
        alert("You have entered invalid email or password. Try again!");
        return;
      }

      const responseJSON = await response.json();
      storeToken(responseJSON.access_token);
      const userData = await getUserInfo();
      startListeningDb(userData.id, false);
      navigation.navigate("TabStack");
      NotificationUpdate();
    } else {
      alert("You have entered invalid email. Try again!");
    }
  };
  return (
    <View style={styles.container}>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350" bg="muted.200" h="56" rounded="2xl">
          <Modal.Header
            bg="muted.200"
            _text={{ color: "bluegray", textAlign: "center" }}
          >
            Enter Your E-mail
          </Modal.Header>
          <Modal.Body bg="muted.200">
            <Input
              variant="outline"
              placeholder="example@mail.com"
              color="black"
              onChangeText={(email) => setUpdateEmail(email)}
            />
          </Modal.Body>
          <Modal.Footer bg="muted.200">
            <Button
              flex="1"
              colorScheme="purple"
              onPress={() => {
                (async function () {
                  const is_valid = await resetPass(updateEmail);
                  if (is_valid) {
                    setShowModal2(true);
                    alert("An email has been sent to you!");
                  }
                  setShowModal(false);
                })();
              }}
            >
              Send me an email
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350" bg="muted.200" h="96" rounded="2xl">
          <Modal.Header
            bg="muted.200"
            _text={{ color: "bluegray", textAlign: "center" }}
          >
            Reset Your password
          </Modal.Header>
          <Modal.Body bg="muted.200">
            <Text ml="3">New Password:</Text>

            <Input
              mb="2"
              variant="outline"
              placeholder="*******"
              type="password"
              color="black"
              onChangeText={(password) => setUpdatePassword(password)}
            />
            <Text ml="3">Re-enter Password:</Text>
            <Input
              mb="4"
              variant="outline"
              placeholder="*******"
              color="black"
              type="password"
              onChangeText={(password) => setUpdatePassword2(password)}
            />
            <Text ml="3">Code:</Text>

            <Input
              mb="4"
              variant="outline"
              placeholder="000000"
              color="black"
              onChangeText={(code) => setUpdateCode(code)}
            />
          </Modal.Body>
          <Modal.Footer bg="muted.200">
            <Button
              flex="1"
              colorScheme="purple"
              onPress={() => {
                // Check if two password are the same
                // Check the code is 348956
                if (updatePassword !== updatePassword2) {
                  alert("The two passwords are not the same");
                  return;
                }
                (async function () {
                  await verifyPass(updateEmail, updatePassword, updateCode);
                })();
                // (async function () {
                //   await resetPass(updateEmail);
                // })();
                setShowModal2(false);
              }}
            >
              Reset My Password
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraScrollHeight={50}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ width: 400, height: 750 }}
      >
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
        <TouchableOpacity
          style={styles.forgot_button}
          onPress={() => {
            setShowModal(true);
          }}
        >
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
    </View>
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
