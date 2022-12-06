import React, { useState, Component, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getToken from "../functions/getToken";
const cloud_url =
  "https://e6waofnzq8.execute-api.eu-central-1.amazonaws.com/main";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import {
  Box,
  Button,
  Heading,
  Text,
  Center,
  Container,
  FormControl,
  Input,
  Modal,
} from "native-base";
// update user profile function

const getUserInfo = async () => {
  const token = await getToken();
  const response = await fetch(cloud_url + "/api/v1/user/profile", {
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

const updateUser = async (user_name, email, password) => {
  const token = await getToken();
  const response = await fetch(cloud_url + "/api/v1/list/update", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user_name,
      email: email,
      password: password,
    }),
  });
  if (response.status !== 204 && response.status !== 200) {
    console.log("Error: " + response.status);
  }
  console.log(response);
};

export default ProfilePage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    (async function () {
      const user_data = await getUserInfo();
      setName(user_data.name);
      setPassword(user_data.password);
      setEmail(user_data.email);
      setImage(user_data.image);
    })();
  }, []);
  return (
    <Box alignItems="center" safeAreaTop flex="1">
      {image && (
        <Image
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderColor: "red",
            marginBottom: 60,
            marginTop: 30,
          }}
          source={{ uri: `data:image/png;base64,${image}` }}
        ></Image>
      )}
      {editProfile ? (
        <FormControl isInvalid w="75%" maxW="300px">
          <FormControl.Label mt="6">Password</FormControl.Label>
          <Input placeholder="Enter password" mt="1" />
          <FormControl.Label mt="6">E-mail</FormControl.Label>
          <Input placeholder="Enter email" mt="1" />
          <FormControl.Label mt="6">Name</FormControl.Label>
          <Input placeholder="Enter name" mt="1" />
          <Button
            mt="10"
            onPress={() => {
              // (async function () {
              //   const privateData = await fetchLists("private");
              //   setPrivateData(compare_func(privateData));
              // })();
              setEditProfile(false);
            }}
          >
            Save Changes
          </Button>
        </FormControl>
      ) : (
        <Box w="75%" maxW="300px">
          <Text fontSize="lg" mt="6">
            Name: {name}
          </Text>
          <Text fontSize="lg" mt="6">
            Email: {email}
          </Text>
          <Button
            mt="10"
            onPress={() => {
              // (async function () {
              //   const privateData = await fetchLists("private");
              //   setPrivateData(compare_func(privateData));
              // })();
              setShowModal(true);
              // First show pop-up for double password check
            }}
          >
            Edit Profile
          </Button>
        </Box>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.Header>Enter your password</Modal.Header>
          <Modal.Body>
            <Input
              variant="outline"
              mb="5"
              type="password"
              placeholder="Enter your password"
            />
            <Input
              variant="outline"
              type="password"
              placeholder="Enter your password"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
