import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
export default updateUserInfo = async (name,email,oldPassword,newPassword) => {
  const token = await getToken();
  const response = await fetch(apiUrl + "/api/v1/user/update", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email:email, 
      oldPassword:oldPassword, 
      newPassword:newPassword 
    }),
  });
  if (response.status !== 204 && response.status !== 200) {
    console.log("Error: " + response.status);
    return false
  }
  return response.json();
};
