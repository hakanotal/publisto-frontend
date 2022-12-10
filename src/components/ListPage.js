// const { startListeningDb } = require("../api/dbListener");
import { SectionList, TouchableOpacity, View } from "react-native";
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
  FormControl,
} from "native-base";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import deleteList from "../functions/deleteList";
import updateList from "../functions/updateList";
import fetchUserInfo from "../functions/fetchUserInfo";
function ListPage({ route, navigation }) {
  const [showModal, setShowModal] = useState(false);
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
    const result = await updateList(
      listId,
      listName,
      updatedItems,
      listActive,
      listPublic
    );
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
  const handleAddItem = () => {
    const notBought = updatedItems.filter((item) => item.bought_by == null);
    if (notBought.some((e) => e.name === addItemName)) {
      setAddItemAmount("");
      setAddItemName("");
      return;
    }
    if (addItemName == "" || addItemAmount == "") {
      console.log("empty item");
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
  }, [updatedItems]);
  const renderListItem = (item) => {
    if (item.bought_by != null) {
      return (
        <Box
          rounded="2xl"
          mb="3"
          ml="3"
          w="72"
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
                  {capitalizeFirstLetter(item.bought_by)}
                </Text>
                <Button onPress={moveUp.bind(this, item)} variant="ghost">
                  <AntDesign name="caretup" size={28} color="white" />
                </Button>
                <Button onPress={deleteItem.bind(this, item)} variant="ghost">
                  <Feather name="trash" size={28} color="white" />
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      );
    } else {
      return (
        <Flex
          w="96"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box rounded="2xl" mb="3" w="72" py="3" bgColor="gray.300">
            <Button variant="ghost" onLongPress={handleBuy.bind(this, item)}>
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
          <Box rounded="lg" mb="3" w="16" py="3" bgColor="purple.700">
            <Button variant="ghost" onPress={handleEdit.bind(this, item)}>
              <Feather name="edit" size={24} color="white" />
            </Button>
          </Box>
        </Flex>
      );
    }
  };
  return (
    <Box flex="1" safeAreaTop safeAreaBottom marginTop="4" marginBottom="24">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="370" h="80" bg="info.900">
          <Modal.Header
            bg="info.900"
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
          <Modal.Footer bg="info.900">
            <Button flex="1" onPress={submitEdit}>
              Save Item
            </Button>
            <Button>Close without saving</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Flex direction="row" w="full" justifyContent="space-evenly">
        <Heading fontSize="3xl" mb="5" color="purple.900">
          {listName}
        </Heading>
        <Flex direction="row" w="24" justifyContent="center">
          <Button mb="3" w="12" h="12" mx="2" colorScheme="purple">
            <AntDesign name="sharealt" size={24} color="white" />
          </Button>
          <Button onPress={handleListDelete} colorScheme="danger" h="12" w="12">
            <AntDesign name="delete" size={24} color="white" />
          </Button>
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
          onPress={handleReturn}
          colorScheme="purple"
          h="12"
          w="72"
          marginTop="4"
          marginBottom="3"
        >
          Save Changes
        </Button>
      </Center>
    </Box>
  );
}
export default ListPage;
