import getToken from "./getToken";
import apiUrl from "../constants/apiUrl";
export default createList = async (list_name) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/list/create", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_public: false,
      name: list_name,
      is_active: true,
    }),
  });
  if (response.status !== 200) {
    console.log("Error: " + response.status);
  }
};
