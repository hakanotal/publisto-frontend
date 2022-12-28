import React, { useState, Component, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import takeRecommendation from "../functions/takeRecommendation";
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
  HStack,
  Spinner,
  Heading,
  Link,
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
  const [id, setId] = useState("");

  const [image, setImage] = useState("");

  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [showModalRec, setShowModalRec] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [recipes, setRecipes] = useState([]);
  const [urls, setUrls] = useState([]);

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

  const validatePassword = (password) => {
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    };

  const updateProfile = async () => {
    if (!checkInputs()) {
      return;
    }
    let nameToSend 
    let emailToSend
    if (newname === "" || newname === " " || newname.length == 0) {
      nameToSend = name;
    }
    else{
      nameToSend = newname;
    }

    if (newemail === "" || newemail === " " || newemail.length == 0) {
      emailToSend = email;
    }
    else{
      emailToSend = newemail;
    }
    
    

    (async function () {
      console.log(nameToSend, emailToSend, password, password)
      response = await updateUserInfo(nameToSend, emailToSend, password, password);
      console.log(response)
      if (response && response.access_token) {
        storeToken(response.access_token);
        setEditProfile(false);
        setName(nameToSend);
        setEmail(emailToSend);
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

  const changePasswordHandler = async () => {
    if(validatePassword(newPassword) == false){
      alert("Password must be at least 8 characters and contain at least one letter and one number");
      return;
    }
    if (password == "") {
      alert("Please enter your current password");
      return;
    }
    if (newPassword == "") {
      alert("Please enter your new password");
      return;
    }
    if (confirmNewPassword == "") {
      alert("Please confirm your new password");
      return;
    }
    if (newPassword != confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }
    (async function () {
      console.log(name, email, password, newPassword, confirmNewPassword)
      response = await updateUserInfo(
        name,
        email,
        password,
        newPassword,
      );
      console.log(response)
      if (response && response.access_token) {
        storeToken(response.access_token);
        setShowModalRec(false);
        setChangePassword(false);
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        alert("Password updated successfully");
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
      setId(user_data.id);
    })();
  
  }, []);
  
 const handleRecommendation = async () => {
  setShowModalRec(true);
  console.log(recipes["0"])
  const response = await takeRecommendation(id);
    if (response) {
      setRecipes(response.recipe);
      setUrls(response.url);  
    console.log(recipes["0"])
    }
  };

  if (!image) {
    return (
      <Box alignItems="center" justifyContent="center" safeAreaTop flex="1">
        <Text color="purple.700">Loading...</Text>
      </Box>
    );
  }

  return (
    <Box alignItems="center" safeAreaTop flex="1" pt={5}>
      <Modal isOpen={showModalRec} onClose={() => {setShowModalRec(false); setRecipes([]); setUrls([])}} size="lg">
        <Modal.Content maxWidth="350" bg="muted.200" maxHeight={300} rounded="2xl">
          <Modal.Header
            bg="muted.200"
            _text={{ color: "bluegray", textAlign: "center" }}
          >
            <Text fontSize="lg" fontWeight="bold" alignContent={"center"}>
              Your Recommendations
            </Text>
          </Modal.Header>
          <Modal.Body bg="muted.200">
        
            {recipes["0"]? (
                <Box>
                    <Link
                    href = {urls["0"]}
                      _text={{
                      pt:"1",
                      color:"purple.700",
                      fontSize:"lg",
                      fontWeight:"bold",
                      alignContent:"center"
                    }}
                    >
                      {recipes["0"]}
                    
                    </Link>
                    <Link
                    href = {urls["1"]}
                      _text={{
                      pt:"2",
                      color:"purple.700",
                      fontSize:"lg",
                      fontWeight:"bold",
                      alignContent:"center"
                    }}
                    >
                      {recipes["1"]}
                    </Link>

                    <Link
                    href = {urls["2"]}

                      _text={{
                      pt:"2",
                      pb :"6",
                      color:"purple.700",
                      fontSize:"lg",
                      fontWeight:"bold",
                      alignContent:"center"
                    }}
                    >
                      {recipes["2"]}
                    </Link>
                    </Box>
            ) : (
            <HStack space={3}  height="20" justifyContent="center">
              <Spinner color="purple.900" accessibilityLabel="Loading posts" />
                <Heading color="purple.900" pt={"7"} fontSize="md">
                  Loading
                </Heading>
            </HStack>
          )
          }
          <Modal.Footer bg="muted.200">
            <Box 
            flex={1}
            bg="purple.900"
            rounded="full"
            borderColor="muted.800"
            fontSize="lg"
            w="330"
            >
              <Button variant={"ghost"}
                onPress={() => {setShowModalRec(false); setRecipes([]); setUrls([])}}
                _text={{ color: "white" }}
              >
                Close
              </Button>
              </Box>
          </Modal.Footer>
          </Modal.Body>
        </Modal.Content>
      </Modal>
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
          contentContainerStyle={{ width: 400, height: 730 }}
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
              <Box bg={"purple.900"} mt="7" ml="10" h={42} rounded="md" w={200}>
                <Button variant="ghost" onPress={updateProfile}>
                  <Text color="white" fontSize="15">
                    Save Changes
                  </Text>
                </Button>
              </Box>
              <Box bg={"purple.900"} mt="5" ml="10" h={42} rounded="md" w={200}>
                <Button variant="ghost" onPress={() => {setChangePassword(true); setEditProfile(false)}}>
                  <Text color="white" fontSize="15">
                    Change Password
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
      ) : !editProfile  && !changePassword &&  (
        <Box w="75%" maxW="300px">
          <Flex px={5}>
            <Text fontSize="lg" mt="6">
              Name: {name}
            </Text>
            <Text fontSize="lg" pb={10} mt="6">
              Email: {email}
            </Text>
          </Flex>
          <Flex pb={5} px={3}>
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
          <Flex pb={5} px={3}>
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
                  handleRecommendation();
                }}
              >
                Take Recommendation
              </Button>
            </Box>
          </Flex>
          <Flex pb={5} px={3}>
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
      {changePassword && (
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ width: 400, height: 430 }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <FormControl isInvalid w="75%" maxW="300px">
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
              <FormControl.Label isRequired mt="6">
                Confirm New Password
              </FormControl.Label>
              <Input
                type="password"
                placeholder="********"
                onChangeText={(text) => setConfirmNewPassword(text)}
              />
              <Box bg={"purple.900"} mt="7" ml="10" h={42} rounded="md" w={200}>
                <Button variant="ghost" onPress={changePasswordHandler}>
                  <Text color="white" fontSize="15">
                    Change Password
                  </Text>
                </Button>
              </Box>
              <Box bg={"purple.900"} mt="5" ml="10" h={42} rounded="md" w={200}>
                <Button variant="ghost" onPress={() => setChangePassword(false)}>
                  <Text color="white" fontSize="15">
                    Cancel
                  </Text>
                </Button>
              </Box>
            </FormControl>
          </View>
        </KeyboardAwareScrollView>
                )}
    </Box>
  );
};
