import { StatusBar } from "expo-status-bar";
const { startListeningDb } = require('../api/dbListener');
import React, { useState, Component, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Box,
  Spacer,
  Heading,
  Center,
  HStack,
  Button,
  Flex,
  Modal,
  FormControl,
  Input,
} from "native-base";
const cloud_url =
  "https://e6waofnzq8.execute-api.eu-central-1.amazonaws.com/main";

const ListPage = ({ navigation }) => {
  const [privateData, setPrivateData] = useState([]);
  const [publicData, setPublicData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // Show modal for private list
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("private_token");
      if (value !== null) {
        return value;
      } else {
        throw new Error("Token not found.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    const token = await getToken();
    const resp = await fetch(cloud_url + "/api/v1/list/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });
    if (resp.status !== 200) {
      console.log("Error: " + resp.status);
    }
    let data = await resp.json();
    let public_data = data.filter((item) => item.is_public === true);
    console.log(public_data);
    let private_data = data.filter((item) => item.is_public !== true);
    console.log(private_data);
    setPrivateData(private_data);
    setPublicData(public_data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    // startListeningDb(1);
  }, []);
  const renderList = ({ item }) => (
    <Box
      bg="muted.300"
      rounded="lg"
      borderColor="muted.800"
      pl={["0", "4"]}
      pr={["0", "5"]}
      mb="5"
      py="2"
      w="330"
    >
      <HStack space={[2, 3]}>
        <Heading color="violet.600" fontSize="xl" px="12" py="1">
          {item.name}
        </Heading>
      </HStack>
    </Box>
  );
  return (
    <Box flex="1" safeAreaTop>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxW="300">
          <Modal.Header>Private List</Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal.Content>
      </Modal>
      <Heading fontSize="3xl" px="8" pb="3" color="purple.900">
        My Lists
      </Heading>
      <Flex direction="row" w="350">
        <Heading fontSize="xl" px="8" pb="3" color="purple.800">
          Private List
        </Heading>
        <Spacer />
        <Button
          size="xs"
          // w="24"
          // h="12"
          colorScheme="blue"
          onPress={() => {
            setShowModal(true);
          }}
          mb="3"
        >
          New Private List
        </Button>
      </Flex>

      <Center>
        {isLoading && <Text color="purple.700">Loading...</Text>}
        {privateData && (
          <FlatList
            data={privateData}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
          ></FlatList>
        )}
      </Center>
      {/* <Flex direction="row" w="350">
        <Heading fontSize="xl" px="8" pb="3" color="purple.800">
          Shared Lists
        </Heading>
        <Spacer />
        <Button
          size="xs"
          colorScheme="blue"
          onPress={() => console.log("hello world")}
          mb="3"
        >
          Join Shared List
        </Button>
      </Flex>

      <Center>
        {isLoading && <Text color="purple.700">Loading...</Text>}
        {publicData && (
          <FlatList
            data={publicData}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
          ></FlatList>
        )}
      </Center> */}
    </Box>
  );
};

export default ListPage;
