import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
export default createList = async (name, email,oldPas,newPass) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/user/update", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      oldPassword: oldPas,
      newPassword: newPass,
    }),
  });
  if (response.status !== 200) {
    console.log("Error: " + response.status);
  }
};
