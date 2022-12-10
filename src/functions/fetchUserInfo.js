import getToken from "./getToken";
import apiUrl from "../constants/apiUrl";
export default fetchUserInfo = async (id) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/user/profile/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });
  if (response.status !== 200) {
    console.log("Error: " + response.status);
  }

  return response.json();
};
