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
  FormControl,
} from "native-base";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import deleteList from "../functions/deleteList";
import fetchUserInfo from "../functions/fetchUserInfo";
import { color } from "@mui/system";
let prev_name;
function ListPage({ route, navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [addItemName, setAddItemName] = useState("");
  const [addItemAmount, setAddItemAmount] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const { listId, listItems, listName, listUpdatedAt, listUser } = route.params;
  const [updatedItems, setUpdatedItems] = useState(listItems);
  updatedItems.forEach((item) => {
    item.name = capitalizeFirstLetter(item.name);
  });
  const handleListDelete = async () => {
    await deleteList(listId);
    navigation.navigate("Lists");
  };

  const handleEdit = async (item) => {
    setItemName(item.name);
    setItemAmount(item.amount);
    prev_name = item.name; // use this to change the name of the item in db
    setShowModal(true);
  };
  const handleBuy = async (item) => {
    item.bought_by = "Hakan";
    setUpdatedItems((prevState) => [...prevState, item]);
    console.log(updatedItems);
    setNotBought(updatedItems.filter((item) => item.bought_by == null));
    setPurchased(updatedItems.filter((item) => item.bought_by != null));
  };
  const [purchased, setPurchased] = useState(
    updatedItems.filter((item) => item.bought_by != null)
  );
  const [notBought, setNotBought] = useState(
    updatedItems.filter((item) => item.bought_by == null)
  );
  const handleAddItem = () => {
    if (notBought.some((e) => e.name === addItemName)) {
      setAddItemAmount("");
      setAddItemName("");
      return;
    }
    if (addItemName == "" || addItemAmount == "") {
      console.log("empty item");
      return;
    }
    setUpdatedItems(
      (prevState) => [
        ...prevState,
        { name: addItemName, amount: addItemAmount, bought_by: null },
      ],
      setNotBought(updatedItems.filter((item) => item.bought_by == null))
    );
    setPurchased(updatedItems.filter((item) => item.bought_by != null));
    setNotBought(updatedItems.filter((item) => item.bought_by == null));
    setAddItemAmount("");
    setAddItemName("");
  };
  const [editMode, setEditMode] = useState(false);
  const renderListItem = (item) => {
    if (item.bought_by != null) {
      return (
        <Box
          rounded="full"
          borderColor="gray.300"
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
              {item.name} {item.amount}
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
        <Flex
          w="96"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box rounded="lg" mb="3" w="72" py="3" bgColor="gray.300">
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
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
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
            <Button
              flex="1"
              onPress={() => {
                if (!editMode) {
                  setNotBought([
                    ...notBought,
                    { name: itemName, amount: itemAmount, bought_by: null },
                  ]);
                  updatedItems.push({
                    name: itemName,
                    amount: itemAmount,
                    bought_by: null,
                  });
                } else {
                  // Update item
                  const new_list = updatedItems.filter(
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
            <Button>Close without saving</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
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
