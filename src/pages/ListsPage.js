import { StatusBar } from "expo-status-bar";
// const { startListeningDb } = require("../api/dbListener");
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native";
import fetchLists from "../functions/fetchLists";
import createList from "../functions/createList";
import { useIsFocused } from "@react-navigation/native";
import compare_func from "../functions/compare_func";
import {
  Box,
  Spacer,
  Heading,
  Center,
  Button,
  Flex,
  Modal,
  Text,
  Input,
} from "native-base";

const ListsPage = (props) => {
  console.log(props);
  console.log(props.route.params);
  const { navigation } = props;
  // Define state variables
  const [privateData, setPrivateData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [listName, setListName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isListDeleted, setIsListDeleted] = useState(false);

  const shortenLongWords = (name) => {
    if (name.length > 15) {
      return name.substring(0, 15) + "...";
    }
    return name;
  };
  const isFocused = useIsFocused();
  // Fetch lists from database in first render and
  // update only when sort is called
  useEffect(() => {
    (async function () {
      const value = await AsyncStorage.getItem("private_token");
      if (value === null) {
        navigation.navigate("Signin");
        return;
      }
      const privateData = await fetchLists("private");
      const sortedPrivateData = await compare_func(privateData);
      // When privateData is updated, sort it and update state
      // Only update when items first rendered

      setPrivateData(sortedPrivateData);
      setLoading(false);
    })();
  }, []);
  // @nitec427 rendering when lists are deleted does not work
  useEffect(() => {
    (async function () {
      const privateData = await fetchLists("private");
      const sortedPrivateData = await compare_func(privateData);

      setPrivateData(sortedPrivateData);
      setLoading(false);
    });
  }, [isFocused]);
  const renderList = ({ item }) => (
    <Box
      bg="muted.300"
      rounded="full"
      borderColor="muted.800"
      fontSize="lg"
      mb="5"
      w="330"
      color="purple.900"
    >
      <Button
        colorScheme="blueGray"
        py="4"
        variant="ghost"
        _text={{ fontSize: "2xl", color: "purple.900", fontWeight: "bold" }}
        onPress={() => {
          navigation.push("List", {
            listName: item.name,
            listId: item.id,
            listUser: item.user_id,
          });
        }}
      >
        {shortenLongWords(item.name)}
      </Button>
    </Box>
  );
  return (
    <Box flex="1" safeAreaTop>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350" bg="muted.200" h="56" rounded="2xl">
          <Modal.Header
            bg="muted.200"
            _text={{ color: "bluegray", textAlign: "center" }}
          >
            Enter List Name
          </Modal.Header>
          <Modal.Body bg="muted.200">
            <Input
              variant="outline"
              placeholder="New List..."
              color="black"
              onChangeText={(listName) => setListName(listName)}
            />
          </Modal.Body>
          <Modal.Footer bg="muted.200">
            <Button
              flex="1"
              colorScheme="purple"
              onPress={() => {
                (async function () {
                  await createList(listName);
                  const privateData = await fetchLists("private");
                  const sortedData = await compare_func(privateData);
                  setPrivateData(sortedData);
                })();
                setShowModal(false);
              }}
            >
              Create Private List
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Heading fontSize="3xl" px="8" pb="3" py={5} color="purple.900">
        PUBLISTO
      </Heading>

      <Flex direction="row" w="96" mb="5" pr="6">
        <Heading fontSize="2xl" px="8" pb="2" color="purple.800">
          Private Lists
        </Heading>
        <Spacer />
        <Box rounded="md" w={100} h={9} bgColor="purple.900">
          <Button
            variant="ghost"
            delayLongPress={10}
            _text={{
              fontSize: "xs",
              color: "white",
              fontWeight: "bold",
            }}
            onPress={() => {
              setShowModal(true);
            }}
          >
            New List
          </Button>
        </Box>
      </Flex>
      {/* showCreated List */}

      <Center>
        {isLoading && <Text color="purple.700">Loading...</Text>}

        {privateData && privateData.length > 0 && (
          <FlatList
            data={privateData}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 120 }} // Add padding to bottom of list because the last item disappers behind the tab bar somehow
          ></FlatList>
        )}

        {privateData && privateData.length == 0 && (
          <Flex w="full" h="96" alignItems="center" justifyContent="center">
            <Text color="purple.900" pb={5} fontSize={"3xl"}>
              No Private Lists Yet
            </Text>
            <Box rounded="lg" mb="2" w="72" py="2" bgColor="purple.900">
              <Button
                variant="ghost"
                delayLongPress={10}
                _text={{
                  color: "white",
                  fontSize: "lg",
                  fontWeight: "bold",
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              >
                Create One
              </Button>
            </Box>
          </Flex>
        )}
      </Center>
    </Box>
  );
};

export default ListsPage;
