import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default fetchLists = async (listId) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/list/details/" + listId, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });
  if (response.status !== 200) {
    console.log("Error: " + response.status);
    if (response.status === 401) {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.log(error);
      }
    }
  }
  const data = await response.json();
  return data;
};
