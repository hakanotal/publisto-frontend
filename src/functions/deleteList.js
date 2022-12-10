import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
export default deleteList = async (id) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/list/delete", {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  if (response.status !== 204) {
    console.log("Error: " + response.status);
  }
};
