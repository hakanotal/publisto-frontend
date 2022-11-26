import { StatusBar } from "expo-status-bar";
const { startListeningDb } = require("../api/dbListener");
import React, { useState, Component, useEffect } from "react";
import { Text, FlatList } from "react-native";
import fetchLists from "../functions/fetchLists";
import createList from "../functions/createList";
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
  Radio,
  VStack,
} from "native-base";

const ListPage = ({ navigation }) => {
  const [privateData, setPrivateData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [listName, setListName] = useState("");
  // Show modal for private list
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  useEffect(() => {
    (async function () {
      const privateData = await fetchLists("private");
      setPrivateData(privateData);
      setLoading(false);
    })();
    fetchData();
    // startListeningDb(1);
  }, []);
  const renderList = ({ item }) => (
    <Box
      bg="muted.300"
      rounded="lg"
      borderColor="muted.800"
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
        <Modal.Content maxWidth="350">
          <Modal.Header>Enter List Name</Modal.Header>
          <Modal.Body>
            {/* <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Sub Total</Text>
                <Text color="blueGray.400">$298.77</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Tax</Text>
                <Text color="blueGray.400">$38.84</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total Amount</Text>
                <Text color="green.500">$337.61</Text>
              </HStack>
            </VStack> */}
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
                  console.log("cagrildin");
                  const privateData = await fetchLists("private");
                  console.log(privateData);

                  setPrivateData(privateData);
                })();

                setShowModal(false);
                setShowModal2(true);
              }}
            >
              Create Private List
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.Header>Select Address</Modal.Header>
          <Modal.Body>
            <Radio.Group defaultValue="address1" name="address" size="sm">
              <VStack space={3}></VStack>
            </Radio.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                setShowModal2(false);
                setShowModal3(true);
              }}
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal3} size="lg" onClose={() => setShowModal3(false)}>
        <Modal.Content maxWidth="350">
          <Modal.Header>Payment Options</Modal.Header>
          <Modal.Body>
            <Radio.Group name="payment" size="sm">
              <VStack space={3}></VStack>
            </Radio.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                setShowModal(false);
                setShowModal2(false);
                setShowModal3(false);
              }}
            >
              Checkout
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
          ></FlatList>
        )}
      </Center>
    </Box>
  );
};

export default ListPage;
