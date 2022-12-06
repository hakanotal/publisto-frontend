import { StatusBar } from "expo-status-bar";
// const { startListeningDb } = require("../api/dbListener");
import React, { useState, Component, useEffect } from "react";
import { Text, FlatList } from "react-native";
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
      setPrivateData(compare_func(privateData));
      setLoading(false);
    })();
  }, [isFocused, privateData]);

  const renderList = ({ item }) => (
    <Box bg="muted.300" rounded="lg" borderColor="muted.800" mb="5" w="330">
      <Button
        colorScheme="blueGray"
        py="4"
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
        <Modal.Content maxWidth="350">
          <Modal.Header>Enter List Name</Modal.Header>
          <Modal.Body>
            <Input
              variant="rounded"
              placeholder="New List..."
              onChangeText={(listName) => setListName(listName)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
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
        My Lists
      </Heading>
      <Flex direction="row" w="350">
        <Heading fontSize="xl" px="8" pb="3" color="purple.800">
          Private List
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
        {privateData && (
          <FlatList
            data={privateData}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }} // Add padding to bottom of list because the last item disappers behind the tab bar somehow
          ></FlatList>
        )}
      </Center>
    </Box>
  );
};

export default ListsPage;
