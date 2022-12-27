import getToken from "./getToken";
import apiUrl from "../constants/apiURL";
export default updateUserInfo = async (
  name,
  email,
  oldPassword,
  newPassword
) => {
  const token = await getToken();
  let response = await fetch(apiUrl + "/api/v1/user/update", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
  });
  response = await response.json();
  return response;
};
