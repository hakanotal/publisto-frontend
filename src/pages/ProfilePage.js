import React, { useState, Component, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getToken from "../functions/getToken";
import apiUrl from "../constants/apiURL";
import { Image } from "react-native";
import { Box, Button, Text, FormControl, Input, Modal , Flex} from "native-base";
// update user profile function

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

const updateUser = async (user_name, email, password,newPassword) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/list/update", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user_name,
      email: email,
      oldPassword: password,
      newPassword: newPassword,
    }),
  });
  if (response.status !== 204 && response.status !== 200) {
    console.log("Error: " + response.status);
    alert("wrong password")
    return false
  }
  else{
    return true
  }
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
    console.log("loading");
    return (
      <Box alignItems="center" justifyContent="center" safeAreaTop flex="1">
        <Text color="purple.700">Loading...</Text>
      </Box>
    );
  }

  return (
    <Box alignItems="center" safeAreaTop flex="1" pt={5}>
      {image && (
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
      {editProfile ? (
        <FormControl isInvalid w="75%" maxW="300px">
          <FormControl.Label mt="6">E-mail</FormControl.Label>
          <Input placeholder="Enter email" mt="1" onChangeText={(text) => setNewEmail(text)} />
          <FormControl.Label mt="6">Name</FormControl.Label>
          <Input placeholder="Enter name" mt="1" onChangeText={(text) => setNewName(text)} />
          <FormControl.Label isRequired mt="6">Current Password</FormControl.Label>
          <Input type="password"  placeholder="password" onChangeText={(text) => setPassword(text)} />
          <FormControl.Label mt="6">New Password</FormControl.Label>
          <Input type="password"  placeholder="password" onChangeText={(text) => setNewPassword(text)} />
          <Button
            mt="10"
            onPress={() => {
              
              if (newname == "") {
                setNewName(name);
              }
              if (newemail == "") {
                setNewEmail(email);
              }
              
              if(newPassword == ""){
                setNewPassword(password)
              }
              (async function () {
              response = updateUser(newname, newemail, password, newPassword);
              if(response)
              {
                setName(newname);
                setEmail(newemail);
              }
              })();
              setEditProfile(false);
            }}
          >
            Save Changes
          </Button>
        </FormControl>
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
            <Box rounded="md" w={280} h={12}   bgColor="purple.900">
              <Button
                variant="ghost"
                delayLongPress={10}
                _text={{
                  fontSize: "md",
                  color: "white",
                  fontWeight: "bold",
                }}
                onPress={async () => {
                  navigation.navigate("Signin");
                  try {
                    await AsyncStorage.clear();
                  } catch (error) {
                    console.log(error);
                  }
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
