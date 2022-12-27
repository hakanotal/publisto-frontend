import { StatusBar } from "expo-status-bar";
// const { startListeningDb } = require("../api/dbListener");
import React, { useState, Component, useEffect } from "react";
import { FlatList } from "react-native";
import fetchLists from "../functions/fetchLists";
import joinList from "../functions/joinList";
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
  const { navigation } = props;
  // Define state variables
  const [publicData, setPublicData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [newListId, setNewListId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const isFocused = useIsFocused();
  // Fetch lists from database in first render and
  useEffect(() => {
    (async function () {
      if (isFocused) {
        const publicData = await fetchLists("public");
        setPublicData(publicData);
        setLoading(false);
      }
      const sortedPublicData = await compare_func(publicData);
      if (isFirst) {
        setPublicData(sortedPublicData);
        setLoading(false);
        setIsFirst(false);
      }
    })();
  }, []);
  const shortenLongWords = (name) => {
    if (name.length > 15) {
      return name.substring(0, 15) + "...";
    }
    return name;
  };
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
            _text={{ color: "black", textAlign: "center" }}
          >
            Enter List ID to Join
          </Modal.Header>
          <Modal.Body bg="muted.200">
            <Input
              variant="outline"
              placeholder="New List..."
              color="black"
              onChangeText={(newListId) => setNewListId(newListId)}
            />
          </Modal.Body>
          <Modal.Footer bg="muted.200">
            <Button
              flex="1"
              colorScheme="purple"
              onPress={() => {
                console.log(newListId);
                joinList(newListId);
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
      <Flex direction="row" w="96" mb="6" pr="6">
        <Heading fontSize="2xl" px="8" pb="3" color="purple.800">
          Public Lists
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
      <Center>
        {isLoading && <Text color="purple.700">Loading...</Text>}

        {publicData && publicData.length > 0 && (
          <FlatList
            data={publicData}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 120 }} // Add padding to bottom of list because the last item disappers behind the tab bar somehow
          ></FlatList>
        )}
        {publicData && publicData.length == 0 && (
          <Flex w="full" h="96" alignItems="center" justifyContent="center">
            <Text color="purple.900" pb={5} fontSize={"3xl"}>
              No Public Lists Yet
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
                Join One
              </Button>
            </Box>
          </Flex>
        )}
      </Center>
    </Box>
  );
};

export default ListsPage;
