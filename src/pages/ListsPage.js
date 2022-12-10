import { StatusBar } from "expo-status-bar";
// const { startListeningDb } = require("../api/dbListener");
import React, { useState, Component, useEffect } from "react";
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

const ListsPage = ({ navigation }) => {
  // Define state variables
  const [privateData, setPrivateData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [listName, setListName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const isFocused = useIsFocused();
  // Fetch lists from database in first render and
  useEffect(() => {
    (async function () {
      const privateData = await fetchLists("private");
      const sortedPrivateData = await compare_func(privateData);
      setPrivateData(sortedPrivateData);
      setLoading(false);
    })();
  }, [isFocused, privateData]);

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
            listItems: item.items,
            listUpdatedAt: item.updated_at,
            listUser: item.user_id,
          });
        }}
      >
        {item.name}
      </Button>
    </Box>
  );
  return (
    <Box flex="1" safeAreaTop>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350" bg="indigo.900" h="56">
          <Modal.Header bg="indigo.900">Enter List Name</Modal.Header>
          <Modal.Body bg="indigo.900">
            <Input
              variant="rounded"
              placeholder="New List..."
              onChangeText={(listName) => setListName(listName)}
            />
          </Modal.Body>
          <Modal.Footer bg="indigo.900">
            <Button
              flex="1"
              onPress={() => {
                console.log(listName);
                createList(listName);
                (async function () {
                  const privateData = await fetchLists("private");
                  setPrivateData(compare_func(privateData));
                })();
                setShowModal(false);
              }}
            >
              Create Private List
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Heading fontSize="3xl" px="8" pb="3" color="purple.900">
        PUBLISTO
      </Heading>
      <Flex direction="row" w="350">
        <Heading fontSize="2xl" px="8" pb="3" color="purple.800">
          Private Lists
        </Heading>
        <Spacer />
        <Button
          size="xs"
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
        {privateData && privateData.length > 0 && (
          <FlatList
            data={privateData}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }} // Add padding to bottom of list because the last item disappers behind the tab bar somehow
          ></FlatList>
        )}
        {privateData && privateData.length == 0 && (
          <Flex w="full" h="96" alignItems="center" justifyContent="center">
            <Text color="purple.900" fontSize={"3xl"}>
              No private lists yet
            </Text>
            <Box rounded="lg" mb="3" w="72" py="3" bgColor="cyan.700">
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
                New Private List
              </Button>
            </Box>
          </Flex>
        )}
      </Center>
    </Box>
  );
};

export default ListsPage;
