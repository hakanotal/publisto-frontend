import getToken from "./getToken";
const cloud_url =
  "https://e6waofnzq8.execute-api.eu-central-1.amazonaws.com/main";
export default fetchUserInfo = async (id) => {
  const token = await getToken();
  const response = await fetch(cloud_url + "/api/v1/list/delete", {
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
