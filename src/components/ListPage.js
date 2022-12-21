// const { startListeningDb } = require("../api/dbListener");
import { SectionList, Alert, BackHandler } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useState, useEffect } from "react";
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

import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import deleteList from "../functions/deleteList";
import updateList from "../functions/updateList";
import fetchUserInfo from "../functions/fetchUserInfo";

import AsyncStorage from "@react-native-async-storage/async-storage";

function ListPage({ route, navigation }) {
  const [showModal, setShowModal] = useState(false); // For adding items
  const [showModal2, setShowModal2] = useState(false); // for deleting list
  const [showModal3, setShowModal3] = useState(false); // for sharing list
  const [isOpen, setIsOpen] = useState(false);
  const [isNotItem, setIsNotItem] = useState(true);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [addItemName, setAddItemName] = useState("");
  const [addItemAmount, setAddItemAmount] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [itemToChange, setItemToChange] = useState("");
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const {
    listId,
    listItems,
    listName,
    listUpdatedAt,
    listUser,
    listPublic,
    listActive,
  } = route.params;
  const [updatedItems, setUpdatedItems] = useState(listItems);

  const not_bought = updatedItems.filter((item) => item.bought_by == null);
  const purchased = updatedItems.filter((item) => item.bought_by != null);
  updatedItems.forEach((item) => {
    item.name = capitalizeFirstLetter(item.name);
  });
  const handleListDelete = async () => {
    await deleteList(listId);
    navigation.navigate("Lists");
  };
  const moveUp = (item) => {
    // Good code it moves up from Co-Pilot
    // const index = updatedItems.findIndex((e) => e.name === item.name);
    // if (index == 0) {
    //   return;
    // }
    // const my_items = [
    //   ...updatedItems.slice(0, index - 1),
    //   updatedItems[index],
    //   updatedItems[index - 1],
    //   ...updatedItems.slice(index + 1),
    // ];
    const index = updatedItems.findIndex((e) => e.name === item.name);

    const my_items = [
      ...updatedItems.slice(0, index),
      { ...updatedItems[index], bought_by: null },
      ...updatedItems.slice(index + 1),
    ];
    setUpdatedItems(my_items);
  };
  const handleReturn = async () => {
    await updateList(listId, listName, updatedItems, listActive, listPublic);
    navigation.navigate("TabStack");
  };
  const submitEdit = async () => {
    const index = updatedItems.findIndex((e) => e.name === itemToChange);
    const my_items = [
      ...updatedItems.slice(0, index),
      { name: itemName, amount: itemAmount, bought_by: null },
      ...updatedItems.slice(index + 1),
    ];
    setUpdatedItems(my_items);
    setShowModal(false);
  };
  const deleteItem = (item) => {
    const index = updatedItems.findIndex((e) => e.name === item.name);
    const my_items = [
      ...updatedItems.slice(0, index),
      ...updatedItems.slice(index + 1),
    ];
    setUpdatedItems(my_items);
  };
  const handleEdit = (item) => {
    setItemAmount(item.amount.toString());
    setItemName(item.name);
    setItemToChange(item.name);
    setShowModal(true);
  };
  const handleBuy = async (item) => {
    const userData = await fetchUserInfo(listUser);
    const user_name = userData.name;
    const index = updatedItems.findIndex((e) => e.name === item.name);
    const my_items = [
      ...updatedItems.slice(0, index),
      { ...updatedItems[index], bought_by: user_name },
      ...updatedItems.slice(index + 1),
    ];
    setUpdatedItems(my_items);
  };
  function containsNumber(str) {
    return /\d/.test(str);
  }
  const handleAddItem = () => {
    const notBought = updatedItems.filter((item) => item.bought_by == null);
    if (notBought.some((e) => e.name === addItemName)) {
      setAlertTitle("Item already exists!");
      setAlertMessage(
        "Item is already in your list. You can update it if you desire."
      );
      setIsOpen(true);
      setAddItemAmount("");
      setAddItemName("");
      return;
    }
    if (addItemName == "" || addItemAmount == "") {
      setAlertTitle("Empty Values");
      setAlertMessage("Empty values entered in either amount or name field.");
      setIsOpen(true);
      return;
    }

    if (isNaN(addItemAmount)) {
      setAlertTitle("Invalid Add!");
      setAlertMessage("Amount must be a number!");
      setIsOpen(true);
      return;
    }
    if (containsNumber(addItemName)) {
      setAlertTitle("Invalid Add!");
      setAlertMessage("Name must be a string!");
      setIsOpen(true);
      return;
    }
    setUpdatedItems((prevState) => [
      ...prevState,
      { name: addItemName, amount: addItemAmount, bought_by: null },
    ]);

    setAddItemAmount("");
    setAddItemName("");
  };
  useEffect(() => {
    const not_bought = updatedItems.filter((item) => item.bought_by == null);
    const purchased = updatedItems.filter((item) => item.bought_by != null);
    setIsNotItem(not_bought.length == 0 && purchased.length == 0);
  }, [updatedItems]);
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    handleReturn
  );
  const shortenLongWords = (name) => {
    if (name.length > 12) {
      return name.substring(0, 12) + "...";
    }
    return name;
  };
  const renderListItem = (item) => {
    if (item.bought_by != null) {
      return (
        <Flex
          w="96"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box
            rounded="2xl"
            mb="3"
            w="64"
            py="3"
            bgColor="purple.900"
            onPress={handleEdit.bind(this, item)}
          >
            <Flex
              direction="row"
              justifyContent="space-around"
              _text={{
                color: "white",
                fontSize: "lg",
              }}
              ml="8"
              w="48"
            >
              {item.name} {item.bought_by}
            </Flex>
          </Box>
          <Box rounded="lg" mb="3" w="12" py="1" bgColor="purple.700">
            <Button variant="ghost" onPress={moveUp.bind(this, item)}>
              <AntDesign name="caretup" size={18} color="white" />
            </Button>
          </Box>
          <Box rounded="lg" mb="3" w="12" py="1" bgColor="purple.700">
            <Button variant="ghost" onPress={deleteItem.bind(this, item)}>
              <Feather name="trash" size={18} color="white" />
            </Button>
          </Box>
        </Flex>
      );
    } else {
      return (
        <Flex
          w="96"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box rounded="2xl" mb="3" w="64" py="1" bgColor="gray.300">
            <Button
              variant="ghost"
              onLongPress={handleBuy.bind(this, item)}
              delayLongPress="500"
            >
              <Flex
                direction="row"
                justifyContent="space-between"
                _text={{
                  color: "purple.900",
                  fontSize: "lg",
                  fontWeight: "bold",
                }}
                w="32"
              >
                {item.name} {item.amount}
              </Flex>
            </Button>
          </Box>
          <Box rounded="lg" mb="3" w="12" py="1" bgColor="purple.700">
            <Button variant="ghost" onPress={handleBuy.bind(this, item)}>
              <AntDesign name="check" size={18} color="white" />
            </Button>
          </Box>
          <Box rounded="lg" mb="3" w="12" py="1" bgColor="purple.700">
            <Button variant="ghost" onPress={handleEdit.bind(this, item)}>
              <Feather name="edit" size={18} color="white" />
            </Button>
          </Box>
        </Flex>
      );
    }
  };
  return (
    <Box flex="1" safeAreaTop safeAreaBottom marginTop="4" marginBottom="24">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="370" h="80" bg="gray.500">
          <Modal.Header
            bg="gray.500"
            _text={{ color: "white", textAlign: "center" }}
          >
            Edit Item
          </Modal.Header>
          <Modal.Body>
            <Input
              variant="rounded"
              value={itemName}
              onChangeText={(text) => setItemName(text)}
              mt="5"
              mb="8"
              color="white"
            />
            <Input
              variant="rounded"
              value={itemAmount}
              color="white"
              onChangeText={(text) => setItemAmount(text)}
            />
          </Modal.Body>
          <Modal.Footer bg="gray.500">
            <Button flex="1" onPress={submitEdit}>
              Save Item
            </Button>
            <Button>Close without saving</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {
        <Modal
          isOpen={showModal2}
          onClose={() => setShowModal2(false)}
          size="lg"
        >
          <Modal.Content maxWidth="370" h="40" bg="gray.500">
            <Modal.Header
              bg="gray.500"
              _text={{ color: "white", textAlign: "center" }}
            >
              Are you sure you want to delete this list?
            </Modal.Header>
            <Modal.Footer bg="gray.500">
              <Button h={10} right={20} onPress={handleListDelete}>
                Delete List
              </Button>
              <Button h={10} right={9} onPress={() => setShowModal2(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      }
      {/* for the sharing  */}
      {
        <Modal
          isOpen={showModal3}
          onClose={() => setShowModal3(false)}
          size="lg"
        >
          <Modal.Content maxWidth="370" maxHeight="250" bg="gray.500">
            <Modal.Header
              bg="gray.500"
              _text={{ color: "white", textAlign: "center" }}
            >
              List ID
            </Modal.Header>
            <Modal.Body>
              <Text color="white" fontSize="25" Center>
                {String(listId).padStart(6, "0")}
              </Text>
            </Modal.Body>
            <Modal.Footer bg="gray.500">
              {/* https://reactnative.dev/docs/clipboard  for copying to clipboard */}
              <Box bg={"purple.900"} flex={1} h={10} rounded="md" w={10}>
                <Button
                  variant="ghost"
                  onPress={async () => {
                    await Clipboard.setStringAsync(
                      String(listId).padStart(6, "0")
                    );
                    setShowModal3(false);
                  }}
                >
                  {" "}
                  Copy{" "}
                </Button>
              </Box>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      }
      <Flex
        direction="row"
        w="full"
        pt={3}
        pb={3}
        justifyContent="space-evenly"
      >
        <Flex w="48" justifyContent="center" h="12">
          <Heading fontSize="2xl" color="purple.900">
            {shortenLongWords(listName)}
          </Heading>
        </Flex>

        <Flex direction="row" w="24" h="16" justifyContent="center">
          <Flex px={2}>
            <Box bg={"purple.900"} h={12} rounded="md" w="16">
              <Button
                onPress={() => setShowModal3(true)}
                mb="3"
                w="12"
                h="12"
                mx="2"
                variant={"ghost"}
              >
                <AntDesign name="sharealt" size={20} color="white" />
              </Button>
            </Box>
          </Flex>
          <Box bg={"purple.900"} h={12} rounded="md" w="16">
            <Button
              onPress={() => setShowModal2(true)}
              variant="ghost"
              left={2}
              h="12"
              w="12"
            >
              <Feather name="trash" size={20} color="white" />
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Center>
        <Flex
          direction="row"
          alignItems="center"
          w="full"
          justifyContent="space-evenly"
          mb="5"
        >
          <Input
            placeholder="Item Name"
            w="32"
            h="12"
            onChangeText={(text) => setAddItemName(text)}
            value={addItemName}
          />
          <Input
            placeholder="Item Amount"
            w="32"
            h="12"
            onChangeText={(text) => {
              setAddItemAmount(text);
            }}
            value={addItemAmount}
          />
          <Box py="1" bgColor="purple.900" rounded="lg" w="12" h="12">
            <Button
              variant={"ghost"}
              _text={{
                fontSize: "xs",
                color: "white",
                fontWeight: "bold",
              }}
              onPress={handleAddItem}
            >
              Add
            </Button>
          </Box>
        </Flex>
        {isOpen &&
          Alert.alert(alertTitle, alertMessage, [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsOpen(false),
            },
            { text: "OK", onPress: () => setIsOpen(false) },
          ])}

        {isNotItem && (
          <Box
            w="full"
            _text={{
              color: "purple.900",
              textAlign: "center",
              fontSize: "4xl",
            }}
            h="40"
            alignItems="center"
            justifyContent="center"
          >
            No Item
          </Box>
        )}

        {!isNotItem && (
          <SectionList
            contentContainerStyle={{ paddingBottom: 30 }}
            sections={[
              {
                title: "To Be Purchased",
                data: not_bought,
              },
              {
                title: "Purchased",
                data: purchased,
              },
            ]}
            // List empty component does not render. Solve this problem

            renderItem={({ item }) => renderListItem(item)}
            renderSectionHeader={({ section }) => (
              <Flex direction="row" w="350">
                <Heading fontSize="xl" px="8" pb="3" color="purple.900">
                  {section.title}
                </Heading>
                <Spacer />
              </Flex>
            )}
            keyExtractor={(item, index) => `basicListEntry-${item.name}`}
          />
        )}
        {/* Save changes and return */}
        <Box bg="purple.900" h="12" mt="2" mb="32" rounded="md" w="72">
          <Button
            variant="ghost"
            onPress={handleReturn}
            _text={{ color: "white", textAlign: "center", fontSize: "lg" }}
          >
            Save Changes
          </Button>
        </Box>
        {/* Discard Changes */}
      </Center>
    </Box>
  );
}
export default ListPage;
