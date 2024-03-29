import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
export default deleteList = async (id, name, items, is_public) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/list/update", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      items: items,
      is_active: false,
      is_public: is_public,
    }),
  });
  if (response.status !== 204 && response.status !== 200) {
    console.log("Error: " + response.status);
  }
};
