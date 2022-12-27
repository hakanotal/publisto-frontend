import React, { useState, Component, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getToken from "../functions/getToken";
import apiUrl from "../constants/apiURL";
import { Image } from "react-native";
import {
  Box,
  Button,
  Text,
  FormControl,
  Input,
  Modal,
  Flex,
  View,
} from "native-base";
// update user profile function
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { startListeningDb } = require("../api/dbListener");

import updateUserInfo from "../functions/updateUserInfo";

const getUserInfo = async () => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/user/profile", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });
  if (response.status !== 200) {
    console.log("Error: " + response.status);
  }
  const data = await response.json();
  return data;
};

export default ProfilePage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newname, setNewName] = useState("");
  const [newemail, setNewEmail] = useState("");
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
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkInputs = () => {
    if (newname == "" && newemail == "") {
      alert("Please enter a new name or email");
      return false;
    }
    if (newname != "" && newname.length < 3) {
      alert("Name must be at least 3 characters");
      return false;
    }
    if (newemail != "" && !validateEmail(newemail)) {
      alert("Please enter a valid email");
      return false;
    }
    if (password == "") {
      alert("Please enter your current password");
      return false;
    }

    return true;
  };

  const handleUpdate = async () => {
    if (!checkInputs()) {
      return;
    }
    if (newname == "") {
      setNewName(name);
    }
    if (newemail == "") {
      setNewEmail(email);
    }
    (async function () {
      response = await updateUserInfo(newname, newemail, password, newPassword);
      if (response && response.access_token) {
        storeToken(response.access_token);
        setShowModal(false);
        setEditProfile(false);
        setName(newname);
        setEmail(newemail);

        setNewEmail("");
        setNewName("");
        setPassword("");
        // Ha
        alert("Profile updated successfully");
      } else {
        alert("Password is incorrect. Please try again.");
      }
    })();
  };
  // useEffect run when the page is first loaded
  useEffect(() => {
    (async function () {
      const user_data = await getUserInfo();
      setName(user_data.name);
      setEmail(user_data.email);
      setImage(user_data.image);
    })();
  }, []);

  if (!image) {
    return (
      <Box alignItems="center" justifyContent="center" safeAreaTop flex="1">
        <Text color="purple.700">Loading...</Text>
      </Box>
    );
  }

  return (
    <Box alignItems="center" safeAreaTop flex="1" pt={5}>
      {!editProfile && image && (
        <Image
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderColor: "purple",
            borderRadius: 100,
            marginBottom: 40,
            marginTop: 20,
          }}
          source={{ uri: `data:image/png;base64,${image}` }}
        ></Image>
      )}
      {editProfile && image ? (
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ width: 400, height: 700 }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                borderWidth: 1,
                borderColor: "purple",
                borderRadius: 100,
                marginBottom: 20,
                marginTop: 20,
              }}
              source={{ uri: `data:image/png;base64,${image}` }}
            ></Image>
            <FormControl isInvalid w="75%" maxW="300px">
              <FormControl.Label mt="6">E-mail</FormControl.Label>
              <Input
                placeholder={email}
                mt="1"
                onChangeText={(text) => setNewEmail(text)}
              />
              <FormControl.Label mt="6">Name</FormControl.Label>
              <Input
                placeholder={name}
                mt="1"
                onChangeText={(text) => setNewName(text)}
              />
              <FormControl.Label isRequired mt="6">
                Current Password
              </FormControl.Label>
              <Input
                type="password"
                placeholder="********"
                onChangeText={(text) => setPassword(text)}
              />
              <FormControl.Label isRequired mt="6">
                New Password
              </FormControl.Label>
              <Input
                type="password"
                placeholder="********"
                onChangeText={(text) => setNewPassword(text)}
              />

              <Box bg={"purple.900"} mt="7" ml="10" h={42} rounded="md" w={200}>
                <Button variant="ghost" onPress={handleUpdate}>
                  <Text color="white" fontSize="15">
                    Save Changes
                  </Text>
                </Button>
              </Box>
              <Box bg={"purple.900"} mt="5" ml="10" h={42} rounded="md" w={200}>
                <Button variant="ghost" onPress={() => setEditProfile(false)}>
                  <Text color="white" fontSize="15">
                    Cancel
                  </Text>
                </Button>
              </Box>
            </FormControl>
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <Box w="75%" maxW="300px">
          <Flex px={5}>
            <Text fontSize="lg" mt="6">
              Name: {name}
            </Text>
            <Text fontSize="lg" pb={10} mt="6">
              Email: {email}
            </Text>
          </Flex>
          <Flex pb={10} px={3}>
            <Box rounded="md" w={280} h={12} bgColor="purple.900">
              <Button
                variant="ghost"
                delayLongPress={10}
                _text={{
                  fontSize: "md",
                  color: "white",
                  fontWeight: "bold",
                }}
                onPress={() => {
                  setEditProfile(true);
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Flex>
          <Flex pb={10} px={3}>
            <Box rounded="md" w={280} h={12} bgColor="purple.900">
              <Button
                variant="ghost"
                delayLongPress={10}
                _text={{
                  fontSize: "md",
                  color: "white",
                  fontWeight: "bold",
                }}
                onPress={async () => {
                  try {
                    await AsyncStorage.clear();
                    startListeningDb(3169, true);
                  } catch (error) {
                    console.log(error);
                  }
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Signin" }],
                  });
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
