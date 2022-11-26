import getToken from "./getToken";
const cloud_url =
  "https://e6waofnzq8.execute-api.eu-central-1.amazonaws.com/main";
export default createList = async (list_name) => {
  const token = await getToken();
  console.log(list_name);
  const response = await fetch(cloud_url + "/api/v1/list/create", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_public: false,
      name: list_name,
      is_active: true,
      items: [
        {
          name: "apple",
          amount: 1,
          bought_by: null,
        },
        {
          name: "bread",
          amount: 3,
          bought_by: null,
        },
      ],
    }),
  });
  if (response.status !== 200) {
    console.log("Error: " + response.status);
  }
};
