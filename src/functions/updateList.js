import getToken from "./getToken";
const cloud_url =
  "https://e6waofnzq8.execute-api.eu-central-1.amazonaws.com/main";
export default updateList = async (id, name, items, is_active, is_public) => {
  const token = await getToken();
  const response = await fetch(cloud_url + "/api/v1/list/update", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      items: items,
      is_active: is_active,
      is_public: is_public,
    }),
  });
  if (response.status !== 204 && response.status !== 200) {
    console.log("Error: " + response.status);
  }
};