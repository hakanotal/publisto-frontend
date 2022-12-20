import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
export default joinList = async (list_id) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/list/join", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id : list_id
    }),
  });
  if (response.status !== 400) {
    console.log("Error: " + response.status);
  }
  console.log(response)
};
