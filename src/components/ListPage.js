// const { startListeningDb } = require("../api/dbListener");
import { SectionList, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import {
  Box,
  Spacer,
  Heading,
  Center,
  Button,
  Flex,
  Modal,
  Input,
  Text,
} from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import deleteList from "../functions/deleteList";
import fetchUserInfo from "../functions/fetchUserInfo";
let prev_name;
function ListPage({ route, navigation }) {
  const [showModal, setShowModal] = useState(false);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const { listId, listItems, listName, listUpdatedAt, listUser } = route.params;
  listItems.forEach((item) => {
    item.name = capitalizeFirstLetter(item.name);
  });
  const handleListDelete = async () => {
    await deleteList(listId);
    navigation.navigate("Lists");
  };
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  const handleEdit = async (item) => {
    /* If editmode is false assign item bought by, else show modal for user */
    if (editMode) {
      setItemName(item.name);
      prev_name = item.name; // use this to change the name of the item in db
      setItemAmount(item.amount);
      setShowModal(true);
    } else {
      // Get current user name and email
      item.bought_by = "Yusuf";
      setNotBought(listItems.filter((item) => item.bought_by == null));
      setPurchased(listItems.filter((item) => item.bought_by != null));
    }
  };
  const handleBuy = async (item) => {
    const user_data = await fetchUserInfo(listUser);
    item.bought_by = user_data.name;
    setNotBought(listItems.filter((item) => item.bought_by == null));
    setPurchased(listItems.filter((item) => item.bought_by != null));
  };
  const [purchased, setPurchased] = useState(
    listItems.filter((item) => item.bought_by != null)
  );
  const [notBought, setNotBought] = useState(
    listItems.filter((item) => item.bought_by == null)
  );
  const addItem = () => {
    setEditMode(false);
    setShowModal(true);
  };
  const [editMode, setEditMode] = useState(false);
  const renderListItem = (item) => {
    if (item.bought_by != null) {
      return (
        <Box
          rounded="full"
          borderColor="gray.800"
          mb="3"
          w="330"
          py="3"
          bgColor="purple.900"
          onPress={handleEdit.bind(this, item)}
        >
          <Flex
            direction="row"
            w="full"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Text color="white" fontSize="lg">
              {item.name}
            </Text>
            <Box>
              <Flex direction="row" alignItems="center">
                <Text color="white" fontSize="sm">
                  {item.bought_by}
                </Text>
                <Button onPress={handleEdit.bind(this, item)} variant="ghost">
                  <AntDesign name="caretup" size={28} color="white" />
                </Button>
                <Button onPress={handleEdit.bind(this, item)} variant="ghost">
                  <Feather name="trash" size={28} color="white" />
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      );
    } else {
      return (
        <Box
          rounded="full"
          mb="3"
          w="360"
          py="3"
          bgColor="gray.500"
          onPress={handleEdit.bind(this, item)}
        >
          <Button onLongPress={handleBuy.bind(this, item)} variant="ghost">
            {item.name}
          </Button>
          {/* <Flex
            direction="row"
            w="full"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Text color="white" fontSize="lg">
              {item.name}
            </Text>
            <Box>
              <Flex direction="row">
                <Button
                  onPress={handleEdit.bind(this, item)}
                  variant="ghost"
                  onLongPress={longClick}
                >
                  <AntDesign name="caretup" size={28} color="white" />
                </Button>
                <Button onPress={handleEdit.bind(this, item)} variant="ghost">
                  <Feather name="trash" size={28} color="white" />
                </Button>
              </Flex>
            </Box>
          </Flex> */}
        </Box>
      );
    }
  };
  return (
    <Box flex="1" safeAreaTop safeAreaBottom marginTop="4" marginBottom="24">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.Header>Edit Item</Modal.Header>
          <Modal.Body>
            <Input
              variant="rounded"
              placeholder={`Edit the item name`}
              onChangeText={(text) => setItemName(text)}
              mb="5"
            />
            <Input
              variant="rounded"
              placeholder={"Enter new amount"}
              mb="5"
              onChangeText={(text) => setItemAmount(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                if (!editMode) {
                  setNotBought([
                    ...notBought,
                    { name: itemName, amount: itemAmount, bought_by: null },
                  ]);
                  listItems.push({
                    name: itemName,
                    amount: itemAmount,
                    bought_by: null,
                  });
                } else {
                  // Update item
                  const new_list = listItems.filter(
                    (item) => item.name !== prev_name
                  );
                  // Append new item
                  setNotBought([
                    ...new_list,
                    { name: itemName, amount: itemAmount, bought_by: null },
                  ]);
                  listItems.push({
                    name: itemName,
                    amount: itemAmount,
                    bought_by: null,
                  });
                }
                setItemName("");
                setItemAmount("");
                setShowModal(false);
              }}
            >
              Save Item
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Flex direction="row" w="350">
        <Heading fontSize="xl" px="8" pb="3" color="purple.800">
          {listName}
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
          {/* Share screen should pop up */}
          Share your list
        </Button>
        <Button
          size="xs"
          colorScheme="blue"
          mb="3"
          onPress={() => {
            setEditMode(true);
          }}
        >
          Edit list
        </Button>
      </Flex>
      {/* Add Item Section Here */}
      <Center>
        <SectionList
          contentContainerStyle={{ paddingBottom: 30 }}
          sections={[
            { title: "To Be Purchased", data: notBought },
            {
              title: "Purchased",
              data: purchased,
            },
          ]}
          renderItem={({ item }) => renderListItem(item)}
          renderSectionHeader={({ section }) => (
            <Flex direction="row" w="350">
              <Heading fontSize="xl" px="8" pb="3" color="purple.800">
                {section.title}
              </Heading>
              <Spacer />
            </Flex>
          )}
          keyExtractor={(item, index) => `basicListEntry-${item.name}`}
        />
        <Button
          onPress={() => [navigation.navigate("TabStack")]}
          h="12"
          w="300"
          marginTop="4"
          marginBottom="2"
        >
          Save Changes and Return
        </Button>
        <Button onPress={handleListDelete} colorScheme="danger" h="12" w="300">
          Delete List
        </Button>
      </Center>
    </Box>
  );
}
export default ListPage;
