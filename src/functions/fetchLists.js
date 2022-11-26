import getToken from "./getToken";
const cloud_url =
  "https://e6waofnzq8.execute-api.eu-central-1.amazonaws.com/main";
export default fetchLists = async (visibility, setData, setLoading) => {
  const token = await getToken();
  const response = await fetch(cloud_url + "/api/v1/list/" + visibility, {
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
