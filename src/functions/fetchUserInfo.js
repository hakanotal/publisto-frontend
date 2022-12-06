import getToken from "./getToken";
const cloud_url =
  "https://e6waofnzq8.execute-api.eu-central-1.amazonaws.com/main";
export default fetchUserInfo = async (id) => {
  console.log(id);
  const token = await getToken();
  const response = await fetch(cloud_url + "/api/v1/user/profile", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  if (response.status !== 200) {
    console.log("Error: " + response.status);
  }

  return response.json();
};
