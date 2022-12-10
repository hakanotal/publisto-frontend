import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
export default fetchLists = async (visibility, setData, setLoading) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/list/" + visibility, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });
  if (response.status !== 200) {
    console.log("Error: " + response.status);
  }
  const data = await response.json();
  return data;
};
