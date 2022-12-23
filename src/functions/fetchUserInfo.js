import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
export default fetchUserInfo = async () => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/user/profile/" , {
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
