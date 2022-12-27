import AsyncStorage from "@react-native-async-storage/async-storage";
export default getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("private_token");
    if (value !== null) {
      return value;
    } else {
      throw new Error("Token not found.");
    }
  } catch (error) {
    console.log(error);
  }
};
