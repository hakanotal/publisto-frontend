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
  const [publicData, setPublicData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [listName, setListName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const isFocused = useIsFocused();
  const [isListCreated, setIsListCreated] = useState(false);
  // Fetch lists from database in first render and
  useEffect(() => {
    (async function () {
      const publicData = await fetchLists("public");
      const sortedPublicData = await compare_func(publicData);
      setPublicData(sortedPublicData);
      setLoading(false);
    })();
  }, [isFocused, publicData]);
  useEffect(() => {
    setTimeout(() => {
      setIsListCreated(false);
    }, 2000);
  }, [isListCreated]);
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
            listPublic: item.is_public,
            listActive: item.is_active,
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
        <Modal.Content maxWidth="350" bg="muted.200" h="56" rounded="2xl">
          <Modal.Header
            bg="muted.200"
            _text={{ color: "black", textAlign: "center" }}
          >
            Enter List ID
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
                console.log(listName);
                createList(listName);
                (async function () {
                  const publicData = await fetchLists("public");
                  const sortedData = await compare_func(publicData);
                  setpublicData(sortedData);
                })();
                setShowModal(false);
              }}
            >
              Create Public List
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Heading fontSize="3xl" px="8" pb="3" py={5} color="purple.900">
        PUBLISTO
      </Heading>
      <Flex direction="row" w="350" pb = {3}>
        <Heading fontSize="2xl" px="8" pb="3" color="purple.800">
          Public Lists
        </Heading>
        <Spacer />
        <Button
          size="xs"
          pl={5}
          pr={5}
          rounded="md"
          colorScheme="light"
          onPress={() => {
            setShowModal(true);
          }}
          mb="4"
        >
          Add Public List
        </Button>
      </Flex>
      <Center>
        {isLoading && <Text color="purple.700">Loading...</Text>}
        {isListCreated && (
          <Alert variant="solid" w="100%" status="success" mb="5" mt="5">
            <Text fontSize="md" color="white">
              List is created successfully!
            </Text>
          </Alert>
        )}
        {publicData && publicData.length > 0 && (
          <FlatList
            data={publicData}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }} // Add padding to bottom of list because the last item disappers behind the tab bar somehow
          ></FlatList>
        )}
        {publicData && publicData.length == 0 && (
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
                New Public List
              </Button>
            </Box>
          </Flex>
        )}
      </Center>
    </Box>
  );
};

export default ListsPage;
