import apiUrl from "../constants/apiURL";
export default verifyPass = async (mail, password, code) => {
  const response = await fetch(apiUrl + "/api/v1/user/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: mail,
      password: password,
      code: code,
    }),
  });
  if (response.status !== 200) {
    alert("Could not verify the code. Try again!");
  } else [alert("Your password has been reset!")];
};
