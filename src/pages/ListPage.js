import { StatusBar } from "expo-status-bar";
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
} from "native-base";
const cloud_url =
  "https://e6waofnzq8.execute-api.eu-central-1.amazonaws.com/main";

const ListPage = ({ navigation }) => {
  const [privateData, setPrivateData] = useState([]);
  const [publicData, setPublicData] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
    console.log(token);
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
    const data = await resp.json();
    public_data = data.filter((item) => item.is_public === true);
    private_data = data.filter((item) => item.is_public !== true);
    setPrivateData(private_data);
    setPublicData(public_data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
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
          colorScheme="purple"
          onPress={() => console.log("hello world")}
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
      <Flex direction="row" w="350">
        <Heading fontSize="xl" px="8" pb="3" color="purple.800">
          Shared Lists
        </Heading>
        <Spacer />
        <Button
          size="xs"
          colorScheme="purple"
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
      </Center>
    </Box>
  );
};

export default ListPage;
