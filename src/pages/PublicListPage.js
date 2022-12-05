import React, { useState, Component, useEffect } from "react";
import { Text, FlatList } from "react-native";
import fetchLists from "../functions/fetchLists";
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

const ListPage = ({ navigation }) => {
  const [publicData, setpublicData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // Show modal for private list
  // const [showModal, setShowModal] = useState(false);
  // const [showModal2, setShowModal2] = useState(false);
  // const [showModal3, setShowModal3] = useState(false);

  useEffect(() => {
    (async function () {
      const publicData = await fetchLists("public");
      setpublicData(publicData);
      setLoading(false);
    })();
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
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxW="300">
          <Modal.Header>Private List</Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal.Content>
      </Modal> */}
      <Heading fontSize="3xl" px="8" pb="3" color="purple.900">
        My Lists
      </Heading>
      <Flex direction="row" w="350">
        <Heading fontSize="xl" px="8" pb="3" color="purple.800">
          Shared Lists
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
          New Public List
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
